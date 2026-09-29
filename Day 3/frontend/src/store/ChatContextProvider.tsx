import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type User = {
  user_id: number;
  name: string;
  email: string;
};

type Message = {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
};

type ChatContextType = {
  users: User[];
  messages: Message[];
  loadingUsers: boolean;
  loadingMessages: boolean;
  connected: boolean;

  searchUsers: (query: string) => Promise<void>;
  clearUsers: () => void;

  loadMessages: (otherUserId: number) => Promise<void>;

  sendMessage: (receiverId: number, message: string) => void;

  clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function ChatContextProvider({ children }: Props): React.ReactElement {
  const currentUserId = 1;
  const API_URL = 'http://10.0.2.2:3000';

  const WS_URL = 'ws://10.0.2.2:3000';

  const socketRef = useRef<WebSocket | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [loadingUsers, setLoadingUsers] = useState(false);

  const [loadingMessages, setLoadingMessages] = useState(false);

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const socket = new WebSocket(`${WS_URL}?userId=${currentUserId}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Chat WebSocket connected');

      setConnected(true);
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        console.log('WebSocket received:', data);

        if (data.type === 'message') {
          const newMessage: Message = {
            id: data.id,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message,
            created_at: data.created_at,
          };

          setMessages(previousMessages => [...previousMessages, newMessage]);
        }
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
      }
    };

    socket.onerror = error => {
      console.error('Chat WebSocket error:', error);

      setConnected(false);
    };

    socket.onclose = () => {
      console.log('Chat WebSocket disconnected');

      setConnected(false);
    };

    return () => {
      socket.close();

      socketRef.current = null;
    };
  }, []);

  const searchUsers = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoadingUsers(true);

      const response = await fetch(
        `${API_URL}/chat/users/search?query=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data: User[] = await response.json();

      setUsers(data);
    } catch (error) {
      console.error('User search error:', error);

      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };
  const clearUsers = (): void => {
    setUsers([]);
  };
  const loadMessages = async (otherUserId: number): Promise<void> => {
    try {
      setLoadingMessages(true);

      const response = await fetch(
        `${API_URL}/chat/messages/${currentUserId}/${otherUserId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to load messages');
      }

      const data: Message[] = await response.json();

      setMessages(data);
    } catch (error) {
      console.error('Load messages error:', error);

      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };
  const sendMessage = (receiverId: number, message: string): void => {
    if (!message.trim()) {
      return;
    }

    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not connected');

      return;
    }

    socket.send(
      JSON.stringify({
        receiverId,
        message: message.trim(),
      }),
    );
  };

  const clearMessages = (): void => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        messages,
        loadingUsers,
        loadingMessages,
        connected,

        searchUsers,
        clearUsers,

        loadMessages,

        sendMessage,

        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used inside ChatContextProvider');
  }

  return context;
}
