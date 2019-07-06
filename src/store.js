import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  place: '',
  longitude: '',
  latitude: '',
  data: {},
};

const UPDATE_PLACE = 'UPDATE_PLACE';
const UPDATE_LONG_AND_LAT = 'UPDATE_LONGITUDE_AND_LATITUDE';

const updatePlace = (place, data) => {
  return {
    type: UPDATE_PLACE,
    place,
    data,
  };
};

const updateLongAndLat = (longAndLat, data, place) => {
  return {
    type: UPDATE_LONG_AND_LAT,
    longAndLat,
    data,
    place,
  };
};

//I AM AWARE THAT THE API KEY IS NOT SECURE.
// I WOULD MAKE A SECRETS FILE, AND PUT IT IN .GITIGNORE

export const getWeatherDataUsingPlace = place => async dispatch => {
  //logic to see if place or lat / long

  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=82125ad85789ea94811b6f431b5e0191`
  );

  dispatch(updatePlace(place, data.main));
};

export const getWeatherDataUsingLatandLong = longAndLat => async dispatch => {
  //logic to see if place or lat / long
  const { longitude, latitude } = longAndLat;
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=82125ad85789ea94811b6f431b5e0191`
  );
  dispatch(updateLongAndLat(longAndLat, data.main, data.name));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE:
      return {
        ...state,
        longitude: '',
        place: action.place,
        data: action.data,
      };
    case UPDATE_LONG_AND_LAT:
      return {
        ...state,
        place: action.place,
        longitude: action.longAndLat.longitude,
        latitude: action.longAndLat.latitude,
        data: action.data,
      };
    default:
      return state;
  }
};

const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
