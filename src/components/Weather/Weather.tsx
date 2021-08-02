import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import styles from "./styles";
import { CurrentUser, useOpenWeather } from "../../../models";
import Loading from "../Loading/Loading";

import { weatherConditions } from "../../../utils/WeatherConditions";

export default function Weather() {
  const history = useHistory();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const { data, error, loading } = useOpenWeather(lat, lon);

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLat(location.coords.latitude);
          setLon(location.coords.longitude);
        } catch (e) {
          console.error(e);
        }
      }
    }
    getLocation();
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  const temperature = Math.round(data.weatherRes.list[0].main.temp);
  const weatherCondition = data.weatherRes.list[0].weather[0].main;

  const handleOnPress = () => {
    history.push("/days");
  };
  const onLogoutPress = () => {
    CurrentUser.logout();
    history.push("/login");
  };

  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weatherCondition].color },
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={48}
          name={weatherConditions[weatherCondition].icon}
          color={"#fff"}
        />
        <Text style={styles.tempText}>{temperature}˚C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            {weatherConditions[weatherCondition].title}
          </Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weatherCondition].subtitle}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnPress}>
          <Text style={styles.subtitle}>5-day forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
