import firebase from "firebase/app";
import "firebase/firestore";

// Web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAlsiin6bVcgJyz0NH7mGM5vL0T1Ipiu_o",
  authDomain: "zopa-money-transfer-test.firebaseapp.com",
  projectId: "zopa-money-transfer-test",
  storageBucket: "zopa-money-transfer-test.appspot.com",
  messagingSenderId: "914243845239",
  appId: "1:914243845239:web:40dd1a50eba1a8e6f29a72",
  measurementId: "G-XXPQCKTD2T"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
