import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const AudioSlider = ({audio}) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const loadAudio = async () => {
            const {sound} = await Audio.Sound.createAsync(
                audio,
                {shouldPlay: true}
            );
            setSound(sound);
            setIsPlaying(true);
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        };
        loadAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [audio]);

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            setIsPlaying(status.isPlaying);
        }
    };

    const playAudio = () => {
        if (sound) {
            sound.playAsync();
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (sound) {
            sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const onSliderValueChange = (value) => {
        if (sound) {
            sound.setPositionAsync(value);
            setPosition(value);
        }
    };

    return (
        <View>
            <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onValueChange={onSliderValueChange} 
            />
            {isPlaying ? (
                <Button title="Pause" onPress={pauseAudio} />
            ) : (
                <Button title="Play" onPress={playAudio} />
            )}
        </View>
    );
};

export default AudioSlider;
