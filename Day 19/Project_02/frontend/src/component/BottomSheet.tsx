import React from 'react';

import { Modal, Pressable, StyleSheet, View } from 'react-native';

type bottomSheetPropType = {
  isBottomSheetVisible: boolean;
  setBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const BottomSheet = (props: bottomSheetPropType): React.ReactElement => {
  return (
    <Modal
      visible={props.isBottomSheetVisible}
      transparent
      animationType="slide"
      onRequestClose={() => props.setBottomSheetVisible(false)}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => props.setBottomSheetVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  bottomSheet: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    minHeight: 200,
  },

  handle: {
    width: 45,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#D0D0D0',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default BottomSheet;
