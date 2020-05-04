import { authTypes } from 'actions/types';

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  recoveryPassword: {
    error: null,
    loading: false,
  },
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
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          error: null,
        },
        recoveryPassword: {
          ...state.recoveryPassword,
          loading: false,
          error: null,
        },
      };

    case authTypes.VERIFY_START:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: true,
        },
      };
    case authTypes.VERIFY_SUCCESS:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          error: false,
        },
      };
    case authTypes.VERIFY_FAIL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          error: payload,
        },
      };
    case authTypes.RECOVERY_START:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          loading: true,
        },
      };
    case authTypes.RECOVERY_SUCCESS:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          loading: false,
          error: false,
        },
      };
    case authTypes.RECOVERY_FAIL:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};
