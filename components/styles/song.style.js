import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    detailsContainer: {
      flexDirection: 'column',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    artist: {
      fontSize: 14,
      color: '#666',
    },
    duration: {
        fontSize: 12,
        color: '#666',
    },
    album: {
        fontSize: 12,
        color: '#666',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
      }
  });

export default styles;