import axios from "axios";

const SET_LANDLORDS = "SET_LANDLORDS";
const FILTER_LANDLORDS = "FILTER_LANDLORDS";

const setLandlords = (landlords) => ({
  type: SET_LANDLORDS,
  landlords,
});

const _filterLandlords = (landlords) => {
  return { type: FILTER_LANDLORDS, landlords };
};

export const fetchLandlords = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/landlords");
      dispatch(setLandlords(data));
    } catch (error) {
      console.log("Error fetching landlords");
    }
  };
};

export const filterLandlords = (filter) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/landlords?filterBy=${filter}`);
      dispatch(_filterLandlords(data));
    } catch (error) {
      console.log("Error fetching filtered landlords from the server");
    }
  };
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LANDLORDS:
      return action.landlords;
    case FILTER_LANDLORDS:
      return action.landlords;
    default:
      return state;
  }
}
