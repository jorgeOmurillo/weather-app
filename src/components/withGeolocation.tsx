import React, {useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Loading from '../components/Loading/Loading';

function withGeolocation(WrappedComponent: any) {
  function WithGeolocation(...props: any) {
    const [position, setPosition] = useState(null);

    useEffect(() => {
      async function getLocation() {
        const hasPermissionIOS = async () => {
          const openSetting = () => {
            Linking.openSettings().catch(() => {
              Alert.alert('Unable to open settings');
            });
          };
          const status = await Geolocation.requestAuthorization('whenInUse');

          if (status === 'granted') {
            return true;
          }

          if (status === 'denied') {
            Alert.alert('Location permission denied');
          }

          if (status === 'disabled') {
            Alert.alert(
              `Turn on Location Services to allow the "Weather" app to determine your location.`,
              '',
              [
                {text: 'Go to Settings', onPress: openSetting},
                {text: "Don't Use Location", onPress: () => {}},
              ],
            );
          }

          return false;
        };

        const hasLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
          }

          return false;
        };

        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
          return;
        }

        Geolocation.getCurrentPosition(
          position => {
            setPosition(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
      getLocation();
    }, []);

    if (!position) {
      return <Loading />;
    }
    return <WrappedComponent position={position} />;
  }

  return WithGeolocation;
}

export default withGeolocation;
