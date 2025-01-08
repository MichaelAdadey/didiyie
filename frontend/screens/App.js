import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './HomeScreen';
import Meal_Info from './Meal_Info';
import Meal_Recommendation from './Meal_Recommendation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MealInfo" component={Meal_Info} />
      <Stack.Screen name="MealRecommendation" component={Meal_Recommendation} />
    </Stack.Navigator>
    <Navbar />
  </NavigationContainer>
);

const Navbar = () => {
  const navigation = useNavigation(); // Use the hook to get the navigation object

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')} // Navigate to Home
      >
        <Icon name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('MealInfo')} // Navigate to Meal Info
      >
        <Icon name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          // Example of passing parameters
          const recommendedDishes = []; // This should be the actual data you want to pass
          navigation.navigate('MealRecommendation', { recommendedDishes });
        }}
      >
        <Icon name="heart" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#131010',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
