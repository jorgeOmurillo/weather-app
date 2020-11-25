import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>HELLO</Text>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
