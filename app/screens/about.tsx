import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Modal from "react-native-modal";
import DaySelector from '../components/creatingAlarm/DaySelector';
import TimeSlot from '../components/creatingAlarm/TimeSlot';
import AddButton from '../components/creatingAlarm/AddButton';
import TimePicket from '../components/creatingAlarm/TimePicket';


const AboutScreen = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSelections, setTimeSelections] = useState<
    Array<{ startTime: string; endTime: string; radioValue: string }>
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

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Creating New Alarm</Text>

      {/* Days of the Week Selection */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>
          Select Days
          <TouchableOpacity
            onPress={toggleModal}
            className="ml-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            <Text className="text-black text-4xl font-bold">(?)</Text>
          </TouchableOpacity>
        </Text>

<TimePicket/>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          backdropOpacity={0.7}
          animationIn="zoomIn"
          animationOut="zoomOut"
          useNativeDriver={true}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Hello!</Text>
            <Button title="Hide modal" onPress={toggleModal} color="#007bff" />
          </View>
        </Modal>

        <DaySelector selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
      </View>

      {/* Time Selections */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Add Time Slots</Text>
        {timeSelections.map((selection, index) => (
          <TimeSlot
            key={index}
            index={index}
            selection={selection}
            handleTimeChange={handleTimeChange}
            handleRadioChange={handleRadioChange}
          />
        ))}
        <AddButton onPress={addTimeSelection} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  section: {
    marginBottom: 30,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#495057',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#495057',
  },
});

export default AboutScreen;