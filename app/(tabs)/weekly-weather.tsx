import { View, Text, StyleSheet, FlatList } from 'react-native';

const weeklyWeatherData = [
    { day: 'Monday', temperature: '25°C', condition: 'Sunny' },
    { day: 'Tuesday', temperature: '22°C', condition: 'Cloudy' },
    { day: 'Wednesday', temperature: '20°C', condition: 'Rainy' },
    { day: 'Thursday', temperature: '24°C', condition: 'Partly Cloudy' },
    { day: 'Friday', temperature: '26°C', condition: 'Sunny' },
    { day: 'Saturday', temperature: '27°C', condition: 'Sunny' },
    { day: 'Sunday', temperature: '23°C', condition: 'Windy' },
];

const WeeklyWeather = () => {
    const renderWeatherItem = ({ item }: { item: typeof weeklyWeatherData[0] }) => (
        <View style={styles.weatherItem}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.temperature}>{item.temperature}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weekly Weather</Text>
            <FlatList
                data={weeklyWeatherData}
                renderItem={renderWeatherItem}
                keyExtractor={(item) => item.day}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#3A7BD5', // Sky blue background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#ffffff', // White text
    },
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#ffffff', // White background for items
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    day: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000080', // Navy blue text
    },
    temperature: {
        fontSize: 16,
        color: '#000080', // Navy blue text
    },
    condition: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#000080', // Navy blue text
    },
});

export default WeeklyWeather;
