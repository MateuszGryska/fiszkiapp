import { authTypes } from 'actions/types';

const initialState = {
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case authTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case authTypes.AUTH_FAIL:
      return {
        ...state,
        error: payload,
      };
    case authTypes.AUTH_END:
      return {
        ...state,
        loading: false,
      };
    case authTypes.CLEAN_UP:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
