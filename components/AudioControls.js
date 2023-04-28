import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import style from './styles/Audiocontrols.style';
import styles from './styles/song.style';

const AudioControls = (props) => {
const [sound, setSound] = useState(null);
const [isplaying, setIsPlaying] = useState(false);
const {audio, onAudioPress} = props;

const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
        setIsPlaying(status.isPlaying);
    }
};
    const playSound = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(audio, {
            shouldPlay: true,
            onPlaybackStatusUpdate: onPlaybackStatusUpdate,
          });
          setSound(sound);
        } catch (error) {
          console.log('Error playing sound: ', error);
        }
      };
    
      const pauseSound = async () => {
        if (sound) {
          await sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    
      const stopSound = async () => {
        if (sound) {
          await sound.stopAsync();
          setIsPlaying(false);
        }
      };
    
      const skipForward = async () => {
        if (sound) {
          await sound.playFromPositionAsync(sound.positionMillis + 10000);
        }
      };
    
      const skipBackward = async () => {
        if (sound) {
          await sound.playFromPositionAsync(sound.positionMillis - 10000);
        }
      };

useEffect(() => {
    return sound
    ? () => {
        sound.unloadAsync();
    }
    : undefined;
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
        </View>
    );
}

export default AudioControls;