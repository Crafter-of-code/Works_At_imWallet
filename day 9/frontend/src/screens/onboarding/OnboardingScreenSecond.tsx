import React from 'react';
import SafeAreaContainer from '../../components/SafeAreaContainer';
import { Image, StyleSheet, Text, View } from 'react-native';
function OnboardingScreenSecond(): React.ReactElement {
  return (
    <>
      <SafeAreaContainer>
        <View style={style.topContainer}>
          <View style={[style.topContainer]}>
            <Image
              style={style.topContainerLeftImage}
              source={require('../../assets/vaultpay_logo_extracted.png')}
            />
            <Text style={{ textTransform: 'capitalize', fontWeight: '800' }}>
              Vault Pay
            </Text>
          </View>
        </View>
      </SafeAreaContainer>
    </>
  );
}
const style = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  topContainerLeftImage: {
    height: 30,
    width: 30,
  },
  textStyling: {},
});
export default OnboardingScreenSecond;
