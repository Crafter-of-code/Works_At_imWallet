import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SafeAreaContainer from '../component/SafeAreaContainer';
import lightTheme from '../theme/lightTheme';
import { mainContext } from '../store/MainContextProvider';
import { appName } from '../store/config';
function SplashScreen() {
  const { isUserAuthenticated, clearKeychain } = React.useContext(mainContext);
  React.useEffect(() => {
    isUserAuthenticated();
  });

  return (
    <>
      <SafeAreaContainer>
        <View style={style.parentContainer}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
              borderRadius: 20,
              opacity: 1,
              overflow: 'hidden',
              alignSelf: 'center',
              margin: 10,
            }}
            source={require('../../src/asset/appIcon/compass-icon-image.png')}
          />
          <Text style={style.headingText}>{appName}</Text>
        </View>
      </SafeAreaContainer>
    </>
  );
}
const style = StyleSheet.create({
  parentContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: lightTheme.typography.fontFamily.extraBold,
    fontWeight: 700,
    fontSize: lightTheme.typography.fontSize.xl,
  },
});
export default SplashScreen;
