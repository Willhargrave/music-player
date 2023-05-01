import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CanvasView = forwardRef((props, ref) => {
  const handleCanvas = (canvas) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'purple';
      ctx.fillRect(0, 0, 100, 100);
    }
  };

  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContext: () => {
      return canvasRef.current.getContext('2d');
    },
  }));

  return (
    <View style={styles.container}>
      <Canvas ref={handleCanvas} />
    </View>
  );
});

export default CanvasView;