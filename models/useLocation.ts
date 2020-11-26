import { useState, useEffect } from "react";
import * as Location from "expo-location";
import useGlobal from "../src/store";

export default function useLocation() {
  const [error, setError] = useState("");
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
  }, []);
}
