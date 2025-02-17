import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import DaySelector from '../components/DaySelector';
import TimeSlot from '../components/TimeSlots';
import AddButton from '../components/AddButton';
import useSettingsStore from '../store/useSettingsStore';
import TimeLoopOfAlarm from '../components/TimeLoopOfAlarm';

const AboutScreen = () => {

  const { settingsData } = useSettingsStore();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSelections, setTimeSelections] = useState<
    Array<{ startTime: string; endTime: string; radioValue: string }>
  >([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [timeLoopHourMinute, setTimeLoopHourMinute] = useState<
    Array<{ hour: string; minute: string; }>
  >([]);
  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const addTimeSelection = () => {
    setTimeSelections([...timeSelections, { startTime: '', endTime: '', radioValue: '' }]);
  };

  const removeTimeSlot = (index: number) => {
    const updatedSelections = [...timeSelections];
    updatedSelections.splice(index, 1);
    setTimeSelections(updatedSelections);
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedSelections = [...timeSelections];
    updatedSelections[index][field] = value;
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
      console.log('selectedTime : ', selectedTime);
      setTime(selectedTime);
    }
  };

  const logData = () => {
    console.log(
      JSON.stringify(
        {
          selectedDays,
          timeSelections,
          time: time.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
          timeLoopHourMinute
        },
        null,
        2
      )
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      {/* Header */}

      <Text className="text-2xl font-bold text-gray-900 text-center mb-6">Create New Alarm</Text>
      {/* Header: "Create New Alarm" başlığı ve sağ üstte "Ekle" butonu */}
      <View className="flex-row justify-between items-center mb-6">

        <TouchableOpacity onPress={logData} className="bg-green-500 rounded-full p-3">
          <Text className="text-white font-bold">Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* Days of the Week Selection */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-800">Select Days</Text>
          <TouchableOpacity onPress={toggleModal} className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
            <Text className="text-blue-600 font-bold">?</Text>
          </TouchableOpacity>
        </View>
        <DaySelector selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
      </View>

      {/* Time Picker */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Set Start Time</Text>
        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 px-4 items-center justify-center"
          onPress={() => setShowPicker(true)}
        >
          <Text className="text-white text-xl font-bold">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            mode="time"
            value={time}
            onChange={onChange}
            is24Hour={settingsData?.timeFormat === "24h" || is24HourFormat()}
          />
        )}
      </View>

      <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <TimeLoopOfAlarm setTimeLoopHourMinute={setTimeLoopHourMinute} />
      </View>

      {/* Time Selections */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Add Except Time Gaps</Text>

        <View className="space-y-4">
          {timeSelections.map((selection, index) => (
            <View
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
            >
              <TimeSlot
                index={index}
                selection={selection}
                handleTimeChange={handleTimeChange}
                handleRadioChange={handleRadioChange}
                handleDelete={removeTimeSlot}
              />
            </View>
          ))}
        </View>


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
            <Text className="text-white text-lg font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AboutScreen;