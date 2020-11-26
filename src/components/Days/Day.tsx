import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { weatherConditions } from "../../../utils/WeatherConditions";

const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  day: {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: {
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    sys: {
      pod: number;
    };
    weather: [];
    wind: {
      deg: number;
      speed: number;
    };
  };
}

const Day: React.FC<Props> = (props): JSX.Element => {
  const { day } = props;
  const temperature = Math.round(day.main.temp);
  // @ts-ignore: 2532
  const weather = day.weather[0].main;

  const newDate = new Date();
  const weekday = day.dt * 1000;
  newDate.setTime(weekday);

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.tempText}>{DAYS_OF_THE_WEEK[newDate.getDay()]}</Text>
      <MaterialCommunityIcons
        size={20}
        name={weatherConditions[weather].icon}
        color={"#fff"}
      />
      <View>
        <Text style={styles.tempText}>{temperature}˚C</Text>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#f7b733",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  tempText: {
    fontSize: 15,
    color: "#fff",
  },
  bodyContainer: {
    paddingLeft: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    color: "#fff",
  },
  subtitle: {
    fontSize: 5,
    color: "#fff",
  },
});

export default Day;
