import {View, Text, TouchableOpacity} from 'react-native';
import { Stack, useRouter } from 'expo-router';

const SongList = ({songs, onSongPress}) => {
    const router = useRouter();
    return (
        <View>
        {songs.map((song) => {
            <TouchableOpacity
            key={song.key}
            style={styles.container}
            onPress={() => onSongPress(song)}
            ></TouchableOpacity>
        })}
        <Text>SongList</Text>
        </View>
    );
}

export default SongList;