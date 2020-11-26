import { useState, useEffect } from "react";

import { firebase } from "../src/firebase/config";
import useGlobal from "../src/store";

export const CurrentUser = {
  get() {
    const [, globalActions] = useGlobal();
    const [, setUser] = useState(null);

    useEffect(() => {
      const usersRef = firebase.firestore().collection("users");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              const userData = document.data();
              setUser(userData);
              // @ts-ignore: 2339
              globalActions.firebase.login(userData, false);
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          // @ts-ignore: 2339
          globalActions.firebase.login(user, false);
        }
      });
    }, []);
  },
  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            /* const user = firestoreDocument.data(); */
            /* navigation.navigate("Home", { user }); */
            // history.push("/weather");
          })
          .catch((error: any) => {
            alert("Error Logging in.");
            console.error(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
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
