import React, { useEffect, useState } from "react";
import { router, Slot, Stack, useFocusEffect, usePathname } from "expo-router";

import "../global.css";
import { Drawer } from "expo-router/drawer";
import Sidebar from "./layouts/Sidebar";
import Toast from "react-native-toast-message";
import CustomHeader from "./layouts/CustomHeader ";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSettingsStorage from "./hooks/useSettingsStorage";



export default function RootLayout() {

  const { getSettingsData, saveSettingsData, clearSettingsData } = useSettingsStorage();

  console.log('page rerendered');

  const pathname = usePathname(); // Get the current pathname
  useEffect(() => {
    console.log('Current Route:', pathname);
  }, [pathname]);

  const navigateToRoute = (route: any) => {
    router.replace(route);
  };


  const [settingsData, setSettingsData] = useState<any>(null);

  useEffect(() => {
    const fetchSettingsData = async () => {
      const userSettingsData = await getSettingsData();
      setSettingsData(userSettingsData); // Update state
      console.log('userSettingsData', userSettingsData);

      // Navigate based on settings data
      if (userSettingsData) {
        router.replace("/screens");
      } else {
        router.replace("/screens/LoginScreen");
      }
    };

    fetchSettingsData();
  }, []); // Empty dependency array to run only once on mount




  if (!settingsData) {
    return (
      <>
        <Toast />
        <Slot />
      </>
    );
  }

  return (

    <>

      <Stack
        screenOptions={{
          // header: () => <CustomHeader />, // Render CustomHeader inside the Stack navigator
        }}
      >
        <Stack.Screen
          name="screens" // This matches the `(screens)` directory
          options={{ headerShown: false }}
        />

      </Stack>
      <Toast />
    </>
  );
}