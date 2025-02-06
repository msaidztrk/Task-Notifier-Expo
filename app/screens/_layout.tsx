// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#25292e' },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"  // Changed to match your route
        options={{
          title: 'Alarms',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'}
              color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="AboutScreen"  // Changed to match your route
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'}
              color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="LoginScreen"  // Changed to match your route
        options={{ tabBarItemStyle: {display: 'none'}}} 
      />



    </Tabs>


  );
}