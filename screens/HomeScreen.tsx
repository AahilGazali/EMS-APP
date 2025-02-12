import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase setup file

const HomeScreen = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "accidentReports"), (snapshot) => {
      const reportsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accident Reports</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>Severity: {item.severity}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Location: {item.location.latitude}, {item.location.longitude}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { padding: 10, marginBottom: 10, borderWidth: 1 },
  image: { width: 100, height: 100, marginBottom: 5 },
});

export default HomeScreen;
