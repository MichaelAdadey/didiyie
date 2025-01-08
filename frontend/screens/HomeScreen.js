import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation(); // Get the navigation object using the hook

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../screens/assets/media/homebg.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Didiyie</Text>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Welcome!</Text>
          <Text style={styles.description}>
            Plan meals tailored to your healthy dietary needs and preferences. Enjoy a flexible meal schedule that suits your lifestyle.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MealInfo')} // Use navigation here
          >
            <Text style={styles.buttonText}>Start Selection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3748',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 90, // 40px from the top
    left: 20, // 20px from the left
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // soft black shadow
    textShadowOffset: { width: 1, height: 1 }, // slight offset for depth
    textShadowRadius: 5, // blur radius
  },
  textContainer: {
    position: 'absolute',
    bottom: 60, // 40px from the bottom edge
    left: 20,
    right: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // soft black shadow
    textShadowOffset: { width: 1, height: 1 }, // slight offset for depth
    textShadowRadius: 5, // blur radius
  },
  description: {
    fontSize: 16,
    color: '#cbd5e0',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // soft black shadow
    textShadowOffset: { width: 1, height: 1 }, // slight offset for depth
    textShadowRadius: 5, // blur radius
  },
  button: {
    backgroundColor: 'brown',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
