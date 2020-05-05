import { itemTypes } from 'actions/types';

// add item
export const addItem = (itemType, data) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const { uid: userId } = getState().firebase.auth;
  const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;
  dispatch({ type: itemTypes.ADD_ITEM_START });

  try {
    const prevItems = await firestore.collection(itemType).doc(userId).get();

    const newItem = {
      id: getId(),
      ...data,
    };
    if (!prevItems.data()) {
      firestore
        .collection(itemType)
        .doc(userId)
        .set({
          [itemType]: [newItem],
        });
    } else {
      firestore
        .collection(itemType)
        .doc(userId)
        .update({
          [itemType]: [...prevItems.data()[itemType], newItem],
        });
    }

    dispatch({ type: itemTypes.ADD_ITEM_SUCCESS });
  } catch (err) {
    dispatch({ type: itemTypes.ADD_ITEM_FAIL, payload: err.message });
  }
};
