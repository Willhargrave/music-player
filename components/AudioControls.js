import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import style from './styles/Audiocontrols.style';
const AudioControls = () => {
const [sound, setSound] = useState(null);
const [isplaying, setIsPlaying] = useState(false);
async function playSound() {
    try {
        const {sound} = await Audio.Sound.createAsync(audio {
            shouldPlay: true,
            onPlaybackStatusUpdate: onPlatbackStatusUpdate,
        });
        setSound(sound)
        setIsPlaying(true);
    } catch (error) {
        console.log("Error playing sound: ", error)
    }
}
async function pauseSound() {
    if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
    }
}
async function stopSound() {
    if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
    }
}
async function skipForward() {
    if (sound) {
        await sound.playFromPositionAsync(sound.positionMillis + 10000);
    }
}
async function skipBackward() {
    if (sound) {
        await sound.playFromPositionAsync(sound.positionMillis - 10000);
    }
}

useEffect(() => {
    return sound
    ? () => {
        sound.unloadAsync();
    }
    : undefined;
}, [sound]);

    return (
        <View>
        <TouchableOpacity onPress={skipBackward}>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseSound}>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
        </TouchableOpacity>
        </View>
    );
}

export default AudioControls;