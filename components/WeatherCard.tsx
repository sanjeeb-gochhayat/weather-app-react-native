import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const screenHeight = Dimensions.get('window').height;

const WeatherCard = () => {
  let imageSource = "https://openweathermap.org/img/wn/10d@2x.png";

  let extraDetails = [
    {
      value: "25%",
      label: "Cloudiness",
    },
    {
      value: "15%",
      label: "Humidity",
    },
    {
      value: "20m/s",
      label: "Wind speed",
    },
  ];
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
      <View style={styles.extraInfo}>
        {extraDetails?.map((item) => {
          return (
            <View key={item.value} style={styles.extraItem}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color:'#cfcfcfff' }}>
                {item.value}
              </Text>
              <Text style={{ color:'#b4b4b4ff' }}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.5,
    padding: 5,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    backgroundImage: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)",
    borderRadius:10
  },
  image: {
    width: 150,
    height: 160,
    borderRadius: 18,
  },
  description: {
    fontSize: 25,
    color: "#cfcfcfff",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#b4b4b4ff",
  },
  temp: {
    fontSize: 60,
    color: "#ffd33d",
  },
  extraInfo: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15
  },
  extraItem: {
    height: 80,
    width: 80,
    borderColor: "gray",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
