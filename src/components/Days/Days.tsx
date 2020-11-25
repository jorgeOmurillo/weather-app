import React from "react";
import { View, StyleSheet } from "react-native";

import useGlobal from "../../store";

import Day from "./Day";

const Days = (): JSX.Element => {
  const [globalState] = useGlobal();
  const { days } = globalState;

  return (
    <View style={styles.weatherContainer}>
      {days.map((day) => (
        <Day day={day} key={day.dt_txt} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
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

export default Days;
