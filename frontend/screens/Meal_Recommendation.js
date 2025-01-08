import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const MealRecommendation = ({ route }) => {
  // Destructure recommendedDishes with a fallback empty array to avoid destructuring error
  const { recommendedDishes = [] } = route.params || {};

  // Function to render each dish
  const renderDish = ({ item }) => (
    <View style={styles.dishContainer}>
      <Image source={{ uri: item.image_url }} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.dishCuisine}>{item.cuisine}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Dishes</Text>
      {recommendedDishes.length === 0 ? (
        <Text style={styles.noDishesText}>No recommended dishes available.</Text>
      ) : (
        <FlatList
          data={recommendedDishes}
          renderItem={renderDish}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFBF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDishesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  list: {
    marginBottom: 20,
  },
  dishContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dishCuisine: {
    fontSize: 16,
    color: '#777',
  },
  dishDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default MealRecommendation;
