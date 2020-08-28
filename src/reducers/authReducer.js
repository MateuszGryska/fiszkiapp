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

const authStart = (state) => {
  return { ...state, loading: true };
};

const authEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const authFail = (state, payload) => {
  return {
    ...state,
    error: payload,
  };
};

const authSuccess = (state) => {
  return {
    ...state,
    error: false,
  };
};

const socialAuthStart = (state) => {
  return { ...state, loading: true };
};

const socialAuthEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const socialAuthFail = (state, payload) => {
  return {
    ...state,
    error: payload,
  };
};

const socialAuthSuccess = (state) => {
  return {
    ...state,
    error: false,
  };
};

const verifyStart = (state) => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: true,
    },
  };
};

const verifySuccess = (state) => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: false,
    },
  };
};

const verifyFail = (state, payload) => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: payload,
    },
  };
};

const recoveryStart = (state) => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: true,
    },
  };
};

const recoverySuccess = (state) => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: false,
      error: false,
    },
  };
};

const recoveryFail = (state, payload) => {
  return {
    ...state,
    recoveryPassword: {
      ...state.recoveryPassword,
      loading: false,
      error: payload,
    },
  };
};

const profileEditStart = (state) => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: true,
    },
  };
};

const profileEditSuccess = (state) => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: null,
    },
  };
};

const profileEditFail = (state, payload) => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: payload,
    },
  };
};

const deleteStart = (state) => {
  return {
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: true,
    },
  };
};

const deleteFail = (state, payload) => {
  return {
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: false,
      error: payload,
    },
  };
};

const uploadAvatarStart = (state) => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: true,
    },
  };
};

const uploadAvatarSuccess = (state) => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: false,
      error: null,
    },
  };
};

const uploadAvatarFail = (state, payload) => {
  return {
    ...state,
    uploadAvatar: {
      ...state.uploadAvatar,
      loading: false,
      error: payload,
    },
  };
};

const darkModeStart = (state) => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: true,
    },
  };
};

const darkModeSuccess = (state) => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: false,
      error: null,
    },
  };
};

const darkModeFail = (state, payload) => {
  return {
    ...state,
    darkMode: {
      ...state.darkMode,
      loading: false,
      error: payload,
    },
  };
};

const cleanUp = (state) => {
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
    editProfile: {
      ...state.editProfile,
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
export default (state = initialState, { type, payload }) => {
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

    case authTypes.PROFILE_EDIT_SUCCCESS:
      return profileEditSuccess(state);

    case authTypes.PROFILE_EDIT_FAIL:
      return profileEditFail(state, payload);

    case authTypes.UPLOAD_AVATAR_START:
      return uploadAvatarStart(state);

    case authTypes.UPLOAD_AVATAR_SUCCCESS:
      return uploadAvatarSuccess(state);

    case authTypes.UPLOAD_AVATAR_FAIL:
      return uploadAvatarFail(state, payload);

    case authTypes.SET_DARK_MODE_START:
      return darkModeStart(state);

    case authTypes.SET_DARK_MODE_SUCCCESS:
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
