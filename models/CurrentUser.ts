import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const CurrentUser = {
  async get() {
    return new Promise((resolve, reject) => {
      try {
        auth().onAuthStateChanged((user: any) => resolve(user));
      } catch (e) {
        reject(e);
      }
    });
  },
  async login(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
  },
  async logout() {
    try {
      await auth().signOut();

      alert('Logged out successfully!');
    } catch (error) {
      alert('Did not log out successfully.');
      console.error(error);
    }
  },
  async register(fullName: string, email: string, password: string) {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const uid = result.user.uid;
      const data = {
        id: uid,
        email,
        fullName,
      };
      const usersRef = firestore().collection('users');

      await usersRef.doc(uid).set(data);
      alert('Account successfully registered!');
    } catch (error) {
      alert(error);
    }
  },
};

export default CurrentUser;
