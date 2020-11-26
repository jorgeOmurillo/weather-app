import React, { useEffect, useState } from "react";
import { NativeRouter, Route } from "react-router-native";
import * as Location from "expo-location";
import { decode, encode } from "base-64";

import { firebase } from "./src/firebase/config";
import useGlobal from "./src/store";
import { Days, Home, Login, Registration, Weather } from "./src/components";

const globalAny: any = global;

if (!globalAny.btoa) {
  globalAny.btoa = encode;
}
if (!globalAny.atob) {
  globalAny.atob = decode;
}

export default function App() {
  const [error, setError] = useState("");
  const [, setUser] = useState(null);
  const [, globalActions] = useGlobal();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      // @ts-ignore: 2339
      globalActions.openWeatherMap.fetchWeather(
        location.coords.latitude,
        location.coords.longitude
      );
    })();

    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            // @ts-ignore: 2339
            globalActions.firebase.login(userData, false);
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        // @ts-ignore: 2339
        globalActions.firebase.login(user, false);
      }
    });
  }, []);

  return (
    <NativeRouter initialEntries={["/"]}>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/weather" component={Weather} />
      <Route exact path="/days" component={Days} />
    </NativeRouter>
  );
}
