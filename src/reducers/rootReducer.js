import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import collReducer from './collReducer';

const rootReducer = combineReducers({
  coll: collReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
