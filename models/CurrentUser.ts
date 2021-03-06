import { useEffect } from "react";
import * as Location from "expo-location";

import { firebase } from "../src/firebase/config";
import useGlobal from "../src/store";

export const CurrentUser = {
  get() {
    const [, globalActions] = useGlobal();

    useEffect(() => {
      const usersRef = firebase.firestore().collection("users");
      return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              const userData = document.data();

              (async function getLocation() {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== "granted") {
                  console.error("Permission to access location was denied");
                } else {
                  try {
                    let location = await Location.getCurrentPositionAsync({
                      accuracy: Location.Accuracy.High,
                    });

                    // @ts-ignore: 2339
                    globalActions.openWeatherMap.fetchWeather(
                      location.coords.latitude,
                      location.coords.longitude
                    );
                  } catch (e) {
                    console.error(e);
                  }
                }
              })();
              // @ts-ignore: 2339
              globalActions.firebase.login(userData);
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          // @ts-ignore: 2339
          globalActions.firebase.login(null, false);
        }
      });
    }, []);
  },
  async login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Logged out successfully!");
      })
      .catch((error) => {
        alert("Did not log out successfully.");
        console.error(error);
      });
  },
  register(fullName: string, email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            alert("Account successfully registered!");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  },
};
