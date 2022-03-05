export function user(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: action.payload };
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    case "REFRESH":
      return { ...state, refresh: action.payload };
    default:
      return state;
  }
}
