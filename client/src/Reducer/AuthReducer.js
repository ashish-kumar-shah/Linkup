const AuthReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        loading: true,
        authenticate: false,
        user: null,
      };

    case "SIGN_SUCCESS":
    case "AUTH_SUCCESS":
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        authenticate: true,
        user: action.payload,
      };

    case "UPDATE_FAILED":
    case "SIGN_FAILED":
    case "AUTH_FAILED":
    case "LOGOUT_SUCEESS":
      return {
        ...state,
        loading: false,
        authenticate: false,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export default AuthReducer;
