import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
