import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useState, useRef } from "react";
const AudioControls = ({
  audio,
  onAudioPress,
  onSkipNext,
  sound,
  setSound,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackPosition, setPlaybackPosition] = useState(null);
  const [playbackDuration, setPlaybackDuration] = useState(null);
  const soundRef = useRef(null)
  const handleAudioPress = async (action) => {
    switch (action) {
      case "play":
        console.log(soundRef.current);
        if (!soundRef.current) {
          const { sound: newSound } = await Audio.Sound.createAsync(audio);
          soundRef.current = newSound;
          await newSound.playAsync();
          setIsPlaying(true);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
        break;
      case "pause":
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        break;
      case "previous":
        // handle previous track
        break;
      case "next":
        onSkipNext();
        setIsPlaying(true);
        break;
      default:
        break;
    }
  };

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded) {
      setPlaybackPosition(playbackStatus.positionMillis);
      setPlaybackDuration(playbackStatus.durationMillis);
      setIsPlaying(playbackStatus.isPlaying);
    } else {
      setPlaybackPosition(null);
      setPlaybackDuration(null);
      setIsPlaying(false);
    }
  };

  const handleSliderValueChange = async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };
  const handleSliderSlidingComplete = async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };
  useEffect(() => {
    let interval;
    if (soundRef.current && isPlaying) {
      interval = setInterval(async () => {
        const status = await soundRef.current.getStatusAsync();
        handlePlaybackStatusUpdate(status);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [soundRef.current, isPlaying]);
   
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleAudioPress(isPlaying ? "pause" : "play")}
      >
        <FontAwesome
          name={isPlaying ? "pause" : "play"}
          size={32}
          color="white"
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={playbackDuration}
        value={playbackPosition}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSliderSlidingComplete}
        disabled={!sound}
      />
      <TouchableOpacity onPress={() => handleAudioPress("next")}>
        <FontAwesome
          name="step-forward"
          size={32}
          color="white"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default AudioControls;