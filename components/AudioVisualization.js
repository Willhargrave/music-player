import React, {useEffect, useRef} from 'react';
import { Audio } from 'expo-av';
import {View, Stylesheet} from 'react-native';


const AudioVisualization = ({sound, playbackPosition, height}) => {
   const canvasRef = useRef(null);

   useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const barWidth = 5;

    const renderFrame = async () => { 
        const status = await sound.getStatusAsync();
        const pos = status.positionMillis || playbackPosition || 0;
        const duration = status.durationMillis || 0;
        const progress = pos / duration;
        const barCount = Math.floor(width / barWidth);
        const barPadding = (width - barCount * barwidth) / (barCount - 1);
        context.clearRect(0, 0, width, height);

        for (let i = 0; i < barCount; i++) { 
            const barX = i * (barWidth + barPadding);
            const barHeight = Math.floor(Math.random() * height);
            context.fillRect(barX, height - barHeight, barWidth, barHeight);
        }

        context.fillStyle = '#FFF';
        context.fillRect(0, height - 2, width, 2);
        context.fillRect(0, height - 2, width * progress, 2);
    }
   })}
    return (
        <View>
        <Text>AudioVisualization</Text>
        </View>
    );
}

export default AudioVisualization;