const planReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PLANS":
      return action.plans.data.plans;
    case "ADD_PLANS":
      return state;
    default:
      return state;
  }
};

export default planReducer;
