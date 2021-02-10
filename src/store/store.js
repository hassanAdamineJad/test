import React, { createContext, useReducer } from "react";
import {
  GET_CITIES,
  CHANGE_RESULT,
  GET_CITIES_FAIL,
  GET_CITIES_SUCCESS,
  CURRENT_CITY_INDEX,
  GET_CURRENT_LOCATION,
  GET_CURRENT_LOCATION_FAIL,
  CHANGE_KEYWORD_SEARCH,
} from "./constant";

const initialState = {
  cities: [],
  loading: true,
  resultSearch: [],
  currentCityIndex: 0,
  error: false,
  currentLocation: { lat: 0, lng: 0 },
  currentLocationError: "",
  keyword: "",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_CITIES:
        return { ...state, loading: true };
      case GET_CITIES_SUCCESS:
        return { ...state, cities: action.value, error: false, loading: false };
      case GET_CITIES_FAIL:
        return { ...state, cities: [], error: true, loading: false };
      case CHANGE_RESULT:
        return { ...state, resultSearch: action.value };
      case CURRENT_CITY_INDEX:
        return { ...state, currentCityIndex: action.value };
      case GET_CURRENT_LOCATION:
        return {
          ...state,
          currentLocation: action.value,
          currentLocationError: "",
        };
      case GET_CURRENT_LOCATION_FAIL:
        return {
          ...state,
          currentLocationError: action.value,
        };
      case CHANGE_KEYWORD_SEARCH:
        return {
          ...state,
          keyword: action.value,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
