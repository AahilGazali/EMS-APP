import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase setup file

const ReportScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [severity, setSeverity] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState(null);

  // Pick Image/Video
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractLocationFromMetadata(result.assets[0]);
    }
  };

  // Extract Location from Metadata
  const extractLocationFromMetadata = async (media) => {
    if (media.exif && media.exif.GPSLatitude && media.exif.GPSLongitude) {
      const { GPSLatitude, GPSLongitude } = media.exif;
      setLocation({ latitude: GPSLatitude, longitude: GPSLongitude });
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } else {
        Alert.alert("Location Permission Denied", "Please enable location services.");
      }
    }
  };

  // Submit Report
  const submitReport = async () => {
    if (!image || !severity || !contact || !location) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const reportData = {
        image,
        severity,
        contact,
        location,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "accidentReports"), reportData);
      Alert.alert("Success", "Report submitted successfully!");
      navigation.navigate("Home", { newReport: reportData }); // Send to Home
    } catch (error) {
      Alert.alert("Error", "Failed to submit report.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Accident</Text>

      <Button title="Upload Photo/Video" onPress={pickMedia} />
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TextInput
        placeholder="Enter Severity (Low, Medium, High)"
        style={styles.input}
        onChangeText={setSeverity}
        value={severity}
      />

      <TextInput
        placeholder="Enter Contact Number"
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={setContact}
        value={contact}
      />

      {location && (
        <Text>Location: {location.latitude}, {location.longitude}</Text>
      )}

      <Button title="Submit Report" onPress={submitReport} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ReportScreen;
