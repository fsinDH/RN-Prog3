import app from 'firebase/app';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCVIzzQ9oauaXDx2zxjqB2aINqOG08u_KI",
  authDomain: "rn-prog-3.firebaseapp.com",
  projectId: "rn-prog-3",
  storageBucket: "rn-prog-3.appspot.com",
  messagingSenderId: "1088719060704",
  appId: "1:1088719060704:web:274d317a0525c81ba6da85"
};

// initializeApp es un MÉTODO que obtiene como parámetro la configuración de firebase constatada previamente como firebaseConfig
app.initializeApp(firebaseConfig);


// auth - db - storage = CONSTANTES que tienen métodos (.auth - .firestore - .storage) para los métodos; (firebase - app - app)

//authentication
export const auth = firebase.auth()
//database
export const db = app.firestore()
//storage
export const storage = app.storage()