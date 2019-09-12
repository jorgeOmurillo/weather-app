import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Weather from "./components/Weather";
import Daily from "./components/Daily";
import { API_KEY } from "./utils/WeatherAPIKey";

export default function App() {
  const [isLoading, setLoading] = React.useState(true);
  const [temperature, setTemperature] = React.useState(0);
  const [weatherCondition, setWeatherCondition] = React.useState(null);
  const [days, setDays] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("Error getting weather conditions.");
      },
    );
  }, []);

  const fetchWeather = async (lat: any, lon: any) => {
    const fetched = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`,
    );
    const data = await fetched.json();

    setTemperature(Math.round(data.list[0].main.temp));
    setWeatherCondition(data.list[0].weather[0].main);

    const dailyData = data.list.filter((reading: any) =>
      reading.dt_txt.includes("18:00:00"),
    );

    setDays(dailyData);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={{ textAlign: "center" }}>Fetching the data...</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Weather weather={weatherCondition} temperature={temperature} />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            {days.map((day, index) => (
              <Daily key={index} day={day} />
            ))}
          </View>
        </View>
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
});
