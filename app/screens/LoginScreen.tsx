import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { router } from 'expo-router'; // For navigation
import useSettingsStorage from '../hooks/useSettingsStorage';
import { Routes } from '../navigation/routes';

const { width } = Dimensions.get('window');

const Login = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation

  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { saveSettingsData } = useSettingsStorage();

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

      await saveSettingsData(data); // Save data to AsyncStorage
      Alert.alert('Success', 'Data saved successfully!');
      router.replace(Routes.HOME);
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
    <Animated.View className="flex-1 bg-gray-50 p-5" style={{ opacity: fadeAnim }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="bg-white rounded-lg shadow-sm p-6">
          {step === 1 && (
            <View>
              <Text className="text-lg font-semibold text-gray-800 mb-4">Select Language:</Text>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => {
                  setLanguage(itemValue);
                  handleNext();
                }}
                className="mb-6"
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
              </Picker>
            </View>
          )}

          {step === 2 && (
            <View>
              <Text className="text-lg font-semibold text-gray-800 mb-4">Select Hour Type:</Text>
              <RadioButton.Group
                onValueChange={(value) => setTimePeriod(value)}
                value={timePeriod}
              >
                <RadioButton.Item
                  label="12 Hours"
                  value="12"
                  labelStyle={{ fontSize: 16, color: '#333' }}
                  style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}
                  color="#007bff"
                  uncheckedColor="#999"
                />
                <RadioButton.Item
                  label="24 Hours"
                  value="24"
                  labelStyle={{ fontSize: 16, color: '#333' }}
                  style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}
                  color="#007bff"
                  uncheckedColor="#999"
                />
              </RadioButton.Group>
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handlePrevious}
                >
                  <MaterialIcons name="arrow-back" size={20} color="#fff" />
                  <Text className="text-white text-lg ml-2">Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleNext}
                >
                  <Text className="text-white text-lg mr-2">Next</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text className="text-lg font-semibold text-gray-800 mb-4">Select an option:</Text>
              <RadioButton.Group
                onValueChange={(value) => setSelectedOption(value)}
                value={selectedOption}
              >
                <RadioButton.Item
                  label="Option 1"
                  value="Option 1"
                  labelStyle={{ fontSize: 16, color: '#333' }}
                  style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}
                  color="#007bff"
                  uncheckedColor="#999"
                />
                <RadioButton.Item
                  label="Option 2"
                  value="Option 2"
                  labelStyle={{ fontSize: 16, color: '#333' }}
                  style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}
                  color="#007bff"
                  uncheckedColor="#999"
                />
              </RadioButton.Group>
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handlePrevious}
                >
                  <MaterialIcons name="arrow-back" size={20} color="#fff" />
                  <Text className="text-white text-lg ml-2">Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleSave}
                >
                  <Text className="text-white text-lg mr-2">Save</Text>
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

export default Login;