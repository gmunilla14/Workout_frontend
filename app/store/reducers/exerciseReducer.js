const exerciseReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_EX":
      return action.exercises.data.exercises;
    default:
      return state;
  }
};

export default exerciseReducer;
