import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { useOpenWeather } from "../../../models";
import Loading from "../Loading/Loading";
import Day from "./Day";
import styles from "./styles";
import { weatherConditions } from "../../../utils/WeatherConditions";

function Days(): JSX.Element {
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
  const weatherCondition = data.weatherRes.list[0].weather[0].main;
  const days = data.weatherRes.list.filter((reading: any) =>
    reading.dt_txt.includes("18:00:00")
  );

  const handleOnPress = () => {
    history.goBack();
  };

  return (
    <View style={styles.weatherContainer}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={[
          styles.button,
          { backgroundColor: weatherConditions[weatherCondition].color },
        ]}
      >
        <MaterialCommunityIcons
          size={40}
          name="keyboard-backspace"
          color={"#fff"}
          onPress={handleOnPress}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.bodyContainer,
          { backgroundColor: weatherConditions[weatherCondition].color },
        ]}
      >
        {days.map((day) => (
          <Day day={day} weatherCondition={weatherCondition} key={day.dt_txt} />
        ))}
      </View>
    </View>
  );
}

export default Days;
