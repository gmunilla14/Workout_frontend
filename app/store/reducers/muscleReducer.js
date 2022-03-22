const muscleReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_MUSCLES":
      return action.muscles.data;
    default:
      return state;
  }
};

export default muscleReducer;
