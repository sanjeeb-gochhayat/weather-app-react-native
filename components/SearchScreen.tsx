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
      <View style={styles.outerBorder}>
        <View style={styles.innerBorder}>
          <TextInput
            onChangeText={(text) => setQuery(text)}
            style={styles.input}
            placeholder="Enter city name"
          />
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Pressable onPress={handleIconPress}>
          <Ionicons name="search-outline" color={"#ffd33d"} size={30} />
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
  },
  outerBorder: {
    borderWidth: 4,
    borderColor: "#455c9bff",
    borderRadius: 10,
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: "#ffd33d",
    borderRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455c9bff",
    borderRadius: 10,
    padding: 5,
  },
});
