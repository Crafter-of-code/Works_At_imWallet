import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { appContext } from '../../../store/AppContextProvider';

function UserSearchScreen(): React.ReactElement {
  const navigation = useNavigation<any>();

  const { users, searchUsers, clearUsers, loadingUsers } =
    React.useContext(appContext);

  const [search, setSearch] = React.useState('');

  /*
   * Temporary previous chats.
   *
   * Replace this with your actual chat data later.
   */
  const previousChats = [
    {
      id: '1',
      name: 'Rahul',
      email: 'rahul@gmail.com',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
    },
    {
      id: '2',
      name: 'Aman',
      email: 'aman@gmail.com',
      lastMessage: 'See you tomorrow',
      time: 'Yesterday',
    },
    {
      id: '3',
      name: 'Priya',
      email: 'priya@gmail.com',
      lastMessage: 'Thanks!',
      time: 'Monday',
    },
    {
      id: '4',
      name: 'Arjun',
      email: 'arjun@gmail.com',
      lastMessage: 'Okay 👍',
      time: 'Sunday',
    },
  ];

  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      clearUsers();
      return;
    }

    searchUsers(text);
  };

  const handleUserPress = (user: any) => {
    /*
     * Change "chat" according to your navigator.
     *
     * You can also pass the selected user to the chat screen.
     */
    navigation.navigate('chat', {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
    });
  };

  const isSearching = search.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#999999"
            value={search}
            onChangeText={handleSearch}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButton}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Previous Chats */}
        <View style={styles.chatListContainer}>
          <Text style={styles.sectionTitle}>Recent Chats</Text>

          <FlatList
            data={previousChats}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatItem}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('chat');
                }}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.chatInfo}>
                  <View style={styles.chatTopRow}>
                    <Text style={styles.chatName}>{item.name}</Text>

                    <Text style={styles.chatTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Search Results Overlay */}
        {isSearching && (
          <View style={styles.searchOverlay}>
            <View style={styles.searchResultHeader}>
              <Text style={styles.searchResultTitle}>Search Results</Text>

              {loadingUsers && (
                <ActivityIndicator size="small" color="#B08A18" />
              )}
            </View>

            {!loadingUsers && users.length === 0 && (
              <View style={styles.emptySearch}>
                <Text style={styles.emptySearchTitle}>No users found</Text>

                <Text style={styles.emptySearchText}>
                  Try searching with another name or email.
                </Text>
              </View>
            )}

            <FlatList
              data={users}
              keyExtractor={item => item.userId.toString()}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  activeOpacity={0.7}
                  onPress={() => handleUserPress(item)}
                >
                  <View style={styles.searchAvatar}>
                    <Text style={styles.searchAvatarText}>
                      {item.userName
                        ? item.userName.charAt(0).toUpperCase()
                        : 'U'}
                    </Text>
                  </View>

                  <View style={styles.searchUserInfo}>
                    <Text style={styles.searchUserName}>{item.userName}</Text>

                    <Text style={styles.searchUserEmail}>{item.userEmail}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
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
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#171717',
  },

  searchContainer: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#171717',
  },

  clearButton: {
    fontSize: 25,
    color: '#777777',
    paddingLeft: 10,
  },

  chatListContainer: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#777777',
    marginBottom: 10,
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  chatInfo: {
    flex: 1,
  },

  chatTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  chatName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },

  chatTime: {
    fontSize: 10,
    color: '#999999',
  },

  lastMessage: {
    fontSize: 12,
    color: '#888888',
  },

  /*
   * SEARCH OVERLAY
   */
  searchOverlay: {
    position: 'absolute',
    top: 103,
    left: 20,
    right: 20,
    bottom: 0,

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#EEEEEE',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,

    elevation: 8,

    paddingHorizontal: 15,
    paddingTop: 15,
  },

  searchResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  searchResultTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 13,

    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  searchAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  searchAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  searchUserInfo: {
    flex: 1,
  },

  searchUserName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  searchUserEmail: {
    fontSize: 11,
    color: '#888888',
  },

  emptySearch: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },

  emptySearchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 6,
  },

  emptySearchText: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 17,
  },
});

export default UserSearchScreen;
