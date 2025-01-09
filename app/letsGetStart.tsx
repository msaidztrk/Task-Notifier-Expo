import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import  useSettingsStorage   from './hooks/useSettingsStorage';

const { width } = Dimensions.get('window');

const Login = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation

  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { getSettingsData, saveSettingsData, clearSettingsData } = useSettingsStorage();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        language,
        timePeriod,
        selectedOption,
      };

      saveSettingsData(data);

      Alert.alert('Success', 'Data saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  // Fade-in animation on step change
  useEffect(() => {
    fadeAnim.setValue(0); // Reset animation value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [step]); // Trigger animation only when step changes

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {step === 1 && (
            <View>
              <Text style={styles.label}>Select Language:</Text>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => {
                  setLanguage(itemValue);
                  handleNext();
                }}
                style={styles.picker}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
              </Picker>
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.label}>Select Hour Type:</Text>
              <RadioButton.Group
                onValueChange={(value) => setTimePeriod(value)}
                value={timePeriod}
              >
                <RadioButton.Item
                  label="12 Hours"
                  value="12"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color="#007bff"
                  uncheckedColor="#999"
                />
                <RadioButton.Item
                  label="24 Hours"
                  value="24"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color="#007bff"
                  uncheckedColor="#999"
                />
              </RadioButton.Group>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                  <MaterialIcons name="arrow-back" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>Next</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.label}>Select an option:</Text>
              <RadioButton.Group
                onValueChange={(value) => setSelectedOption(value)}
                value={selectedOption}
              >
                <RadioButton.Item
                  label="Option 1"
                  value="Option 1"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color="#007bff"
                  uncheckedColor="#999"
                />
                <RadioButton.Item
                  label="Option 2"
                  value="Option 2"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color="#007bff"
                  uncheckedColor="#999"
                />
              </RadioButton.Group>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                  <MaterialIcons name="arrow-back" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                  <MaterialIcons name="save" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    marginBottom: 20,
  },
  radioItem: {
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Login;
