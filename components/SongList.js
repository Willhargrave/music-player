import {View, Text, TouchableOpacity} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import styles from './styles/songlist.style'
const SongList = ({songs, onSongPress}) => {
    const router = useRouter();
    return (
        <View>
        {songs.map((song) => {
            <TouchableOpacity
            key={song.key}
            style={styles.container}
            onPress={() => onSongPress(song)}
            >
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>
            </TouchableOpacity>
        })}
        </View>
    );
}

export default SongList;