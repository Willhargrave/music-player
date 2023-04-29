import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function AudioPlayer() {
    const [sound, setSound] = useState(null)
    const [isplaying, setIsPLaying] = useState(false)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)


async function loadAudio() {
    const {sound} = await Audio.sound.createAsync(
        {uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
        {shouldPlay: true}
    );
    setSound(sound);
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
}
function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
        setIsPlaying(status.isPlaying)
    }
}

function playAudio() {
    sound.playAsync();
    setIsPlaying(true);
}

function pauseAudio() {
    sound.pauseAsync();
    setIsPlaying(false);
}

function onSliderValueChange(value) {     
        sound.setPositionAsync(value)
        setPosition(value);
}

return (
    <View>
        <Text>{isplaying ? 'Playing' : 'Paused'}</Text>
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

        }
