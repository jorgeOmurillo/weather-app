import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loading;
