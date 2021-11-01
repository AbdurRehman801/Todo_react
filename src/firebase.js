import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0psOWORJ2taEcB5zAOjvCr2v7UXhxu_E",
    authDomain: "todo-react-app-f61a3.firebaseapp.com",
    databaseURL: "https://todo-react-app-f61a3-default-rtdb.firebaseio.com",
    projectId: "todo-react-app-f61a3",
    storageBucket: "todo-react-app-f61a3.appspot.com",
    messagingSenderId: "292639466942",
    appId: "1:292639466942:web:3aa34477c7052b3c6b85ef"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

export { auth, database, storage, firebase };