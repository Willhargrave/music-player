import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

const AudioControls = ({
  audio,
  onAudioPress,
  onSkipNext,
  sound,
  setSound,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(null);

  useEffect(() => {
    const initSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(audio);
      setSound(newSound);
      setIsPlaying(true);
    };

    initSound();
  }, [audio]);

  const handleAudioPress = async (action) => {
    switch (action) {
      case "play":
        await sound.playAsync();
        setIsPlaying(true);
        setSelectedSong((prevState) => ({ ...prevState, isPlaying: true, sound: sound })); // Add sound object to state
        break;
      case "pause":
        await sound.pauseAsync();
        setIsPlaying(false);
        setSelectedSong((prevState) => ({ ...prevState, isPlaying: false})); // Add sound object to state
        break;
      case "previous":
        // handle previous track
        break;
      case "next":
        onSkipNext();
        setIsPlaying(true);
        setSelectedSong((prevState) => ({ ...prevState, isPlaying: true})); // Add sound object to state
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
      setPlaybackPosition(0);
      setPlaybackDuration(null);
      setIsPlaying(false);
    }
  };

  const handleSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };

  const handleSliderSlidingComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval;

    const getPlaybackStatus = async () => {
      if (sound && isPlaying) {
        const status = await sound.getStatusAsync();
        handlePlaybackStatusUpdate(status);
      }
    };

    interval = setInterval(getPlaybackStatus, 1000);

    return () => clearInterval(interval);
  }, [sound, isPlaying]);

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
        maximumValue={playbackDuration || 0}
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