import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text } from "react-native";

const WeatherCard = () => {
  let imageSource = "https://openweathermap.org/img/wn/10d@2x.png";
  return (
    <LinearGradient
      colors={["#455c9bff", "#5b5980ff"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.description}>Heavy Rainfall</Text>
      <Text style={styles.date}>Sunday 27 July 2025</Text>
      <Text style={styles.temp}>28°</Text>
    </LinearGradient>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    flex: 2 / 3,
    padding: 5,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    backgroundImage: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 18,
  },
  description: {
    fontSize:25,
    color: "#cfcfcfff"
  },
  date:{
    fontSize: 12,
    fontWeight: 'bold',
    color:'#b4b4b4ff'
  },
  temp: {
    fontSize: 60,
    color: "#ffd33d"
  }
});
