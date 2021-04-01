import axios from "axios";

// ACTION TYPES
const SET_REVIEWS = "SET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";
const SET_THUMBS = "SET_THUMBS";
const DELETE_REVIEW = "DELETE_REVIEW";

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

const _deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
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

export const deleteReview = (reviewId) => {
  console.log("deleting review:", reviewId);
  return async (dispatch) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      dispatch(_deleteReview(reviewId));
    } catch (error) {
      console.log("there was an error deleteing review in deleteReview thunk");
    }
  };
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
        ? action.reviews.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        : initialState;
    case ADD_REVIEW:
      return [action.review, ...state];

    case SET_THUMBS:
      return state.map((review) => {
        if (review.id === action.updatedReview.id) {
          review.thumbsUp = action.updatedReview.thumbsUp;
          review.thumbsDown = action.updatedReview.thumbsDown;
        }
        return review;
      });
    case DELETE_REVIEW:
      return state.filter((review) => review.id !== action.reviewId);
    default:
      return state;
  }
}
