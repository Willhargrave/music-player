import React from "react";
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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackPosition, setPlaybackPosition] = React.useState(null);
  const [playbackDuration, setPlaybackDuration] = React.useState(null);

  const handleAudioPress = async (action) => {
    switch (action) {
      case "play":
        if (!sound) {
          const { sound: newSound } = await Audio.Sound.createAsync(audio);
          setSound(newSound);
          await newSound.playAsync();
          setIsPlaying(true);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
        break;
      case "pause":
        await sound.pauseAsync();
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
    if (sound) {
      await sound.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };

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