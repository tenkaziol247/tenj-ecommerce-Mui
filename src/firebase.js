import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyANPEO32ALKGBvOa20YmqnovlThDcZIg3w",
  authDomain: "tenj-ecommerce-mui.firebaseapp.com",
  databaseURL: "https://tenj-ecommerce-mui.firebaseio.com",
  projectId: "tenj-ecommerce-mui",
  storageBucket: "tenj-ecommerce-mui.appspot.com",
  messagingSenderId: "902593560955",
  appId: "1:902593560955:web:079b466412d988a54efdde",
  measurementId: "G-GK1Q0Y38FV",
});

export const auth = app.auth();
export const database = app.database();
export default app;
