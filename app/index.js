import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Player, AudioControls, AudioVisualization, Song, SongList, StatusBar, Playlist, Songs } from '../components';
const Home = () => {
    const router = useRouter();
    const [selectedSong, setSelectedSong] = useState(null);
    const handleSongPress = (song) => {
        setSelectedSong(song);
    }
    return (
        <SafeAreaView
        style={{
            flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {selectedSong? (
                    <Song 
                    title={selectedSong.title}
                    artist={selectedSong.artist}
                    album={selectedSong.album}
                    duration={selectedSong.duration}
                    audio={selectedSong.audio}
                    image={selectedSong.image}/>
                ): (
                    <SongList songs={Songs} onSongPress={handleSongPress} />
                )}
                <AudioVisualization/>
                <AudioControls />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

export default Home;