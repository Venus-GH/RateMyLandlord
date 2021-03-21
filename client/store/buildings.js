import axios from "axios";

const SET_BUILDING = "SET_BUILDING";

const setBuilding = (building) => ({
  type: SET_BUILDING,
  building,
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

const initialState = {
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
    default:
      return state;
  }
}
