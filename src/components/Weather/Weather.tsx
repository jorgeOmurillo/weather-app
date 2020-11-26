import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

import useGlobal from "../../store";

import { weatherConditions } from "../../../utils/WeatherConditions";

export default function Weather() {
  const history = useHistory();
  const [globalState] = useGlobal();
  const { temperature, weatherCondition } = globalState;
  const handleOnPress = () => {
    history.push("/days");
  };
  const onLogoutPress = () => {
    history.push("/login");
  };

  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weatherCondition].color },
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={48}
          name={weatherConditions[weatherCondition].icon}
          color={"#fff"}
        />
        <Text style={styles.tempText}>{temperature}˚C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            {weatherConditions[weatherCondition].title}
          </Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weatherCondition].subtitle}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnPress}>
          <Text style={styles.subtitle}>5-day forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
