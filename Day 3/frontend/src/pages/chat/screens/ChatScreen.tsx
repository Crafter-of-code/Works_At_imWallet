import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const messages = [
  {
    id: '1',
    message: 'Hello! How can I help you today?',
    sender: 'bot',
  },
  {
    id: '2',
    message: 'I want to check my recent transactions.',
    sender: 'user',
  },
  {
    id: '3',
    message: 'Sure, I can help you with that.',
    sender: 'bot',
  },
];

function ChatScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.botIcon}>
              <Text style={styles.botIconText}>$</Text>
            </View>

            <View>
              <Text style={styles.title}>Finance Assistant</Text>

              <Text style={styles.subtitle}>Your financial assistant</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => {
            const isUser = item.sender === 'user';

            return (
              <View
                style={[
                  styles.messageRow,
                  isUser ? styles.userRow : styles.botRow,
                ]}
              >
                {!isUser && (
                  <View style={styles.smallBotIcon}>
                    <Text style={styles.smallBotText}>$</Text>
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.userMessageText : styles.botMessageText,
                    ]}
                  >
                    {item.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* Input */}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#999999"
              style={styles.input}
            />

            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendText}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Header */

  header: {
    height: 75,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  botIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  botIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#171717',
  },

  subtitle: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreText: {
    fontSize: 21,
    color: '#171717',
  },

  /* Messages */

  messagesContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 15,
  },

  messageRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  botRow: {
    justifyContent: 'flex-start',
  },

  userRow: {
    justifyContent: 'flex-end',
  },

  smallBotIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },

  smallBotText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 17,
  },

  botBubble: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderTopLeftRadius: 5,
  },

  userBubble: {
    backgroundColor: '#171717',
    borderTopRightRadius: 5,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  botMessageText: {
    color: '#333333',
  },

  userMessageText: {
    color: '#FFFFFF',
  },

  /* Input */

  inputArea: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 15,
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 27,
    paddingLeft: 17,
    paddingRight: 7,
  },

  input: {
    flex: 1,
    color: '#171717',
    fontSize: 14,
    paddingVertical: 10,
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    marginTop: -2,
  },
});

export default ChatScreen;
