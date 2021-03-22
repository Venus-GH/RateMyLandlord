import axios from "axios";

const SET_BUILDING = "SET_BUILDING";
const SET_ALL_BUILDLINGS = "SET_ALL_BUILDINGS";

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
      const refinedAddress = address.slice(0, -5);
      // console.log('in fetchBuilding with refined address:', refinedAddress)
      const { data: building } = await axios.get("/api/buildings/search", {
        params: { address: refinedAddress },
      });
      if (building) {
        const { data: landlord } = await axios.get(
          `/api/landlords/${building.landlordId}`
        );
        building.reviews = landlord.reviews;
        console.log("new building with landlord:", building);
      }

      dispatch(setBuilding(building));
    } catch (error) {
      console.log("Error fetching building");
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

const initialState = {
  all: [],
  single: {},
  landlord: {},
  reviews: [],
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
