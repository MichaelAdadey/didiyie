import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native';

const MealInfo = () => {
  // State for selected options
  const [selectedRestrictions, setSelectedRestrictions] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
  });
  const [selectedCuisines, setSelectedCuisines] = useState({
    italian: false,
    african: false,
    asian: false,
    mediterranean: false,
  });
  const [selectedAllergens, setSelectedAllergens] = useState({
    nuts: false,
    shellfish: false,
    dairy: false,
    gluten: false,
  });
  const [customPreference, setCustomPreference] = useState('');

  // Handle checkbox toggle
  const handleCheckboxToggle = (category, item) => {
    switch (category) {
      case 'restrictions':
        setSelectedRestrictions(prevState => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      case 'cuisines':
        setSelectedCuisines(prevState => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      case 'allergens':
        setSelectedAllergens(prevState => ({
          ...prevState,
          [item]: !prevState[item],
        }));
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      restrictions: selectedRestrictions,
      cuisines: selectedCuisines,
      allergens: selectedAllergens,
      customPreference: customPreference,
    };
    console.log('Form Data Submitted:', formData);
    // You can export or send this data to an API or other storage
  };

  // Clear form inputs
  const handleClear = () => {
    setSelectedRestrictions({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      lactoseFree: false,
    });
    setSelectedCuisines({
      italian: false,
      african: false,
      asian: false,
      mediterranean: false,
    });
    setSelectedAllergens({
      nuts: false,
      shellfish: false,
      dairy: false,
      gluten: false,
    });
    setCustomPreference('');
  };

  return (
    <ImageBackground
      source={require('../assets/media/mealinfobg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Meal Preferences</Text>

          {/* Dietary Restrictions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Restrictions:</Text>
            <View style={styles.checkboxContainer}>
              {['vegetarian', 'vegan', 'glutenFree', 'lactoseFree'].map(item => (
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
                  <Text style={styles.checkboxText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cuisine Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuisine Preferences:</Text>
            <View style={styles.checkboxContainer}>
              {['italian', 'african', 'asian', 'mediterranean'].map(item => (
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
                  <Text style={styles.checkboxText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Allergens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergens:</Text>
            <View style={styles.checkboxContainer}>
              {['nuts', 'shellfish', 'dairy', 'gluten'].map(item => (
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
                  <Text style={styles.checkboxText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Custom Preference */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Preference:</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter your custom preferences"
              multiline
              numberOfLines={4} // Makes the input box multi-line
              value={customPreference}
              onChangeText={setCustomPreference} // Update state on input change
            />
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker black transparent underlay
    padding: 30, // Zoom in the container by increasing padding
    borderRadius: 10,
    width: '112%',
    borderLeftWidth: 0,
    borderTopWidth: -10,
    borderBottomWidth: -0.2,
    borderColor: '#fff',
    marginLeft: -12, // To ensure full width
    marginRight: 0, // To ensure full width
    minHeight: '80%', // Ensure the container takes up a larger portion of the screen
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
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    backgroundColor: 'transparent',
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#34C759', // Green checkmark color
    borderColor: '#34C759',
  },
  checkboxText: {
    color: '#f5f5dc', // Cream color for the text
  },
  customInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    maxWidth: '95%', // Ensure it doesn't expand horizontally
    minHeight: 80, // Minimum height
    maxHeight: 500, // Maximum height (to prevent it from expanding too much)
    textAlignVertical: 'top', // Align text to the top of the input box
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'center', // Center the buttons vertically
    alignItems: 'center', // Center the buttons horizontally
    marginTop: 10, // Add some space between the inputs and buttons
  },
  buttonClear: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    marginLeft: -22,
    width: '80%', // Adjust width to fit the screen better
    marginBottom: 10, // Add space between the buttons
  },
  buttonSubmit: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginLeft: -22,
    width: '80%', // Adjust width to fit the screen better
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MealInfo;
