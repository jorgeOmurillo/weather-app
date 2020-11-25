import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import * as Location from "expo-location";
import { decode, encode } from "base-64";

import { firebase } from "./src/firebase/config";
import Weather from "./components/Weather";
import Daily from "./components/Daily";
import { API_KEY } from "./utils/WeatherAPIKey";
import { Login, Home, Registration } from "./src/components";

const globalAny: any = global;

if (!globalAny.btoa) {
  globalAny.btoa = encode;
}
if (!globalAny.atob) {
  globalAny.atob = decode;
}

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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

    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  };
  console.log({ user });

  return (
    <NativeRouter initialEntries={["/"]}>
      {user ? (
        <Route exact path="/" component={Home} />
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
        </>
      )}
    </NativeRouter>
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
