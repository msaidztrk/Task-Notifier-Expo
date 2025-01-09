import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaySelector = ({ selectedDays, toggleDaySelection } : any) => {
  return (
    <View style={styles.dayContainer}>
      {daysOfWeek.map((day) => (
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            selectedDays.includes(day) ? styles.dayButtonSelected : styles.dayButtonUnselected,
          ]}
          onPress={() => toggleDaySelection(day)}
        >
          <Text
            style={[
              styles.dayButtonText,
              selectedDays.includes(day) ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  dayButtonSelected: {
    backgroundColor: '#007bff',
  },
  dayButtonUnselected: {
    backgroundColor: '#dee2e6',
  },
  dayButtonText: {
    fontSize: 14,
  },
  dayButtonTextSelected: {
    color: '#fff',
  },
  dayButtonTextUnselected: {
    color: '#495057',
  },
});

export default DaySelector;