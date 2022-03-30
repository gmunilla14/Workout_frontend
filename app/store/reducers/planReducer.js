const planReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PLANS":
      return action.plans.data.plans;
    case "ADD_PLAN":
      return [action.plan, ...state];
    case "EDIT_PLAN":
      console.log("Reducer");
      console.log(action.plan);
      console.log("-----------------------------------------");
      console.log(
        state.map((plan) => (plan._id == action.plan._id ? action.plan : plan))
      );
      return state.map((plan) =>
        plan._id == action.plan._id ? action.plan : plan
      );
    default:
      return state;
  }
};

export default planReducer;
