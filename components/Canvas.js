import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CanvasView = React.forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <Canvas ref={ref} />
    </View>
  );
});

export default Canvas;