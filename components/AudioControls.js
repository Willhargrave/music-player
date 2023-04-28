import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, props} from 'react';
import {Audio} from 'expo-av';
import style from './styles/Audiocontrols.style';

const AudioControls = () => {
const [sound, setSound] = useState(null);
const [isplaying, setIsPlaying] = useState(false);
const {audio, onAudioPress} = props;
async function playSound() {
    try {
        const {sound} = await Audio.Sound.createAsync(audio, {
            shouldPlay: true,
            onPlaybackStatusUpdate: onPlaybackStatusUpdate,
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
            <Image source={require('./assets/images/rewind.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseSound}>
        <Image source={require('./assets/images/pause.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
        <Image source={require('./assets/images/play.webp')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
        <Image source={require('./assets/images/forward.png')}/>
        </TouchableOpacity>
        </View>
    );
}

export default AudioControls;