import HomeScreenForecast from "@/components/HomeScreenForecast";
import SearchScreen from "@/components/SearchScreen";
import WeatherCard from "@/components/WeatherCard";
import { API_KEY } from "@/constants";
import axiosInstance from "@/utils/axios";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

type LocationType = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  local_names: {};
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type PartialWeatherData = {
  dt: number;
  main: {
    temp: number;
  };
};

const Index = () => {
  const [data, setData] = useState<WeatherDataType | null>(null);

  const [forecast, setForecast] = useState<PartialWeatherData[] | null>(null);

  const [locationInfo, setLocationInfo] = useState<LocationType[]>([]);

  const getCordinate = async (city: string | undefined) => {
    console.log("hello");
    try {
      let res = await axiosInstance.get(
        `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (res.data) {
        setLocationInfo(res.data);
        let { lat, lon } = res.data[0];
        getWeatherData(lat, lon);
        getForecast(lat, lon);
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

  const getForecast = async (lat: number, lon: number) => {
    try {
      let res = await axiosInstance.get(
        `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (res.data) {
        setForecast(res.data.list.slice(0, 4) as PartialWeatherData[]); //manual assertion
      }
    } catch (error) {
      throw error;
    }
  };

  const getCurrentCity = async () => {
    // Ask for permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    // Get current position
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Reverse geocode to get city
    let geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geocode.length > 0) {
      let city = geocode[0].formattedAddress?.split(",")[0];
      getCordinate(city);
    }
  };

  useEffect(() => {
    getCordinate("Calcutta");
    getCurrentCity();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <SearchScreen getCordinate={getCordinate} />
      </View>

      <Text style={styles.cityName}>
        {!locationInfo[0]?.name
         ?  "Welcome" 
        :`${locationInfo[0]?.name}, ${locationInfo[0]?.state}`}
      </Text>
      {data && <WeatherCard data={data} />}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff", fontWeight: "bold" }}>
            View Details
          </Text>
        </Pressable>
        <Pressable style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff", fontWeight: "bold" }}>
            Mark Favourite
          </Text>
        </Pressable>
      </View>
      {forecast && <HomeScreenForecast forecast={forecast} />}
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
    color: "#455c9bff",
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
    height: 35,
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
