import HomeScreenForecast from "@/components/HomeScreenForecast";
import SearchScreen from "@/components/SearchScreen";
import WeatherCard from "@/components/WeatherCard";
import { API_KEY } from "@/constants";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {

  const cityName: string = "Bhubaneswar";

  const [data, setData] = useState({});

  const getCordinate = async(cityName: string) => {
    try {
      let res = await axiosInstance.get(`/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      if(res.data){
        let {lat, lon} = res.data[0];
        getWeatherData(lat, lon)
      }
    } catch (error) {
      throw error;
    }
  }


  const getWeatherData = async(lat:number, lon:number) => {
    try {
      let res = await axiosInstance.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      if(res.data){
        setData(res);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getCordinate(cityName);
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <SearchScreen />
      </View>
      <Text style={styles.cityName}>Bhubaneswar, India</Text>
      <WeatherCard />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff", fontWeight:'bold' }}>View Details</Text>
        </Pressable>
        <Pressable  style={styles.myBtn}>
          <Text style={{ color: "#cfcfcfff", fontWeight:'bold' }}>Mark Favourite</Text>
        </Pressable>
      </View>
      <HomeScreenForecast />
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
