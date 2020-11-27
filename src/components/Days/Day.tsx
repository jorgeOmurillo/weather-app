import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

import { weatherConditions } from "../../../utils/WeatherConditions";

const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  weatherCondition: string;
}

const Day: React.FC<Props> = (props): JSX.Element => {
  const { day, weatherCondition } = props;
  const temperature = Math.round(day.main.temp);
  // @ts-ignore: 2532
  const weather = day.weather[0].main;

  const newDate = new Date();
  const weekday = day.dt * 1000;
  newDate.setTime(weekday);

  return (
    <View
      style={[
        styles.dayContainer,
        { backgroundColor: weatherConditions[weatherCondition].color },
      ]}
    >
      <Text style={styles.dayText}>{DAYS_OF_THE_WEEK[newDate.getDay()]}</Text>
      <MaterialCommunityIcons
        size={40}
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

export default Day;
