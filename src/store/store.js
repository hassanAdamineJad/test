import React, { createContext, useReducer } from "react";
import { GET_CITY, CHANGE_RESULT, GET_CITY_FAIL } from "./constant";

const initialState = {
  city: [],
  resultSearch: [],
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
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
