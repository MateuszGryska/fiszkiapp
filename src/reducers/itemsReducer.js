import { itemTypes } from 'actions/types';

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
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM_START:
      return { ...state, loading: true };
    case itemTypes.ADD_ITEM_SUCCESS:
      return { ...state, loading: false, error: false };
    case itemTypes.ADD_ITEM_FAIL:
      return { ...state, loading: false, error: payload };
    case itemTypes.DELETE_ITEM_START:
      return { ...state, deleteItem: { ...state.deleteItem, loading: true } };
    case itemTypes.DELETE_ITEM_SUCCESS:
      return { ...state, deleteItem: { ...state.deleteItem, loading: false, error: false } };
    case itemTypes.DELETE_ITEM_FAIL:
      return { ...state, deleteItem: { ...state.deleteItem, loading: false, error: payload } };
    case itemTypes.EDIT_ITEM_START:
      return { ...state, editItem: { ...state.editItem, loading: true } };
    case itemTypes.EDIT_ITEM_SUCCESS:
      return { ...state, editItem: { ...state.editItem, loading: false, error: false } };
    case itemTypes.EDIT_ITEM_FAIL:
      return { ...state, editItem: { ...state.editItem, loading: false, error: payload } };
    default:
      return state;
  }
};
