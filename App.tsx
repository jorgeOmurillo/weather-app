import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import Weather from "./components/Weather";
import Daily from "./components/Daily";
import { API_KEY } from "./utils/WeatherAPIKey";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (lat: any, lon: any) => {
    const fetched = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
    );
    const data = await fetched.json();

    setTemperature(Math.round(data.list[0].main.temp));
    setWeatherCondition(data.list[0].weather[0].main);

    const dailyData = data.list.filter((reading: any) =>
      reading.dt_txt.includes("18:00:00")
    );

    setDays(dailyData);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loading}>Fetching the data...</Text>
      ) : (
        <>
          <Weather weather={weatherCondition} temperature={temperature} />
          <View style={styles.day}>
            {days.map((day, index) => (
              <Daily key={index} day={day} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDE4",
    justifyContent: "center",
  },
  loading: {
    textAlign: "center",
  },
  day: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
