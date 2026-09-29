import React, { SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import QuantitySelectorButton from './QuantitySelectorButton';
type QuantitySelectorPropType = {
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
};
function QuantitySelector(prop: QuantitySelectorPropType): React.ReactElement {
  function increment() {
    if (prop.value < 20) {
      prop.setValue(prop.value + 1);
    }
  }
  function decrement() {
    if (prop.value > 1) prop.setValue(prop.value - 1);
  }
  return (
    <>
      <View style={style.mainContainer}>
        <QuantitySelectorButton onPress={decrement}>
          <Text style={style.innerTextStyle}>-</Text>
        </QuantitySelectorButton>
        <Text>{prop.value}</Text>
        <QuantitySelectorButton onPress={increment}>
          <Text style={style.innerTextStyle}>+</Text>
        </QuantitySelectorButton>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  innerTextStyle: {
    height: 'fit-content',
    color: 'white',
  },
});
export default QuantitySelector;
