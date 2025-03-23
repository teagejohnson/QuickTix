import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyArc0eIZjgUioTNugh85Gziuc9UUsKeqas",
  authDomain: "tickets-e1f22.firebaseapp.com",
  projectId: "tickets-e1f22",
  storageBucket: "tickets-e1f22.appspot.com",
  messagingSenderId: "710738884441",
  appId: "1:710738884441:web:441929cd90cad85e5fbe48"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.auth();

export default firebase
