import { authTypes } from 'actions/types';

// signUp action
export const signUp = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = getFirebase().firestore();
  dispatch({ type: authTypes.AUTH_START });

  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

    await firestore.collection('users').doc(result.user.uid).set({
      firstName: data.firstName,
      lastName: data.lastName,
    });
    dispatch({ type: authTypes.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: authTypes.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: authTypes.AUTH_END });
};

// logout action
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

// signin action
export const signIn = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  dispatch({ type: authTypes.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

    dispatch({ type: authTypes.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: authTypes.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: authTypes.AUTH_END });
};

// clean up messages
export const clean = () => ({
  type: authTypes.CLEAN_UP,
});
