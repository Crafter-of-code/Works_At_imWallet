import React, { SetStateAction } from 'react';
import { server_url } from './Config';
import * as keychain from 'react-native-keychain';

type recentTransactionType = {
  transactionId: string;
  transactionName: string;
  transactionType: 'incoming' | 'outgoing';
  transactinAmount: number;
  transactionDate: Date;
};

type financialOverviewType = {
  income: number;
  expense: number;
  monthlySpend: number;
  monthlyBudget: number;
  spendingPercentage: number;
};

type homeDataType = {
  userName: string;
  userAccountBalance: number;
  userWalletBalance: number;
  financialOverview: financialOverviewType;
  recentTransaction: recentTransactionType[];
};

type UserModel = {
  userId: number;
  userName: string;
  userEmail: string;
};

type contextType = {
  homeData: homeDataType | undefined;
  setHomeData: React.Dispatch<SetStateAction<homeDataType | undefined>>;
  getHomeData: () => Promise<void>;
  users: UserModel[];
  searchUsers: (query: string) => Promise<void>;
  clearUsers: () => void;
  loadingUsers: boolean;
  userEmail: string;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
};
const appContext = React.createContext<contextType>({
  homeData: undefined,
  setHomeData: () => {},
  getHomeData: async () => {},
  users: [],
  searchUsers: async () => {},
  clearUsers: () => {},
  loadingUsers: false,
  userEmail: '',
  setUserEmail: () => {},
});

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [homeData, setHomeData] = React.useState<homeDataType | undefined>();
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState<string>('');
  const getToken = async (): Promise<string | null> => {
    try {
      const credentials = await keychain.getGenericPassword();
      if (credentials) {
        console.log('Username:', credentials.username);
        return credentials.password;
      }
      console.log('No credentials found');
      return null;
    } catch (error) {
      console.error('Failed to get credentials:', error);
      return null;
    }
  };

  const getHomeData = async (): Promise<void> => {
    try {
      const token = await getToken();
      if (!token) {
        console.log('No access token found');
        return;
      }
      const response = await fetch(`${server_url}/api/home`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const text = await response.text();
      console.log('HOME STATUS:', response.status);
      console.log('HOME RESPONSE:', text);
      if (!text) {
        throw new Error(
          `Backend returned an empty response. Status: ${response.status}`,
        );
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Invalid JSON from backend:', text);
        throw new Error('Backend returned invalid JSON');
      }
      console.log('HOME DATA:', data);
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch home data');
      }
      if (!data.status) {
        throw new Error(data?.message || 'Failed to fetch home data');
      }
      setHomeData(data.data);
    } catch (error) {
      console.error('GET HOME ERROR:', error);
    }
  };
  const searchUsers = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }
    try {
      setLoadingUsers(true);
      const token = await getToken();
      if (!token) {
        console.log('No access token found');
        setUsers([]);
        return;
      }
      const response = await fetch(
        `${server_url}/api/users/search?query=${encodeURIComponent(
          query.trim(),
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const text = await response.text();
      console.log('SEARCH STATUS:', response.status);
      console.log('SEARCH RESPONSE:', text);
      if (!text) {
        throw new Error('Backend returned an empty response');
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Invalid JSON from backend:', text);
        throw new Error('Backend returned invalid JSON');
      }
      console.log('SEARCH DATA:', data);
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to search users');
      }
      if (!data.status) {
        throw new Error(data?.message || 'Failed to search users');
      }
      setUsers(data.data || []);
    } catch (error) {
      console.error('SEARCH USERS ERROR:', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };
  const clearUsers = (): void => {
    setUsers([]);
  };

  return (
    <appContext.Provider
      value={{
        homeData,
        setHomeData,
        getHomeData,
        users,
        searchUsers,
        clearUsers,
        loadingUsers,
        setUserEmail,
        userEmail,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
export { appContext };

export default AppContextProvider;
