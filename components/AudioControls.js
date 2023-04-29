import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Audio} from 'expo-av';
import styles from './styles/Audiocontrols.style';
import AudioSlider from './Slider';

const AudioControls = ({audio, onAudioPress, onSkipNext}) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [durationMillis, setDurationMillis] = useState(0);
    const [positionMillis, setPositionMillis] = useState(0);
    const soundRef = useRef(null);
    const [sliderValue, setSliderValue] = useState(0);


    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded) {
        setIsPlaying(status.isPlaying);
        setDurationMillis(status.durationMillis);
        setPositionMillis(status.positionMillis);
        setSliderValue(status.positionMillis / status.durationMillis);
      }
    };
  
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(audio, {
          shouldPlay: true,
          onPlaybackStatusUpdate: onPlaybackStatusUpdate,
        });
        setSound(sound);
        soundRef.current = sound;
      } catch (error) {
        console.log("Error playing sound: ", error);
      }
    };
  
    const pauseSound = async () => {
        if (sound && sound.getStatusAsync().isLoaded) {
          await sound.pauseAsync();
          setIsPlaying(false);
        }
      };

    const handleSliderValueChange = (value) => {
        setSliderValue(value);
        if (soundRef.current && (soundRef.current.getStatusAsync()).isLoaded) {
            const position = value * durationMillis;
            soundRef.current.setPositionAsync(position)
        }
    }
     
    const handleSkipNext = () => {
      if (sound) {
        sound.unloadAsync();
      }
      onSkipNext();
    };
  
    useEffect(() => {
      return soundRef.current ? () => {
        soundRef.current.unloadAsync();
      } : undefined;
    }, []);


    return (
        <View style={styles.container}>
      <TouchableOpacity onPress={pauseSound}>
        <Image style={styles.controlImage} source={isPlaying ? require('./assets/images/pause.png') : require('./assets/images/play.webp')}/>
      </TouchableOpacity>
      <AudioSlider
        value={sliderValue}
        onValueChange={handleSliderValueChange}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FFFFFF"
      />
      <TouchableOpacity onPress={handleSkipNext}>
        <Image style={styles.controlImage} source={require('./assets/images/skip.png')}/>
      </TouchableOpacity>
    </View>
  );
}

export default AudioControls;