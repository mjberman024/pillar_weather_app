import { createStore } from 'redux';

const initialState = {
  place: '',
  longitude: '',
  latitude: '',
};

const UPDATE_PLACE = 'UPDATE_PLACE';
const UPDATE_LONG_AND_LAT = 'UPDATE_LONGITUDE_AND_LATITUDE';

export const updatePlace = place => {
  return {
    type: UPDATE_PLACE,
    place,
  };
};

export const updateLongAndLat = longAndLat => {
  return {
    type: UPDATE_LONG_AND_LAT,
    payload: longAndLat,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE:
      return { ...state, place: action.place };
    case UPDATE_LONG_AND_LAT:
      return {
        ...state,
        place: '',
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
