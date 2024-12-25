import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './screens/HomeScreen';
import Meal_Info from './screens/Meal_Info';
import Meal_Recommendation from './screens/Meal_Recommendation';
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
        onPress={() => navigation.navigate('Home')} // Use navigation to navigate
      >
        <Icon name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('MealInfo')}
      >
        <Icon name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('MealRecommendation')}
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
