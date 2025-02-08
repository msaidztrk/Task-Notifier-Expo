import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';


interface TimeLoopProps {
    setTimeLoopHourMinute: React.Dispatch<React.SetStateAction<Array<{ hour: string; minute: string }>>>;
  }

  const TimeLoopOfAlarm: React.FC<TimeLoopProps> = ({ setTimeLoopHourMinute }) => {
  const [hour, setHour] = useState<string>('');
  const [minute, setMinute] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!error && hour !== '' && minute !== '') {
      setTimeLoopHourMinute([{ hour, minute }]);
    }
  }, [hour, minute, error, setTimeLoopHourMinute]);

  const validateTime = (h: string, m: string) => {
    const hourNum = parseInt(h, 10);
    const minuteNum = parseInt(m, 10);

    if (isNaN(hourNum) || hourNum < 0 || hourNum > 4) {
      setError('Hour must be between 0 and 4.');
    } else if (isNaN(minuteNum) || minuteNum < 0 || minuteNum >= 60) {
      setError('Minute must be between 0 and 59.');
    } else {
      setError('');
    }
  };

  const handleHourChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setHour(cleaned);
    validateTime(cleaned, minute);
  };

  const handleMinuteChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setMinute(cleaned);
    validateTime(hour, cleaned);
  };

  return (
    <View className="flex flex-col items-center p-2">
      <Text className="text-base mb-1">Set Time (Hour:Minute) For Loop:</Text>
      <View className="flex flex-row items-center space-x-1">
        <TextInput
          className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-1 text-center w-12`}
          placeholder="HH"
          value={hour}
          keyboardType="numeric"
          onChangeText={handleHourChange}
          maxLength={2}
        />
        <Text className="text-lg">:</Text>
        <TextInput
          className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-1 text-center w-12`}
          placeholder="MM"
          value={minute}
          keyboardType="numeric"
          onChangeText={handleMinuteChange}
          maxLength={2}
        />
      </View>
      {error ? <Text className="text-red-500 mt-1 text-sm">{error}</Text> : null}
    </View>
  );
};

export default TimeLoopOfAlarm;
