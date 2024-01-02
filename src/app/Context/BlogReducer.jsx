const blogReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      //   console.log(action);
      return action.payload.data;
    case "CREATE_BLOG":
      break;
    case "UPDATE_BLOG":
      break;
    case "DELETE_BLOG":
      break;

    default:
      return state;
  }
};

export default blogReducer;
