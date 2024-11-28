import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notifications from "../screens/Notifications";
import NotificationDetails from "../screens/NotificationDetails";
import Header from '../components/nav/Header'; 
import BackButton from "../components/nav/BackButton";


const Stack = createNativeStackNavigator();

// const navstyle = {
//     headerBackground: () => <Header />,
//     headerTitleStyle: {
//       color: "#fff",
//       fontFamily: "Inter",
//       fontWeight: "500",
//       fontSize: 16,
//     },
//     headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
//     headerBackVisible: false,
//   };

export default function AppNavigator() {

    const [headerOptions, setHeaderOptions] = useState({
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: 16,
        },
        headerBackVisible: false,
      });
    // there was a problem with the desired style from figma that the name
    //of the screen doesnt appear and i think its because the initialization of the component  related to Navigator 
    //so the name of the screen doesnt get render so i added a small delay 

      useEffect(() => {
        const timer = setTimeout(() => {
          setHeaderOptions((prevOptions) => ({
            ...prevOptions,
            headerBackground: () => <Header />,
            headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
          }));
        }, 500); 
    
        return () => clearTimeout(timer);
      }, []);

  return (
      <Stack.Navigator
          screenOptions={headerOptions}
          initialRouteName="Notifications">
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
      />
    </Stack.Navigator>
  );
}
