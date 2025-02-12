import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";

// Import Screens
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import BottomTabsNavigator from "./navigation/BottomTabsNavigator"; // Import bottom tabs

const Stack = createStackNavigator();

export default function App() {
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location Permission Required",
        "Please enable location access to use the app."
      );
      setLocationPermission(false);
    } else {
      setLocationPermission(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
