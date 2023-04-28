import {View, ScrollView, SafeAreaView, Text, Image} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Song = ({title, artist, album, duration}) => {
    const router = useRouter();
    return (
          <View>
            <Image source={require('../assets/Liquidswords.png')} />
            <Text>{title}</Text>
            <Text>{artist}</Text>
            <Text>{album}</Text>
            <Text>{duration}</Text>
          </View>
    );
}

export default Song;