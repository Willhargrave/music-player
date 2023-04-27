import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Player, AudioControls, AudioVisualization, Song, SongList, StatusBar, Playlist } from '../components';
const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Song />
                <AudioVisualization/>
                <AudioControls />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

export default Home;