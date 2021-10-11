import firebase from 'firebase/app'
import 'firebase/database'

// initialize database

const config = {
    apiKey: "AIzaSyC0owQHGy0XyH8_lEKDkA0JAND6hMh5Wjw",
  authDomain: "intellimausam-2e6fa.firebaseapp.com",
  databaseURL: "https://intellimausam-2e6fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intellimausam-2e6fa",
  storageBucket: "intellimausam-2e6fa.appspot.com",
  messagingSenderId: "593089873345",
  appId: "1:593089873345:web:a42bcb2e9b769eae9a9b40"
};

firebase.initializeApp(config);

export default firebase;