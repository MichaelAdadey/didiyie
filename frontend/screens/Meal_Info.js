import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Meal_Recommendation from './Meal_Recommendation';

const MealInfo = () => {
  const navigation = useNavigation();

  // Hardcoded options
  const dietaryRestrictions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'];
  const cuisinePreferences = ['Italian', 'Mexican', 'Chinese', 'Indian'];
  const allergens = ['Peanuts', 'Dairy', 'Shellfish', 'Soy'];

  // State for selected options
  const [selectedRestrictions, setSelectedRestrictions] = useState({});
  const [selectedCuisines, setSelectedCuisines] = useState({});
  const [selectedAllergens, setSelectedAllergens] = useState({});

  // Handle checkbox toggle
  const handleCheckboxToggle = (category, item) => {
    switch (category) {
      case 'restrictions':
        setSelectedRestrictions((prevState) => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      case 'cuisines':
        setSelectedCuisines((prevState) => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      case 'allergens':
        setSelectedAllergens((prevState) => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const selectedData = {
      restrictions: Object.keys(selectedRestrictions).filter(
        (key) => selectedRestrictions[key]
      ),
      cuisines: Object.keys(selectedCuisines).filter(
        (key) => selectedCuisines[key]
      ),
      allergens: Object.keys(selectedAllergens).filter(
        (key) => selectedAllergens[key]
      ),
    };

    try {
      const response = await fetch('http://localhost:3000/api/dishes/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedData),
      });

      const recommendedDishes = await response.json();
      navigation.navigate('MealRecommendation', { recommendedDishes });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  // Clear form inputs
  const handleClear = () => {
    setSelectedRestrictions({});
    setSelectedCuisines({});
    setSelectedAllergens({});
  };

  return (
    <ImageBackground
      source={require('../screens/assets/media/mealinfobg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Meal Preferences</Text>

          {/* Dietary Restrictions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Restrictions:</Text>
            <View style={styles.checkboxContainer}>
              {dietaryRestrictions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.checkboxRow}
                  onPress={() => handleCheckboxToggle('restrictions', item)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedRestrictions[item] && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cuisine Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuisine Preferences:</Text>
            <View style={styles.checkboxContainer}>
              {cuisinePreferences.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.checkboxRow}
                  onPress={() => handleCheckboxToggle('cuisines', item)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedCuisines[item] && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Allergens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergens:</Text>
            <View style={styles.checkboxContainer}>
              {allergens.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.checkboxRow}
                  onPress={() => handleCheckboxToggle('allergens', item)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedAllergens[item] && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
              <Text style={styles.buttonText}>CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 30,
    borderRadius: 10,
    width: '90%',
    minHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFBF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkboxText: {
    color: '#f5f5dc',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonClear: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    marginBottom: 10,
  },
  buttonSubmit: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MealInfo;
