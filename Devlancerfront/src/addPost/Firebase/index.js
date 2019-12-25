import firebase from 'firebase/app'
import "firebase/storage"

  var firebaseConfig = {
    apiKey: "AIzaSyBrWAUpNuFN0yaSO06l6nK-yLaS-S9GT3A",
    authDomain: "projecr4.firebaseapp.com",
    databaseURL: "https://projecr4.firebaseio.com",
    projectId: "projecr4",
    storageBucket: "projecr4.appspot.com",
    messagingSenderId: "1083667826468",
    appId: "1:1083667826468:web:09fdfe1013c15f8226d5b1",
    measurementId: "G-QNVJY59SVZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { firebase, storage as default };