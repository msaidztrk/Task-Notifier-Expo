import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DaySelector = ({ selectedDays, toggleDaySelection } : any) => {
  return (
    <View className="flex-row justify-between mt-4">
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          onPress={() => toggleDaySelection(day)}
          className={`p-2 rounded-full ${
            selectedDays.includes(day) ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`text-center ${
              selectedDays.includes(day) ? 'text-white' : 'text-gray-800'
            }`}
          >
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DaySelector;
