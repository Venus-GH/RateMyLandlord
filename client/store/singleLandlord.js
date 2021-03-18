import axios from 'axios'

//ACTION TYPES
const SET_SINGLE_LANDLORD = 'SET_SINGLE_LANDLORD'

//ACTION CREATORS
export const setSingleLandlord = landlord => {
  return {
    type: SET_SINGLE_LANDLORD,
    landlord
  }
}

//THUNKS
export const fetchSingleLandlord = id => {
  return async dispatch => {
    try {
      const {data: landlord} = await axios.get(`/api/landlords/${id}`)
      dispatch(setSingleLandlord(landlord))
    } catch (error) {
      console.log('Error fetching single landlord!', error)
    }
  }
}

//INITIAL STATE
const initialState = {
  selected: {}
}

//REDUCER
export default function singleLandlordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_LANDLORD:
      return {
        ...state,
        selected: action.landlord
      }
    default:
      return state
  }
}
