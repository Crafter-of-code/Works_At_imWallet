import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

type UserProfile = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_verified: boolean;
};

function ProfilePage(): React.ReactElement {
  const user: UserProfile = {
    user_id: 1001,
    user_name: 'Uzair Khan',
    user_email: 'uzair@example.com',
    user_verified: true,
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');

    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  };

  const handleEditProfile = () => {
    // navigation.navigate('EditProfile');
    console.log('Edit Profile');
  };

  const handleChangePassword = () => {
    // navigation.navigate('ChangePassword');
    console.log('Change Password');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // logout();
          console.log('Logout');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>ACCOUNT</Text>

            <Text style={styles.headerTitle}>My Profile</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Hero */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user.user_name)}</Text>
          </View>

          <Text style={styles.userName}>{user.user_name}</Text>

          <Text style={styles.userEmail}>{user.user_email}</Text>

          {/* Verification */}
          <View
            style={[
              styles.verificationBadge,
              user.user_verified
                ? styles.verifiedBadge
                : styles.unverifiedBadge,
            ]}
          >
            <Text
              style={[
                styles.verificationIcon,
                user.user_verified
                  ? styles.verifiedText
                  : styles.unverifiedText,
              ]}
            >
              {user.user_verified ? '✓' : '!'}
            </Text>

            <Text
              style={[
                styles.verificationText,
                user.user_verified
                  ? styles.verifiedText
                  : styles.unverifiedText,
              ]}
            >
              {user.user_verified ? 'Email Verified' : 'Email Not Verified'}
            </Text>
          </View>
        </View>

        {/* Account Details */}
        <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>

        <View style={styles.detailsCard}>
          {/* User ID */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>#</Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>USER ID</Text>

                <Text style={styles.detailValue}>{user.user_id}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Name */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>N</Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>NAME</Text>

                <Text style={styles.detailValue}>{user.user_name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Email */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>@</Text>
              </View>

              <View style={styles.emailContainer}>
                <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>

                <Text
                  style={styles.detailValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user.user_email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security */}
        <Text style={styles.sectionTitle}>SECURITY</Text>

        <View style={styles.securityCard}>
          {/* Change Password */}
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={handleChangePassword}
          >
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>🔒</Text>
              </View>

              <View>
                <Text style={styles.actionTitle}>Change Password</Text>

                <Text style={styles.actionDescription}>
                  Update your account password
                </Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Verification */}
          <View style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>✓</Text>
              </View>

              <View>
                <Text style={styles.actionTitle}>Email Verification</Text>

                <Text style={styles.actionDescription}>
                  {user.user_verified
                    ? 'Your email is verified'
                    : 'Your email is not verified'}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statusBadge,
                user.user_verified
                  ? styles.statusVerified
                  : styles.statusPending,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  user.user_verified
                    ? styles.verifiedText
                    : styles.unverifiedText,
                ]}
              >
                {user.user_verified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>↪</Text>

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  // -----------------------------------------
  // Base
  // -----------------------------------------

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  // -----------------------------------------
  // Header
  // -----------------------------------------

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 28,
  },

  smallTitle: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#B08A18',
    marginBottom: 6,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.5,
  },

  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#171717',
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  // -----------------------------------------
  // Profile Hero
  // -----------------------------------------

  profileCard: {
    backgroundColor: '#171717',
    borderRadius: 22,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  userEmail: {
    color: '#999999',
    fontSize: 12,
    marginTop: 6,
  },

  // -----------------------------------------
  // Verification
  // -----------------------------------------

  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
  },

  verifiedBadge: {
    backgroundColor: '#292714',
  },

  unverifiedBadge: {
    backgroundColor: '#30251A',
  },

  verificationIcon: {
    fontSize: 12,
    fontWeight: '800',
    marginRight: 6,
  },

  verificationText: {
    fontSize: 10,
    fontWeight: '700',
  },

  verifiedText: {
    color: '#B08A18',
  },

  unverifiedText: {
    color: '#D08A35',
  },

  // -----------------------------------------
  // Section
  // -----------------------------------------

  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: '#888888',
    marginBottom: 12,
  },

  // -----------------------------------------
  // Account Details
  // -----------------------------------------

  detailsCard: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 17,
    paddingHorizontal: 17,
    marginBottom: 30,
  },

  detailItem: {
    minHeight: 76,
    justifyContent: 'center',
  },

  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  detailIconText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#171717',
  },

  detailLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#999999',
    marginBottom: 5,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  emailContainer: {
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  // -----------------------------------------
  // Security
  // -----------------------------------------

  securityCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 17,
    paddingHorizontal: 17,
    marginBottom: 25,
  },

  actionItem: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  actionIconText: {
    fontSize: 15,
    color: '#171717',
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  actionDescription: {
    fontSize: 9,
    color: '#999999',
  },

  arrow: {
    fontSize: 25,
    color: '#999999',
    marginLeft: 10,
  },

  // -----------------------------------------
  // Status
  // -----------------------------------------

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  statusVerified: {
    backgroundColor: '#F5F1E1',
  },

  statusPending: {
    backgroundColor: '#FFF4E5',
  },

  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },

  // -----------------------------------------
  // Logout
  // -----------------------------------------

  logoutButton: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  logoutIcon: {
    fontSize: 19,
    color: '#777777',
    marginRight: 8,
  },

  logoutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555555',
  },

  bottomSpace: {
    height: 20,
  },
});
