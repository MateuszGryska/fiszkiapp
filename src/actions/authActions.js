import { authTypes } from 'actions/types';

// signUp action
export const signUp = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = getFirebase().firestore();
  dispatch({ type: authTypes.AUTH_START });

  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

    // send verification email
    const user = firebase.auth().currentUser;

    await user.sendEmailVerification();

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

// verify email

export const verifyEmail = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: authTypes.VERIFY_START });

  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: authTypes.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: authTypes.VERIFY_FAIL, payload: err.message });
  }
};

// send recover password
export const recoveryPassword = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: authTypes.RECOVERY_START });

  try {
    await firebase.auth().sendPasswordResetEmail(data.email);
    dispatch({ type: authTypes.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: authTypes.RECOVERY_FAIL, payload: err.message });
  }
};

// edit profile
export const editProfile = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: authTypes.PROFILE_EDIT_START });

  try {
    if (userEmail !== data.email) {
      await user.updateEmail(data.email);
    }

    await firestore.collection('users').doc(userId).set({
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }

    dispatch({ type: authTypes.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: authTypes.PROFILE_EDIT_FAIL, payload: err.message });
  }
};

// delete user
export const deleteUser = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  const { uid: userId } = getState().firebase.auth;
  dispatch({ type: authTypes.DELETE_USER_START });

  try {
    await firestore.collection('users').doc(userId).delete();
    await firestore.collection('words').doc(userId).delete();
    await firestore.collection('notes').doc(userId).delete();
    await user.delete();
  } catch (err) {
    dispatch({ type: authTypes.DELETE_USER_FAIL, payload: err.message });
  }
};
