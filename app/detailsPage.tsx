import { API_KEY } from "@/constants";
import axiosInstance from "@/utils/axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const DetailsPage = () => {
  const navigation = useNavigation();

  const { city } = useLocalSearchParams();

  const [data, setData] = useState<WeatherDataType | null>(null);

  const getCordinate = async (city: string) => {
    console.log("hello");
    try {
      let res = await axiosInstance.get(
        `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (res.data) {
        let { lat, lon } = res.data[0];
        getWeatherData(lat, lon);
      }
    } catch (error) {
      throw error;
    }
  };

  const getWeatherData = async (lat: number, lon: number) => {
    try {
      let res = await axiosInstance.get(
        `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (res.data) {
        setData(res.data as WeatherDataType); //manual assertion
      }
    } catch (error) {
      throw error;
    }
  };

  const getTime = (time: number) =>
    new Date(time * 1000).toLocaleTimeString();

  useEffect(() => {
    if (typeof city === "string") {
      getCordinate(city);
    }
  }, []);

  useEffect(() => {
    if (data?.name) {
      navigation.setOptions({
        title: `Weather in ${data.name}`,
        headerStyle: { backgroundColor: "#e4af04ff" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      });
    }
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.description}>{data?.weather[0].description}</Text>
      <Text style={styles.temp}>{data?.main.temp.toFixed(1)}°C</Text>
      <Text style={styles.feelsLike}>
        Feels like: {data?.main.feels_like.toFixed(1)}°C
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>💨 Wind: {data?.wind.speed} m/s</Text>
        <Text style={styles.label}>💧 Humidity: {data?.main.humidity}%</Text>
        <Text style={styles.label}>☁️ Cloudiness: {data?.clouds.all}%</Text>
        <Text style={styles.label}>🌡 Pressure: {data?.main.pressure} hPa</Text>
        <Text style={styles.label}>
          🌡 Min/Max: {data?.main.temp_min}° / {data?.main.temp_max}°
        </Text>
        <Text style={styles.label}>
          🌅 Sunrise: {getTime(data?.sys.sunrise ?? 0)}
        </Text>
        <Text style={styles.label}>
          🌇 Sunset: {getTime(data?.sys.sunset ?? 0)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 6,
    textTransform: "capitalize",
    color: "#e4af04ff",
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#5b5980ff",
  },
  feelsLike: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
});
