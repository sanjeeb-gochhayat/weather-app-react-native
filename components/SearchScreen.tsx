import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
  getCordinate: (cityName: string) => Promise<void>;
};

const SearchScreen = ({ getCordinate }: Props) => {
  const [query, setQuery] = useState<string>("");

  const handleIconPress = () => {
    getCordinate(query);
  };

  return (
    <View style={styles.container}>
      <TextInput onChangeText={(text) => setQuery(text)} style={styles.input} />
      <View style={styles.iconContainer}>
        <Pressable onPress={handleIconPress}>
          <Ionicons name="search-outline" color={"gray"} size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 280,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 55,
    borderColor: "#455c9bff",
    borderWidth: 5,
    borderRadius: 10,
    padding: 5,
  },
});
