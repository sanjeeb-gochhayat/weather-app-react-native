import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

let data = [
  {
    time: "11:00AM",
    value: "30°",
  },
  {
    time: "12:00PM",
    value: "32°",
  },
  {
    time: "01:00PM",
    value: "29°",
  },
  {
    time: "02:00PM",
    value: "28°",
  },
];

const HomeScreenForecast = () => {
  return (
    <View style={styles.forecastContainer}>

      {data?.map((item) => {
        return (
          <LinearGradient
            key={item.time}
            colors={["#455c9bff", "#5b5980ff"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.forecastItem}
          >
            <Text style={{ fontSize: 12, fontWeight:'bold', color:'#b4b4b4ff' }} >{item.time}</Text>
            <Text style={{ fontSize: 22, fontWeight:'bold', color:'#cfcfcfff', marginTop:10 }}>{item.value}</Text>
          </LinearGradient>
        );
      })}
    </View>
  );
};

export default HomeScreenForecast;

const styles = StyleSheet.create({
  forecastContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  forecastItem: {
    height: 100,
    width: 70,
    borderRadius:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
});
