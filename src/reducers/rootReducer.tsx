import { combineReducers } from 'redux';
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

interface Profile {
  firstName: string;
  lastName: string;
  avatar: string;
  socialLogIn: boolean;
  points: number;
  isDarkMode: boolean;
}

interface Created {
  seconds: number;
  nanoseconds: number;
}
interface Data {
  description: string;
  title: string;
  polish: string;
  english: string;
  id: string;
  content: string;
  created: Created;
}

interface Schema {
  words: Data[];
  notes: Data[];
}

// type Error = string | boolean | null;
// type Loading = boolean;

// interface AuthState {
//   error: Error;
//   loading: Loading;
//   verifyEmail: {
//     error: Error;
//     loading: Loading;
//   };
//   recoveryPassword: {
//     error: Error;
//     loading: Loading;
//   };
//   profileEdit: {
//     error: Error;
//     loading: Loading;
//   };
//   uploadAvatar: {
//     error: Error;
//     loading: Loading;
//   };
//   deleteUser: {
//     error: Error;
//     loading: Loading;
//   };
//   darkMode: {
//     error: Error;
//     loading: Loading;
//   };
// }

interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
}

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  items: itemsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
