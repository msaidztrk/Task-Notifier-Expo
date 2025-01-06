import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { Link } from 'expo-router';
import { Routes } from '../types/routes';

const Sidebar = ({ navigation }: DrawerContentComponentProps) => {
    

    return (
        <View className="flex-1 bg-gray-900 p-6">
            {/* Sidebar Header */}
            <View className="border-b border-gray-700 pb-4 mb-4">
                <Text className="text-white text-2xl font-bold">User Manage</Text>
            </View>

            {/* Menu Items */}
            <TouchableOpacity className="py-3"   >
                <Link href={Routes.HOME}>
                    <Text className="text-white text-lg font-medium">Home</Text>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity className="py-3" >
                <Link href={Routes.ABOUT}>
                    <Text className="text-white text-lg font-medium">About</Text>
                </Link>
            </TouchableOpacity>

         
           
        </View>
    );
};

export default Sidebar;