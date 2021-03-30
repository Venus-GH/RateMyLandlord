import axios from "axios";

// ACTION TYPES
const SET_REVIEWS = "SET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";
const SET_THUMBS = "SET_THUMBS";

// ACTION CREATORS
export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

export const _addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const setThumbs = (updatedReview) => ({
  type: SET_THUMBS,
  updatedReview,
});

// THUNK CREATORS
export const fetchAllReviews = (category, id) => {
  // category = user/landlord/building
  return async (dispatch) => {
    try {
      const { data: reviews } = await axios.get(
        `/api/reviews/${category}/${id}`
      );
      console.log("reviews:", reviews);
      dispatch(setReviews(reviews));
    } catch (error) {
      console.log(
        "there was an error getting reviews in fetchAllReviews thunk "
      );
    }
  };
};

export const updateThumbs = (reviewId, direction) => {
  return async (dispatch) => {
    try {
      const {
        data: updatedReview,
      } = await axios.put(`/api/reviews/${reviewId}/thumbs`, { direction });
      dispatch(setThumbs(updatedReview));
    } catch (error) {
      console.log(
        "there was an error getting reviews in fetchAllReviews thunk"
      );
    }
  };
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      console.log("state in reviewlist reducer", state);
      // if (state.length > 0) {
      return [action.review, ...state];
    // } else return [action.review];
    case SET_THUMBS:
      // find review in arr by id
      // update thumbsUp and down
      return state.map((review) => {
        if (review.id === action.updatedReview.id) {
          review.thumbsUp = action.updatedReview.thumbsUp;
          review.thumbsDown = action.updatedReview.thumbsDown;
        }
        return review;
      });
    default:
      return state;
  }
}
