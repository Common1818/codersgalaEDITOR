export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        loginCode: action.loginCode,
        errorMessage: action.errorMessage,
        isReady: true,
      };
    case "LOGIN_GOOGLE":
      return {
        ...state,
        loginCode: action.loginCode,
        errorMessage: action.errorMessage,
        isReady: true,
        reloadPage: 100,
      };
    case "LOGOUT":
      return {
        ...state,
        loginCode: action.loginCode,
        loginError: action.loginError,
      };
    case "SIGN_UP":
      return {
        ...state,
        loginCode: action.loginCode,
        errorMessage: action.errorMessage,
      };

    case "PASSWORD_RESET":
      return {
        ...state,
        ResetMessage: action.ResetMessage,
      };

    case "GET_PROFILE":
      return {
        ...state,
        userProfile: action.profile,
      };

    case "GET_PROFILE_ERROR":
      return {
        ...state,

        userProfile: action.profile,
      };
    case "PROFILE_UPDATE":
      return { ...state, profileUpdateComplete: action.profileUpdateComplete };

    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.userId);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case "USER_LOADED":
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isAdmin: payload.role === 0 ? false : true,
        loading: false,
      };

    default:
      return state;
  }
};
