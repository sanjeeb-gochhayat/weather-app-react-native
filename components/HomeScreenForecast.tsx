import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PartialWeatherData = {
  dt: number;
  main: {
    temp: number;
  };
};

type Props = {
  forecast: PartialWeatherData[];
};

const HomeScreenForecast = ({ forecast }: Props) => {
  const formattedTime = (value: number) => {
    return new Date(value * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View style={styles.forecastContainer}>
      {forecast?.map((item) => {
        return (
          <LinearGradient
            key={item.dt}
            colors={["#455c9bff", "#5b5980ff"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.forecastItem}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#b4b4b4ff" }}
            >
              {formattedTime(item?.dt)}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#cfcfcfff",
                marginTop: 10,
              }}
            >
              {Math.round(item.main.temp)}°
            </Text>
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
    marginTop: 10,
  },
  forecastItem: {
    height: 100,
    width: 70,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
