import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const cities = [
  { id: "1", name: "Bhubaneswar" },
  { id: "2", name: "Cuttack" },
  { id: "3", name: "Puri" },
  { id: "4", name: "Sambalpur" },
  { id: "5", name: "Rourkela" },
  { id: "6", name: "Balasore" },
  { id: "7", name: "Berhampur" },
  { id: "8", name: "Koraput" },
  { id: "9", name: "Kendrapara" },
  { id: "10", name: "Angul" },
];

const favourites = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cityCard}>
            <Text style={styles.cityText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default favourites


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f3c88",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 40,
  },
  cityCard: {
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 14,
    elevation: 1,
  },
  cityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
});