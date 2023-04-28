import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles/songlist.style'
const SongList = ({songs, onSongPress}) => {
    return (
        <View>
        {songs.map((song) => {
            return (
            <TouchableOpacity
            key={song.key}
            style={styles.container}
            onPress={() => onSongPress(song)}
            >
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>
            </TouchableOpacity>
            )    
    })}
        </View>
    
    );
}

export default SongList;