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

export const filterLandlords = (order, filters) => {
  return async (dispatch) => {
    try {
      console.log("in filterLandlords, order:", order, ", filters:", filters);
      const { data } = await axios.get(
        `/api/landlords?order=${order}&filters=${filters}`
      );
      dispatch(_filterLandlords(data));
    } catch (error) {
      console.log("Error fetching filtered landlords from the server", error);
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
