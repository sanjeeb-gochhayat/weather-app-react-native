import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Favourites = () => {
  const [favCities, setFavCities] = useState<string[]>([]);

  const router = useRouter();

  let getAllFavourites = async () => {
    const existing = await AsyncStorage.getItem("favourites");
    const favourites = existing ? JSON.parse(existing) : [];
    setFavCities(favourites);
  };

  let handleRouteToDetailsScreen = (cityName: string) => {
    router.push(`/detailsPage?city=${cityName}`)
  }

  useFocusEffect(
    useCallback(() => {
      getAllFavourites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favCities}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable onPress={()=>handleRouteToDetailsScreen(item)}>
            <View style={styles.cityCard}>
              <Text style={styles.cityText}>{item}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Favourites;

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
