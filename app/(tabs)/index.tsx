import HomeScreenForecast from "@/components/HomeScreenForecast";
import SearchScreen from "@/components/SearchScreen";
import WeatherCard from "@/components/WeatherCard";
import { API_KEY, DEFAULT_CITY } from "@/constants";
import axiosInstance from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
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
  local_names: object;
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

  const [favourites, setFavourites] = useState<string[]>([]);

  const [counterState, setCounterState] = useState<number>(0); //only used for marking the city as favourite in UI

  const router = useRouter();

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

  const markAsFavourite = async (cityName: string) => {
    try {
      const existing = await AsyncStorage.getItem("favourites");
      const favourites = existing ? JSON.parse(existing) : [];

      if (!favourites.includes(cityName)) {
        favourites.push(cityName);
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
        alert(`${cityName} added to favourites`);
        setCounterState((ps) => ps + 1);
      } else {
        alert(`${cityName} is already in favourites`);
      }
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const existing = await AsyncStorage.getItem("favourites");
        const favourites = existing ? JSON.parse(existing) : [];
        setFavourites(favourites);
      } catch (error) {
        console.error("Error reading favourites:", error);
      }
    };

    checkFavourite();
  }, [locationInfo, counterState]);

  useEffect(() => {
    getCordinate(DEFAULT_CITY);
    getCurrentCity();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <SearchScreen getCordinate={getCordinate} />
      </View>

      <Text style={styles.cityName}>
        {!locationInfo[0]?.name
          ? "Welcome"
          : `${locationInfo[0]?.name}, ${locationInfo[0]?.state}`}{favourites.includes(locationInfo[0]?.name) && "⭐"}
        
      </Text>
      {data && <WeatherCard data={data} />}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.myBtn}
          onPress={() =>
            router.push(`/detailsPage?city=${locationInfo[0]?.name}`)
          }
        >
          <Text style={{ color: "#cfcfcfff", fontWeight: "bold" }}>
            View Details
          </Text>
        </Pressable>
        <Pressable
          style={styles.myBtn}
          onPress={() => {
            markAsFavourite(locationInfo[0]?.name);
            
          }}
        >
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
    width: 140,
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
