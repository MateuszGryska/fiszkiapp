import { itemTypes } from 'actions/types';

// add item
export const addItem = (itemType, data) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const { uid: userId } = getState().firebase.auth;
  const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;
  dispatch({ type: itemTypes.ADD_ITEM_START });

  try {
    const getItems = await firestore.collection(itemType).doc(userId).get();

    const newItem = {
      id: getId(),
      created: await getFirebase().firestore.Timestamp.fromDate(new Date()),
      ...data,
    };
    if (!getItems.data()) {
      await firestore
        .collection(itemType)
        .doc(userId)
        .set({
          [itemType]: [newItem],
        });
    } else {
      await firestore
        .collection(itemType)
        .doc(userId)
        .update({
          [itemType]: [...getItems.data()[itemType], newItem],
        });
    }

    dispatch({ type: itemTypes.ADD_ITEM_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: itemTypes.ADD_ITEM_FAIL, payload: err.message });
    return false;
  }
};

// delete item
export const deleteItem = (itemType, id) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const { uid: userId } = getState().firebase.auth;
  dispatch({ type: itemTypes.DELETE_ITEM_START });

  try {
    const getItems = await firestore.collection(itemType).doc(userId).get();
    const prevItems = getItems.data()[itemType];

    const filteredItems = prevItems.filter((item) => item.id !== id);
    await firestore
      .collection(itemType)
      .doc(userId)
      .update({
        [itemType]: filteredItems,
      });

    dispatch({ type: itemTypes.DELETE_ITEM_SUCCESS });
  } catch (err) {
    dispatch({ type: itemTypes.DELETE_ITEM_FAIL, payload: err.message });
  }
};

// update item
export const updateItem = (itemType, id, data) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const { uid: userId } = getState().firebase.auth;
  dispatch({ type: itemTypes.EDIT_ITEM_START });

  try {
    const getItems = await firestore.collection(itemType).doc(userId).get();
    const prevItems = getItems.data()[itemType];

    const index = prevItems.findIndex((item) => item.id === id);
    prevItems[index] = {
      id,
      ...data,
    };

    await firestore
      .collection(itemType)
      .doc(userId)
      .update({
        [itemType]: prevItems,
      });

    dispatch({ type: itemTypes.EDIT_ITEM_SUCCESS });
  } catch (err) {
    dispatch({ type: itemTypes.EDIT_ITEM_FAIL, payload: err.message });
  }
};
