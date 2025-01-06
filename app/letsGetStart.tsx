import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Animated, Easing, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons


const { width, height } = Dimensions.get('window');

const Login = () => {

  const fadeAnim = useState(new Animated.Value(0))[0]; // For fade-in animation

  // Fade-in animation on component mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);



  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View style={{ opacity: fadeAnim }} className="flex-1 justify-center items-center p-4">
        <View style={{ width: width * 0.9 }} className="bg-white rounded-lg p-6">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</Text>
          <Text className="text-lg text-center text-gray-600 mb-8">Login to your account</Text>

          <View className="flex-row items-center border border-gray-300 rounded-lg mb-4 px-3">
            <MaterialIcons name="email" size={24} color="#666" className="mr-2" />
        
          </View>

          <View className="flex-row items-center border border-gray-300 rounded-lg mb-6 px-3">
            <MaterialIcons name="lock" size={24} color="#666" className="mr-2" />

          </View>


          <Text className="text-center mt-6 text-gray-600">
            Don't have an account? <Text className="text-blue-500 font-bold">Sign up</Text>
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height, // Ensure the ScrollView takes up the full height of the screen
  },
});

export default Login;