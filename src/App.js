import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { BaseUrl } from "./utils/config";
import Search from "./components/Search";
import Filters from "./components/Filters";
import Card from "./components/Card";

const initialState = {
  city: [],
};
function reducer(state, { field, value }) {
  return { ...state, [field]: value };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchCity("nl");
  }, []);

  const fetchCity = async (city, params = "_page=1&_limit=10") => {
    try {
      const result = await axios(`${BaseUrl}/${city}?${params}`);
      dispatch({ field: "city", value: result.data });
    } catch (e) {
      console.log("e");
    }
  };

  return (
    <div>
      <Search />
      <div>
        <Filters />
      </div>
      <div>
        <Card data={state.city} />
      </div>
    </div>
  );
};

export default App;
