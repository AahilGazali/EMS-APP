import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location"; // Import Expo Location API

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Login successful!");
            
            // Request location permission before navigating to Home
            requestLocationPermission();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required",
                "Location access is required for the app to function properly."
            );
        } else {
            navigation.navigate("Home"); // Redirect to Home after granting location permission
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Login</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
            />

            <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "blue", padding: 15, marginTop: 20 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ textAlign: "center", color: "blue", marginTop: 10 }}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
