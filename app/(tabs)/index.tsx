import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';

const LandingPage = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Image source={require('./image (2) (3).webp')} 
            style={{width: 150, height: 150}}
            />
            <Text style={styles.title}>Welcome to SkyCast!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3a7bd5",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Times New Roman',
    },
    button: {
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default LandingPage;
