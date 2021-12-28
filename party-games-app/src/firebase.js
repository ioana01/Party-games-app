import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDM3wEYh9D5f8T4w6pIaMyI2T9wdbc90cE",
    authDomain: "party-games-app.firebaseapp.com",
    projectId: "party-games-app",
    storageBucket: "party-games-app.appspot.com",
    messagingSenderId: "509718545311",
    appId: "1:509718545311:web:b7cc60e7cb3efec8e5b3aa",
    measurementId: "G-W255ZB36KY",
    databaseURL: 'https://party-games-app-default-rtdb.europe-west1.firebasedatabase.app/'
})

export const auth = app.auth()
export const database = app.database()
export default app