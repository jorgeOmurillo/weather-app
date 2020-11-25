import React, { useEffect, useState } from "react";
import { NativeRouter, Route } from "react-router-native";
import * as Location from "expo-location";
import { decode, encode } from "base-64";

import useGlobal from "./src/store";
import { firebase } from "./src/firebase/config";
import { Days, Home, Login, Registration } from "./src/components";

const globalAny: any = global;

if (!globalAny.btoa) {
  globalAny.btoa = encode;
}
if (!globalAny.atob) {
  globalAny.atob = decode;
}

export default function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [user, setUser] = useState(null);
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
  }, []);

  return (
    <NativeRouter initialEntries={["/login"]}>
      {user ? (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/days" component={Days} />
        </>
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
        </>
      )}
    </NativeRouter>
  );
}
