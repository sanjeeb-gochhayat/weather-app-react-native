import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const screenHeight = Dimensions.get("window").height;

type WeatherDataType = {
  coord: object;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: object;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type Props = {
  data: WeatherDataType;
};

const WeatherCard = ({ data }: Props) => {
  let imageSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const formattedDate = new Date(data.dt * 1000).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

    let extraDetails = [
    {
      value: `${data.clouds.all}%`,
      label: "Cloudiness",
    },
    {
      value: `${data.main.humidity}%`,
      label: "Humidity",
    },
    {
      value: `${data.wind.speed}m/s`,
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
      <Text style={styles.description}>{data.weather[0].description}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.temp}>{Math.round(data.main.temp)}°</Text>
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
    borderRadius: 10,
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
    marginTop: 15,
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
