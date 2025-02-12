import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser; // Get logged-in user details

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged Out", "You have been successfully logged out.");
        navigation.replace("Login"); // Navigate to login screen
      })
      .catch((error) => Alert.alert("Logout Failed", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{user?.displayName || "N/A"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user?.email || "N/A"}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  info: {
    fontSize: 18,
    color: "gray",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
