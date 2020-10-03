import { itemTypes } from 'actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  deleteItem: {
    error: null,
    loading: false,
  },
  editItem: {
    error: null,
    loading: false,
  },
  addPoint: {
    error: null,
    loading: false,
  },
};

// Helper functions

const addItemStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};
const addItemSuccess = (state) => {
  return {
    ...state,
    loading: false,
    error: false,
  };
};
const addItemFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};

const deleteItemStart = (state) => {
  return { ...state, deleteItem: { ...state.deleteItem, loading: true } };
};
const deleteItemSuccess = (state) => {
  return { ...state, deleteItem: { ...state.deleteItem, loading: false, error: false } };
};
const deleteItemFail = (state, payload) => {
  return { ...state, deleteItem: { ...state.deleteItem, loading: false, error: payload } };
};
const editItemStart = (state) => {
  return { ...state, editItem: { ...state.editItem, loading: true } };
};
const editItemSuccess = (state) => {
  return { ...state, editItem: { ...state.editItem, loading: false, error: false } };
};
const editItemFail = (state, payload) => {
  return { ...state, editItem: { ...state.editItem, loading: false, error: payload } };
};

const addPointStart = (state) => {
  return { ...state, addPoint: { ...state.addPoint, loading: true } };
};
const addPointSuccess = (state) => {
  return { ...state, addPoint: { ...state.addPoint, loading: false, error: false } };
};
const addPointFail = (state, payload) => {
  return { ...state, addPoint: { ...state.addPoint, loading: false, error: payload } };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM_START:
      return addItemStart(state);

    case itemTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state);

    case itemTypes.ADD_ITEM_FAIL:
      return addItemFail(state, payload);

    case itemTypes.DELETE_ITEM_START:
      return deleteItemStart(state);

    case itemTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state);

    case itemTypes.DELETE_ITEM_FAIL:
      return deleteItemFail(state, payload);

    case itemTypes.EDIT_ITEM_START:
      return editItemStart(state);

    case itemTypes.EDIT_ITEM_SUCCESS:
      return editItemSuccess(state);

    case itemTypes.EDIT_ITEM_FAIL:
      return editItemFail(state, payload);

    case itemTypes.ADD_POINT_START:
      return addPointStart(state);

    case itemTypes.ADD_POINT_SUCCESS:
      return addPointSuccess(state);

    case itemTypes.ADD_POINT_FAIL:
      return addPointFail(state, payload);

    default:
      return state;
  }
};
