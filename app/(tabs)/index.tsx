import SearchScreen from "@/components/SearchScreen";
import WeatherCard from "@/components/WeatherCard";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

let PlaceholderImage = {
  uri: "https://images.unsplash.com/photo-1615286628718-4a4c8924d0eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
            <View style={styles.footerContainer}>
        <Button theme='primary' label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View> */}
      <View style={styles.search}>
        <SearchScreen />
      </View>
      <Text style={styles.cityName}>Bhubaneswar, India</Text>
      <WeatherCard />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff" }}>View Details</Text>
        </Pressable>
        <Pressable  style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff" }}>Mark Favourite</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  text: {
    color: "#fff",
  },
  cityName: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "gray",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  myBtn: {
    width: 100,
    height: 30,
    backgroundColor: "#455c9bff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
});
