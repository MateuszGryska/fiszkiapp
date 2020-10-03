import { authTypes } from 'actions/actionTypes';

type Error = string | boolean | null;
type Loading = boolean;

interface AuthState {
  error: Error;
  loading: Loading;
  verifyEmail: {
    error: Error;
    loading: Loading;
  };
  recoveryPassword: {
    error: Error;
    loading: Loading;
  };
  profileEdit: {
    error: Error;
    loading: Loading;
  };
  uploadAvatar: {
    error: Error;
    loading: Loading;
  };
  deleteUser: {
    error: Error;
    loading: Loading;
  };
  darkMode: {
    error: Error;
    loading: Loading;
  };
}

interface Action {
  type: string;
  payload: string;
}
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
  profileEdit: {
    error: null,
    loading: false,
  },
  uploadAvatar: {
    error: null,
    loading: false,
  },
  deleteUser: {
    error: null,
    loading: false,
  },
  darkMode: {
    error: null,
    loading: false,
  },
};

// Helper functions

const authStart = (state: AuthState) => {
  return { ...state, loading: true };
};

const authEnd = (state: AuthState): AuthState => {
  return {
    ...state,
    loading: false,
  };
};

const authFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    error: payload,
  };
};

const authSuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    error: false,
  };
};

const socialAuthStart = (state: AuthState): AuthState => {
  return { ...state, loading: true };
};

const socialAuthEnd = (state: AuthState): AuthState => {
  return {
    ...state,
    loading: false,
  };
};

const socialAuthFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    error: payload,
  };
};

const socialAuthSuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    error: false,
  };
};

const verifyStart = (state: AuthState): AuthState => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: true,
    },
  };
};

const verifySuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: false,
    },
  };
};

const verifyFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: payload,
    },
  };
};

const recoveryStart = (state: AuthState): AuthState => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: true,
    },
  };
};

const recoverySuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: false,
      error: false,
    },
  };
};

const recoveryFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: false,
      error: payload,
    },
  };
};

const profileEditStart = (state: AuthState): AuthState => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: true,
    },
  };
};

const profileEditSuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: null,
    },
  };
};

const profileEditFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: payload,
    },
  };
};

const deleteStart = (state: AuthState): AuthState => {
  return {
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: true,
    },
  };
};

const deleteFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: false,
      error: payload,
    },
  };
};

const uploadAvatarStart = (state: AuthState): AuthState => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: true,
    },
  };
};

const uploadAvatarSuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: false,
      error: null,
    },
  };
};

const uploadAvatarFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: false,
      error: payload,
    },
  };
};

const darkModeStart = (state: AuthState): AuthState => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: true,
    },
  };
};

const darkModeSuccess = (state: AuthState): AuthState => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: false,
      error: null,
    },
  };
};

const darkModeFail = (state: AuthState, payload: string): AuthState => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: false,
      error: payload,
    },
  };
};

const cleanUp = (state: AuthState): AuthState => {
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
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: null,
    },
    uploadAvatar: {
      ...state.uploadAvatar,
      error: null,
      loading: false,
    },
    deleteUser: {
      ...state.deleteUser,
      loading: false,
      error: null,
    },
    darkMode: {
      ...state.darkMode,
      error: null,
      loading: false,
    },
  };
};
export default (state = initialState, { type, payload }: Action): AuthState => {
  switch (type) {
    case authTypes.AUTH_START:
      return authStart(state);

    case authTypes.AUTH_SUCCESS:
      return authSuccess(state);

    case authTypes.AUTH_FAIL:
      return authFail(state, payload);

    case authTypes.AUTH_END:
      return authEnd(state);

    case authTypes.SOCIAL_AUTH_START:
      return socialAuthStart(state);

    case authTypes.SOCIAL_AUTH_SUCCESS:
      return socialAuthSuccess(state);

    case authTypes.SOCIAL_AUTH_FAIL:
      return socialAuthFail(state, payload);

    case authTypes.SOCIAL_AUTH_END:
      return socialAuthEnd(state);

    case authTypes.CLEAN_UP:
      return cleanUp(state);

    case authTypes.VERIFY_START:
      return verifyStart(state);

    case authTypes.VERIFY_SUCCESS:
      return verifySuccess(state);

    case authTypes.VERIFY_FAIL:
      return verifyFail(state, payload);

    case authTypes.RECOVERY_START:
      return recoveryStart(state);

    case authTypes.RECOVERY_SUCCESS:
      return recoverySuccess(state);

    case authTypes.RECOVERY_FAIL:
      return recoveryFail(state, payload);

    case authTypes.PROFILE_EDIT_START:
      return profileEditStart(state);

    case authTypes.PROFILE_EDIT_SUCCESS:
      return profileEditSuccess(state);

    case authTypes.PROFILE_EDIT_FAIL:
      return profileEditFail(state, payload);

    case authTypes.UPLOAD_AVATAR_START:
      return uploadAvatarStart(state);

    case authTypes.UPLOAD_AVATAR_SUCCESS:
      return uploadAvatarSuccess(state);

    case authTypes.UPLOAD_AVATAR_FAIL:
      return uploadAvatarFail(state, payload);

    case authTypes.SET_DARK_MODE_START:
      return darkModeStart(state);

    case authTypes.SET_DARK_MODE_SUCCESS:
      return darkModeSuccess(state);

    case authTypes.SET_DARK_MODE_FAIL:
      return darkModeFail(state, payload);

    case authTypes.DELETE_USER_START:
      return deleteStart(state);

    case authTypes.DELETE_USER_FAIL:
      return deleteFail(state, payload);

    default:
      return state;
  }
};
