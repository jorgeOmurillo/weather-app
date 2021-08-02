import { firebase } from "../src/firebase/config";

export const CurrentUser = {
  async get() {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged((user: any) => resolve(user));
      } catch (e) {
        reject(e);
      }
    });
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

export default CurrentUser;
