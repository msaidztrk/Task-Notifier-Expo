import React, { useEffect, useState } from "react";
import { router, Slot, useFocusEffect, usePathname } from "expo-router";

import "../global.css";
import { Drawer } from "expo-router/drawer";
import Sidebar from "./components/Sidebar";

import Toast from "react-native-toast-message";

import CustomHeader from "./components/CustomHeader ";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSettingsData } from "./hooks/useAsyncStorage";


export default function RootLayout() {



  console.log('page rerendered');

  const pathname = usePathname(); // Get the current pathname
  useEffect(() => {
    console.log('Current Route:', pathname);
  }, [pathname]);

  const navigateToRoute = (route: any) => {
    router.replace(route);
  };


  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    const fetchSettingsData = async () => {
      const storedData = await getSettingsData();
      // if (storedData) {
        // setSettingsData(storedData);
        navigateToRoute("/screens");
      // }else{
        // navigateToRoute("/letsGetStart");
      // }
    };

    fetchSettingsData();
  }, []);


 
  

  // if (!settingsData) {
  //   return (
  //     <>
  //       <Toast />
  //       <Slot />
  //     </>
  //   );
  // }

  return (

    <>

    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="screens" // This matches the `(tabs)` directory
        options={{ }}
      />
    </Drawer>
    <Toast />
    </>
  );
}