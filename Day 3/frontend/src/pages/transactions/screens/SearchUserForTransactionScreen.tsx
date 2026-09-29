import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appContext } from '../../../store/AppContextProvider';

function UserSearchScreen(): React.ReactElement {
  const { users, searchUsers, clearUsers, loadingUsers } =
    React.useContext(appContext);

  const [search, setSearch] = React.useState('');

  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      clearUsers();
      return;
    }

    searchUsers(text);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Search Users</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search user..."
          placeholderTextColor="#999999"
          value={search}
          onChangeText={handleSearch}
        />

        {loadingUsers && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#B08A18" />
          </View>
        )}

        {!loadingUsers && users.length === 0 && search.trim() !== '' && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No users found</Text>

            <Text style={styles.emptyText}>
              Try searching with a different name or email.
            </Text>
          </View>
        )}

        <FlatList
          data={users}
          keyExtractor={item => item.userId.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.userName ? item.userName.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>

                <Text style={styles.userEmail}>{item.userEmail}</Text>
              </View>
            </View>
          )}
        />
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
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 20,
  },

  searchInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#171717',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },

  loadingContainer: {
    paddingVertical: 15,
    alignItems: 'center',
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 12,
    color: '#888888',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
});

export default UserSearchScreen;
