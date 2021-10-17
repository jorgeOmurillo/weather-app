import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useHistory} from 'react-router-native';
//import { MaterialCommunityIcons } from "@expo/vector-icons";
//import * as Location from "expo-location";
import Geolocation from 'react-native-geolocation-service';

import styles from './styles';
import {CurrentUser, useOpenWeather} from '../../../models';
import Loading from '../Loading/Loading';
import withGeolocation from '../withGeolocation';

import {weatherConditions} from '../../../utils/WeatherConditions';

function Weather(props) {
  const history = useHistory();
  const {latitude, longitude} = props.position.coords || {};
  const {data, error, loading} = useOpenWeather(latitude, longitude);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  const temperature = Math.round(data.weatherRes.list[0].main.temp);
  const weatherCondition = data.weatherRes.list[0].weather[0].main;

  const handleOnPress = () => {
    history.push('/days');
  };
  const onLogoutPress = () => {
    CurrentUser.logout();
    history.push('/login');
  };

  return (
    <View
      style={[
        styles.weatherContainer,
        {backgroundColor: weatherConditions[weatherCondition].color},
      ]}
    >
      <View style={styles.headerContainer}>
        {/*<MaterialCommunityIcons
          size={48}
          name={weatherConditions[weatherCondition].icon}
          color={"#fff"}
        />*/}
        <Text style={styles.tempText}>{temperature}˚C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{alignItems: 'center'}}>
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

export default withGeolocation(Weather);
