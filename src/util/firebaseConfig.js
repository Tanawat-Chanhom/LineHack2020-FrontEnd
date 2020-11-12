import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCVmJqoaLRd4CaICcG7GNBaNSQHJSqt3qU",
  authDomain: "linehack-2020.firebaseapp.com",
  databaseURL: "https://linehack-2020.firebaseio.com",
  projectId: "linehack-2020",
  storageBucket: "linehack-2020.appspot.com",
  messagingSenderId: "510996523044",
  appId: "1:510996523044:web:c917cf6d8b5b4a64f310b1",
};

const admin = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default admin;
