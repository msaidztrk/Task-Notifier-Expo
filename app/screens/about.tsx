import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";
import DaySelector from '../components/creatingAlarm/DaySelector';
import AddButton from '../components/creatingAlarm/AddButton';
import DateTimePicker from '@react-native-community/datetimepicker';

const AboutScreen = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSelections, setTimeSelections] = useState<
    Array<{ startTime: string; endTime: string; radioValue: string }>
  >([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const addTimeSelection = () => {
    setTimeSelections([...timeSelections, { startTime: '', endTime: '', radioValue: 'Option 1' }]);
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const formattedValue = formatTimeInput(value);
    const updatedSelections = [...timeSelections];
    updatedSelections[index][field] = formattedValue;
    setTimeSelections(updatedSelections);
  };

  const handleRadioChange = (index: number, value: string) => {
    const updatedSelections = [...timeSelections];
    updatedSelections[index].radioValue = value;
    setTimeSelections(updatedSelections);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const is24HourFormat = () => {
    const date = new Date();
    const timeString = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
    }).format(date);
    return !timeString.includes("AM") && !timeString.includes("PM");
  };

  const onChange = (event: any, selectedTime: any) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatTimeInput = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, 2) + ':' + formattedValue.slice(2, 4);
    }
    return formattedValue;
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-800 text-center mb-6">Create New Alarm</Text>

      {/* Days of the Week Section */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-800">Select Days</Text>
          <TouchableOpacity onPress={toggleModal} className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
            <Text className="text-blue-600 font-bold">i</Text>
          </TouchableOpacity>
        </View>
        <DaySelector selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
      </View>

      {/* Set Alarm Time Section */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Set Alarm Time</Text>
        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 px-4 items-center justify-center"
          onPress={() => setShowPicker(true)}
        >
          <Text className="text-white text-lg font-bold">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            mode="time"
            value={time}
            onChange={onChange}
            is24Hour={is24HourFormat()}
          />
        )}
      </View>

      {/* Time Slots Section */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Add Time Slots</Text>
        {timeSelections.map((selection, index) => (
          <View key={index} className="mb-4">
            {/* Start Time Input */}
            <View className="mb-3">
              <Text className="text-sm font-medium text-gray-700 mb-1">Start Time</Text>
              <TextInput
                className="bg-gray-100 rounded-lg py-2 px-3 text-center text-gray-800 text-lg"
                placeholder="HH:MM"
                value={selection.startTime}
                onChangeText={(text) => handleTimeChange(index, 'startTime', text)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {/* End Time Input */}
            <View className="mb-3">
              <Text className="text-sm font-medium text-gray-700 mb-1">End Time</Text>
              <TextInput
                className="bg-gray-100 rounded-lg py-2 px-3 text-center text-gray-800 text-lg"
                placeholder="HH:MM"
                value={selection.endTime}
                onChangeText={(text) => handleTimeChange(index, 'endTime', text)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {/* Option 1 and Option 2 Radio Buttons */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`flex-1 bg-gray-100 rounded-lg py-2 px-3 items-center mr-2 ${
                  selection.radioValue === 'Option 1' ? 'bg-blue-500' : ''
                }`}
                onPress={() => handleRadioChange(index, 'Option 1')}
              >
                <Text className={`text-lg ${
                  selection.radioValue === 'Option 1' ? 'text-white' : 'text-gray-800'
                }`}>
                  Option 1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 bg-gray-100 rounded-lg py-2 px-3 items-center ml-2 ${
                  selection.radioValue === 'Option 2' ? 'bg-blue-500' : ''
                }`}
                onPress={() => handleRadioChange(index, 'Option 2')}
              >
                <Text className={`text-lg ${
                  selection.radioValue === 'Option 2' ? 'text-white' : 'text-gray-800'
                }`}>
                  Option 2
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <AddButton onPress={addTimeSelection} />
      </View>

      {/* Info Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View className="bg-white rounded-lg p-6 items-center">
          <Text className="text-lg text-gray-700 text-center mb-4">
            Select the days you want the alarm to repeat.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-2 px-6"
            onPress={toggleModal}
          >
            <Text className="text-white text-lg font-bold">Got it!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AboutScreen;