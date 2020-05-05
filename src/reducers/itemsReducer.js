import { itemTypes } from 'actions/types';

const initialState = {
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM_START:
      return { ...state, loading: true };
    case itemTypes.ADD_ITEM_SUCCESS:
      return { ...state, loading: false, error: false };
    case itemTypes.ADD_ITEM_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
