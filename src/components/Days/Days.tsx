import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useHistory} from 'react-router-native';

import {useOpenWeather} from '../../../models';
import Loading from '../Loading/Loading';
import Day from './Day';
import styles from './styles';
import {weatherConditions} from '../../../utils/WeatherConditions';
import withGeolocation from '../withGeolocation';

function Days(props): JSX.Element {
  const history = useHistory();
  const {latitude, longitude} = props.position.coords || {};
  const {data, error, loading} = useOpenWeather(latitude, longitude);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  const weatherCondition = data.weatherRes.list[0].weather[0].main;
  const days = data.weatherRes.list.filter((reading: any) =>
    reading.dt_txt.includes('18:00:00'),
  );

  const handleOnPress = () => {
    history.goBack();
  };

  return (
    <View style={styles.weatherContainer}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={[
          styles.button,
          {backgroundColor: weatherConditions[weatherCondition].color},
        ]}
      >
        {/*
        <MaterialCommunityIcons
          size={40}
          name="keyboard-backspace"
          color={"#fff"}
          onPress={handleOnPress}
        />
        */}
      </TouchableOpacity>
      <View
        style={[
          styles.bodyContainer,
          {backgroundColor: weatherConditions[weatherCondition].color},
        ]}
      >
        {days.map((day) => (
          <Day day={day} weatherCondition={weatherCondition} key={day.dt_txt} />
        ))}
      </View>
    </View>
  );
}

export default withGeolocation(Days);
