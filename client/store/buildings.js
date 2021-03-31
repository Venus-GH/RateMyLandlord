import axios from "axios";

const SET_BUILDING = "SET_BUILDING";
const SET_ALL_BUILDLINGS = "SET_ALL_BUILDINGS";

const initialState = {
  all: [],
  single: {},
  landlord: {},
  reviews: [],
};

const setBuilding = (building) => ({
  type: SET_BUILDING,
  building,
});

const setAllBuildings = (buildings) => ({
  type: SET_ALL_BUILDLINGS,
  buildings,
});

export const fetchBuilding = (address) => {
  return async (dispatch) => {
    try {
      const { data: building } = await axios.get("/api/buildings/search", {
        params: { address: address },
      });
      if (building) {
        dispatch(setBuilding(building));
      } else {
        dispatch(setBuilding(initialState));
      }
    } catch (error) {
      console.log("Error fetching building", error);
    }
  };
};

export const fetchAllBuildings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/buildings/");
      dispatch(setAllBuildings(data));
    } catch (err) {
      console.log("Error fetching all buildings");
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUILDING:
      return {
        ...state,
        single: action.building,
        landlord: action.building.landlord,
        reviews: action.building.reviews,
      };
    case SET_ALL_BUILDLINGS:
      return {
        ...state,
        all: action.buildings,
      };
    default:
      return state;
  }
}
