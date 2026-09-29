import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

interface Measurable {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void,
  ) => void;
}

interface PopoverProps {
  visible: boolean;
  anchorRef: React.RefObject<Measurable | null>;
  onClose: () => void;
  children: React.ReactNode;
}

interface PopoverPosition {
  top: number;
  left: number;
  width: number;
}

const Popover = ({
  visible,
  anchorRef,
  onClose,
  children,
}: PopoverProps): React.ReactElement | null => {
  const classRef = useRef<Measurable | null>(null);
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    width: 220,
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const anchor = anchorRef.current;

    if (!anchor) {
      return;
    }

    requestAnimationFrame(() => {
      anchor.measureInWindow((x, y, width, height) => {
        const screenWidth = Dimensions.get('window').width;

        const popoverWidth = 220;
        const horizontalMargin = 16;

        let left = x;

        if (left + popoverWidth > screenWidth - horizontalMargin) {
          left = screenWidth - popoverWidth - horizontalMargin;
        }

        if (left < horizontalMargin) {
          left = horizontalMargin;
        }

        setPosition({
          top: y + height + 8,
          left,
          width: popoverWidth,
        });
      });
    });
  }, [visible, anchorRef]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View
        style={[
          styles.popover,
          {
            top: position.top,
            left: position.left,
            width: position.width,
          },
        ]}
      >
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  popover: {
    position: 'absolute',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});

export default Popover;
