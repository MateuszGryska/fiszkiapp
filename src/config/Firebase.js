import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyC9mHBIYg2B_yzVCY9WFeGrIfV4PR-qn-s',
  authDomain: 'fiszki-95d38.firebaseapp.com',
  databaseURL: 'https://fiszki-95d38.firebaseio.com',
  projectId: 'fiszki-95d38',
  storageBucket: 'fiszki-95d38.appspot.com',
  messagingSenderId: '435933556457',
  appId: '1:435933556457:web:b69e0344952b46686c4a78',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
