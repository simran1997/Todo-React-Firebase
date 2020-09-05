import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAI0aQBZRTzCeMYLmAFWD7tmsUoUcqd-Rc",
    authDomain: "todo-app-firebase-ca8b8.firebaseapp.com",
    databaseURL: "https://todo-app-firebase-ca8b8.firebaseio.com",
    projectId: "todo-app-firebase-ca8b8",
    storageBucket: "todo-app-firebase-ca8b8.appspot.com",
    messagingSenderId: "702692021715",
    appId: "1:702692021715:web:1a7c35c8119d2694140b26",
    measurementId: "G-P20XMWRTMM"
  };

  // Initialize Firebase with a "default" Firebase project
var firebaseProject = firebase.initializeApp(firebaseConfig);

console.log(firebaseProject.name);  // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
// var defaultStorage = defaultProject.storage();
var db = firebaseProject.firestore();

// Option 2: Access Firebase services using shorthand notation
// defaultStorage = firebase.storage();
// constdefaultFirestore = firebase.firestore();

export { db };