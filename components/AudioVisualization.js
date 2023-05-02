import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

const AudioVisualization = ({ audioRef }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const analyser = audioRef?.current?.context.createAnalyser();
      const source = audioRef?.current?.getMediaElementSource();
  
      if (analyser && source) {
        source.connect(analyser);
        analyser.connect(audioRef.current.context.destination);
      }
  
      const render = () => {
        const width = canvas.width;
        const height = canvas.height;
        const frequencyData = new Uint8Array(analyser?.frequencyBinCount || 0);
        analyser?.getByteFrequencyData(frequencyData);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#00CCFF';
        const barWidth = (width / frequencyData.length) * 2.5;
        let x = 0;
        for (let i = 0; i < frequencyData.length; i++) {
          const barHeight = (frequencyData[i] / 255) * height * 0.7;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
        requestAnimationFrame(render);
      };
  
      render();
    }, [audioRef, canvasRef]);

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={{ width: 200, height: 100 }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});