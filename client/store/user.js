import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_REVIEWS = "GET_REVIEWS";
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_PREFERENCES = "UPDATE_PREFERENCES";

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});
const updateName = (preferredName) => ({
  type: UPDATE_NAME,
  preferredName,
});
const _updatePreferences = (preferences) => ({
  type: UPDATE_PREFERENCES,
  preferredNeighborhood: preferences.neighborhood,
  preferredMaxPrice: preferences.maxPrice,
});

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    const { data: reviews } = await axios.get(`/api/users/${id}/reviews`);
    dispatch(setReviews(reviews));
  } catch (err) {
    console.error(err);
  }
};

export const updatePreferences = (id, preferences) => async (dispatch) => {
  try {
    await axios.put(`/api/users/${id}`, preferences);
    dispatch(_updatePreferences(preferences));
  } catch (err) {
    console.log("there was an error updating user preferences");
    console.error(err);
  }
};

export const updatePreferredName = (id, name) => async (dispatch) => {
  try {
    const { data: user } = await axios.put(`/api/users/${id}`, {
      preferredName: name,
    });
    console.log("in updatePreferredName user:", user);
    dispatch(updateName(user.preferredName));
  } catch (err) {
    console.log("there was an error updating preferred name");
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case SET_REVIEWS:
      state.reviews = action.reviews;
      return state;
    case UPDATE_NAME:
      state.preferredName = action.preferredName;
      return state;
    case UPDATE_PREFERENCES:
      return {
        ...state,
        neighborhoodPreference: action.preferredNeighborhood,
        maxPricePreference: action.preferredMaxPrice,
      };
    default:
      return state;
  }
}
