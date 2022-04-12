const workoutReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_WORKOUTS":
      return action.workouts.data.workouts;
    case "ADD_WORKOUT":
      return [action.workout.data.workout, ...state];
    default:
      return state;
  }
};

export default workoutReducer;
