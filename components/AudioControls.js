import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import styles from './styles/Audiocontrols.style';


const AudioControls = ({audio, onAudioPress, onSkipNext}) => {
const [sound, setSound] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);


const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
        setIsPlaying(status.isPlaying);
    }
};
    
const playSound = async () => {
    try {
        if (sound) {
            await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(audio, {
            shouldPlay: true,
            onPlaybackStatusUpdate: onPlaybackStatusUpdate,
        });
        setSound(newSound);
    } catch (error) {
        console.log('Error playing sound: ', error);
    }
};

  const pauseSound = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const skipForward = async () => {
    if (sound) {
      const newPositionMillis = sound.positionMillis + 10000;
      const durationMillis = await sound.getStatusAsync().then(status => status.durationMillis);
      const finalPositionMillis = newPositionMillis > durationMillis ? durationMillis : newPositionMillis;
      await sound.setPositionAsync(finalPositionMillis);
    }
};

const skipBackward = async () => {
    if (sound) {
      const newPositionMillis = sound.positionMillis - 10000;
      const finalPositionMillis = newPositionMillis < 0 ? 0 : newPositionMillis;
      await sound.setPositionAsync(finalPositionMillis);
    }
};

  const handleSkipNext = () => {
    if (sound) {
      sound.unloadAsync();
    }
    onSkipNext();
  };

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);


    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={skipBackward}>
            <Image style={styles.controlImage}source={require('./assets/images/rewind.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseSound}>
        <Image style={styles.controlImage} source={require('./assets/images/pause.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
        <Image style={styles.controlImage} source={require('./assets/images/play.webp')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
        <Image style={styles.controlImage} source={require('./assets/images/forward.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipNext}>
        <Image style={styles.controlImage} source={require('./assets/images/skip.png')}/>
        </TouchableOpacity>
        </View>
    );
}

export default AudioControls;