import axios from "axios";

const ADD_REVIEW = "ADD_REVIEW";

const ADD_KINDNESS_REVIEW = "ADD_KINDNESS_REVIEW";
const ADD_PEST_REVIEW = "ADD_PEST_REVIEW";
const ADD_RESPONSIVENESS_REVIEW = "ADD_RESPONSIVENESS_REVIEW";
const ADD_MAINTENANCE_REVIEW = "ADD_MAINTENANCE_REVIEW";

export const _addKindnessReview = kindness => ({
  type: ADD_KINDNESS_REVIEW,
  kindness
});

export const _addPestReview = pest => ({
  type: ADD_PEST_REVIEW,
  pest
});

export const _addResponsivenessReview = responsiveness => ({
  type: ADD_RESPONSIVENESS_REVIEW,
  responsiveness
});

export const _addMaintenanceReview = maintenance => ({
  type: ADD_MAINTENANCE_REVIEW,
  maintenance
});

export const _addReview = review => ({
  type: ADD_REVIEW,
  review
});

export const addReview = review => {
  return async dispatch => {
    try {
      const added = (await axios.post("/api/reviews", review)).data;
      // will need to do this to add to the page?
      // dispatch(_addReview(added))
      res.send("review added");
    } catch (error) {
      console.log("error adding review");
    }
  };
};

const initialState = {};

export default function(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case ADD_KINDNESS_REVIEW:
      return { ...state, kindness: action.kindness };
    case ADD_PEST_REVIEW:
      return { ...state, pestControl: action.pest };
    case ADD_RESPONSIVENESS_REVIEW:
      return { ...state, responsiveness: action.responsiveness };
    case ADD_MAINTENANCE_REVIEW:
      return { ...state, maintenance: action.maintenance };
    // case FILTER_LANDLORDS:
    //   return action.landlords;
    default:
      return state;
  }
}
