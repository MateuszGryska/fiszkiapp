import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import collReducer from './collReducer';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  coll: collReducer,
  items: itemsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
