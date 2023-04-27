import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';

const StatusBar = () => {
    const router = useRouter();
    return (
        <View>
        <Text>StatusBar</Text>
        </View>
    );
}

export default StatusBar;