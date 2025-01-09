import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TimeSlot = ({ index, selection, handleTimeChange, handleRadioChange } : any) => {
  return (
    <View style={styles.timeSlotContainer}>
      <Text style={styles.label}>Start Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={selection.startTime}
        onChangeText={(text) => handleTimeChange(index, 'startTime', text)}
      />
      <Text style={styles.label}>End Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={selection.endTime}
        onChangeText={(text) => handleTimeChange(index, 'endTime', text)}
      />
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            selection.radioValue === 'option1' ? styles.radioButtonSelected : styles.radioButtonUnselected,
          ]}
          onPress={() => handleRadioChange(index, 'option1')}
        >
          <Text
            style={[
              styles.radioButtonText,
              selection.radioValue === 'option1' ? styles.radioButtonTextSelected : styles.radioButtonTextUnselected,
            ]}
          >
            Option 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            selection.radioValue === 'option2' ? styles.radioButtonSelected : styles.radioButtonUnselected,
          ]}
          onPress={() => handleRadioChange(index, 'option2')}
        >
          <Text
            style={[
              styles.radioButtonText,
              selection.radioValue === 'option2' ? styles.radioButtonTextSelected : styles.radioButtonTextUnselected,
            ]}
          >
            Option 2
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeSlotContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#495057',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#007bff',
  },
  radioButtonUnselected: {
    backgroundColor: '#dee2e6',
  },
  radioButtonText: {
    fontSize: 14,
  },
  radioButtonTextSelected: {
    color: '#fff',
  },
  radioButtonTextUnselected: {
    color: '#495057',
  },
});

export default TimeSlot;