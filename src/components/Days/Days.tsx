import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useGlobal from "../../store";

import Day from "./Day";
import styles from "./styles";
import { weatherConditions } from "../../../utils/WeatherConditions";

const Days = (): JSX.Element => {
  const [globalState] = useGlobal();
  const { days, weatherCondition } = globalState;
  const history = useHistory();

  const handleOnPress = () => {
    history.goBack();
  };

  return (
    <View style={styles.weatherContainer}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={[
          styles.button,
          { backgroundColor: weatherConditions[weatherCondition].color },
        ]}
      >
        <MaterialCommunityIcons
          size={40}
          name="keyboard-backspace"
          color={"#fff"}
          onPress={handleOnPress}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.bodyContainer,
          { backgroundColor: weatherConditions[weatherCondition].color },
        ]}
      >
        {days.map((day) => (
          <Day day={day} weatherCondition={weatherCondition} key={day.dt_txt} />
        ))}
      </View>
    </View>
  );
};

export default Days;
