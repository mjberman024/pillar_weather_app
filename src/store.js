import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  place: '',
  longitude: '',
  latitude: '',
  data: {},
};

const UPDATE_PLACE = 'UPDATE_PLACE';
const UPDATE_LONG_AND_LAT = 'UPDATE_LONGITUDE_AND_LATITUDE';
const UPDATE_ZIP = 'UPDATE_ZIP';

const updatePlace = (place, data, longAndLat) => {
  return {
    type: UPDATE_PLACE,
    place,
    data,
    longAndLat,
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

const updateZip = (zip, data, longAndLat, place) => {
  return {
    type: UPDATE_ZIP,
    zip,
    data,
    longAndLat,
    place,
  };
};

//I AM AWARE THAT THE API KEY IS NOT SECURE.
// I WOULD MAKE A SECRETS FILE, AND PUT IT IN .GITIGNORE

export const getWeatherDataUsingPlace = place => async dispatch => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=82125ad85789ea94811b6f431b5e0191`
  );
  dispatch(updatePlace(place, data.main, data.coord));
};

export const getWeatherDataUsingLatandLong = longAndLat => async dispatch => {
  const { latitude, longitude } = longAndLat;
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=82125ad85789ea94811b6f431b5e0191`
  );
  dispatch(updateLongAndLat(longAndLat, data.main, data.name));
};

export const getWeatherDataUsingZip = zip => async dispatch => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?zip=${
      zip.zip
    },us&APPID=82125ad85789ea94811b6f431b5e0191`
  );

  dispatch(updateZip(zip, data.main, data.coord, data.name));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE:
      return {
        ...state,
        longitude: action.longAndLat.lon,
        latitude: action.longAndLat.lat,
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
    case UPDATE_ZIP:
      return {
        ...state,
        longitude: action.longAndLat.lon,
        latitude: action.longAndLat.lat,
        place: action.place,
        data: action.data,
      };
    default:
      return state;
  }
};

const middlewares = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
