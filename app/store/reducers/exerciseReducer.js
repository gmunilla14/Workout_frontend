const exerciseReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_EX":
      return action.exercises.data.exercises;
    case "ADD_EXERCISE":
      return state;
    default:
      return state;
  }
};

export default exerciseReducer;
