import {View, ScrollView, SafeAreaView, Text, Image} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles/song.style';
const Song = ({title, artist, album, duration, image}) => {
    const router = useRouter();
    return (
          <View style={styles.container}>
            <Image style={styles.image}
             source={image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.artist}>{artist}</Text>
            <Text style={styles.album}>{album}</Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
    );
}

export default Song;