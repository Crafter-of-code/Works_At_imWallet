import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SolidButton from '../../../ui/SolidButton';
import OutlineButton from '../../../ui/OutlineButton';
import { StackActions, useNavigation } from '@react-navigation/native';
import MainContextProvider, {
  mainContext,
} from '../../../store/MainContextProvider';

function RootPage(): React.ReactElement {
  const { getAccessToken } = React.useContext(mainContext);
  React.useEffect(() => {
    async function checkUserLogin() {
      try {
        const token = await getAccessToken();
        if (token != '') {
          // console.log('you already login');
          nav.navigate('home');
        }
      } catch (e) {
        console.log('facing error while redirecting to the home page directly');
        console.log(e);
      }
    }
    checkUserLogin();
  }, []);
  const nav = useNavigation<any>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.smallTitle}>WELCOME TO</Text>

          <Text style={styles.title}>The App</Text>

          <Text style={styles.description}>
            Capture your thoughts, organize your ideas, and keep everything that
            matters in one place.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <SolidButton
            style={styles.button}
            onPress={() => nav.navigate(StackActions.replace('home'))}
          >
            Login
          </SolidButton>

          <OutlineButton
            style={styles.button}
            onPress={() => {
              nav.navigate('signin');
            }}
          >
            Sign Up
          </OutlineButton>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#B08A18',
    marginBottom: 8,
  },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.5,
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 320,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  button: {
    flex: 1,
  },
});

export default RootPage;
