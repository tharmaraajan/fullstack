import  firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCmCGcarN9dOGKjA8_jDKucxDWSsD9G55I",
    authDomain: "react-crud-450fa.firebaseapp.com",
    databaseURL: "https://react-crud-450fa-default-rtdb.firebaseio.com",
    projectId: "react-crud-450fa",
    storageBucket: "react-crud-450fa.appspot.com",
    messagingSenderId: "880116345264",
    appId: "1:880116345264:web:c8d25e21b85c4ebc2e0e75"
  };
  // Initialize Firebase
  var fireDb=firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();