import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Player, AudioControls, AudioVisualization, Song, SongList, StatusBar, Playlist} from '../components';
import Songs from '../components/AllSongs';
import { useState } from 'react';
import {Audio} from 'expo-av';
const Home = () => {
    const router = useRouter();
    const [selectedSong, setSelectedSong] = useState(null);
    const [sound, setSound] = useState(null);

    const handleSongPress = async (song) => {
        setSelectedSong(song);
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
    };

    const handleAudioPress = async (action) => {
        try {
          if (!sound) {
            const { sound: newSound } = await Audio.Sound.createAsync(
              selectedSong.audio
            );
            setSound(newSound);
            await newSound.playAsync();
          } else {
            switch (action) {
              case "play":
                await sound.playAsync();
                break;
              case "pause":
                await sound.pauseAsync();
                break;
              case "previous":
                await sound.unloadAsync();
                const previousIndex =
                  Songs.findIndex((song) => song.key === selectedSong.key) - 1;
                const previousSong =
                  Songs[previousIndex >= 0 ? previousIndex : Songs.length - 1];
                setSelectedSong(previousSong);
                const { sound: previousSound } = await Audio.Sound.createAsync(
                  previousSong.audio
                );
                setSound(previousSound);
                await previousSound.playAsync();
                break;
              case "next":
                await sound.unloadAsync();
                const nextIndex =
                  Songs.findIndex((song) => song.key === selectedSong.key) + 1;
                const nextSong =
                  Songs[nextIndex <= Songs.length - 1 ? nextIndex : 0];
                setSelectedSong(nextSong);
                const { sound: nextSound } = await Audio.Sound.createAsync(
                  nextSong.audio
                );
                setSound(nextSound);
                await nextSound.playAsync();
                break;
            }
          }
        } catch (error) {
          console.warn(error);
        }
      };
const handleSkipNext = async () => {
    try {
        if (sound) {
            await sound.unloadAsync();
        }
        const nextIndex = Songs.findIndex((song) => song.key === selectedSong.key) + 1;
        const nextSong = Songs[nextIndex <= Songs.length - 1 ? nextIndex : 0];
        setSelectedSong(nextSong);
        const { sound: nextSound } = await Audio.Sound.createAsync(nextSong.audio);
        setSound(nextSound);
        await nextSound.playAsync();
    } catch (error) {
        console.warn(error);
    }
};
    return (
        <SafeAreaView
        style={{
            flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {selectedSong ? (
                    <>
                    <Song 
                    title={selectedSong.title}
                    artist={selectedSong.artist}
                    album={selectedSong.album}
                    duration={selectedSong.duration}
                    audio={selectedSong.audio}
                    image={selectedSong.image}/>
                <AudioControls 
                audio={selectedSong.audio} 
                onAudioPress={handleAudioPress}
                sound={sound}
                onSkipNext={handleSkipNext} />
                </> ) 
                 : (
                    <SongList songs={Songs} onSongPress={handleSongPress}/>
                )}
                <AudioVisualization/>
                
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

export default Home;