import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg py-3 px-4 items-center justify-center mt-4"
    >
      <Text className="text-white text-lg font-semibold">Add Time Slot</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
