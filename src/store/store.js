import React, { createContext, useReducer } from "react";
import {
  GET_CITY,
  CHANGE_RESULT,
  GET_CITY_FAIL,
  CURRENT_CITY_INDEX,
} from "./constant";

const initialState = {
  cities: [],
  resultSearch: [],
  currentCityIndex: 0,
  error: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_CITY:
        return { ...state, city: action.value };
      case GET_CITY_FAIL:
        return { ...state, city: [], error: true };
      case CHANGE_RESULT:
        return { ...state, resultSearch: action.value };
      case CURRENT_CITY_INDEX:
        return { ...state, currentCityIndex: action.value };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
