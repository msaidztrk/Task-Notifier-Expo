import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface TimeSlotProps {
  index: number;
  selection: {
    startTime: string;
    endTime: string;
    radioValue: string;
  };
  handleTimeChange: (index: number, field: 'startTime' | 'endTime', value: string) => void;
  handleRadioChange: (index: number, value: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ index, selection, handleTimeChange, handleRadioChange }) => {
  const [error, setError] = useState<string | null>(null);

  // Function to validate and format time input
  const formatAndValidateTimeInput = (value: string, field: 'startTime' | 'endTime') => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Limit to 4 digits
    const truncatedValue = numericValue.slice(0, 4);

    // Insert colon after the first 2 digits
    let formattedValue = truncatedValue;
    if (truncatedValue.length > 2) {
      formattedValue = `${truncatedValue.slice(0, 2)}:${truncatedValue.slice(2)}`;
    }

    // Validate hours and minutes
    const [hours, minutes] = formattedValue.split(':');
    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);

    if (hoursNum > 23 || (hoursNum === 24 && minutesNum > 0)) {
      setError('Hours must be between 00 and 23.');
      return;
    }

    if (minutesNum > 59) {
      setError('Minutes must be between 00 and 59.');
      return;
    }

    // Clear error if validation passes
    setError(null);

    // Update the time value
    handleTimeChange(index, field, formattedValue);
  };

  return (
    <View className="mb-5">
      {/* Start Time Input */}
      <Text className="text-sm text-gray-700 mb-1">Start Time:</Text>
      <TextInput
        className={`border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg p-2 mb-3 bg-white`}
        placeholder="HH:MM"
        value={selection.startTime}
        onChangeText={(text) => formatAndValidateTimeInput(text, 'startTime')}
        keyboardType="numeric"
        maxLength={5} // HH:MM has 5 characters
      />

      {/* End Time Input */}
      <Text className="text-sm text-gray-700 mb-1">End Time:</Text>
      <TextInput
        className={`border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg p-2 mb-3 bg-white`}
        placeholder="HH:MM"
        value={selection.endTime}
        onChangeText={(text) => formatAndValidateTimeInput(text, 'endTime')}
        keyboardType="numeric"
        maxLength={5} // HH:MM has 5 characters
      />

      {/* Error Message */}
      {error && <Text className="text-red-500 text-sm mb-3">{error}</Text>}

      {/* Radio Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          className={`flex-1 p-3 rounded-lg mx-1 items-center ${
            selection.radioValue === 'option1' ? 'bg-blue-500' : 'bg-gray-200'
          }`}
          onPress={() => handleRadioChange(index, 'option1')}
        >
          <Text
            className={`text-sm font-medium ${
              selection.radioValue === 'option1' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Option 1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 p-3 rounded-lg mx-1 items-center ${
            selection.radioValue === 'option2' ? 'bg-blue-500' : 'bg-gray-200'
          }`}
          onPress={() => handleRadioChange(index, 'option2')}
        >
          <Text
            className={`text-sm font-medium ${
              selection.radioValue === 'option2' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Option 2
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeSlot;