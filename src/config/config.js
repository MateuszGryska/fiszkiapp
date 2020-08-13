import { createFirestoreInstance } from 'redux-firestore';
import { COLLECTION_TYPES } from 'helpers/constants';
import store from 'store';
import firebase from './Firebase';

// react-redux-firebase config
export const rrfConfig = {
  userProfile: COLLECTION_TYPES.users,
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
