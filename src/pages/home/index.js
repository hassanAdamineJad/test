import React, { useEffect, useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT, GET_CITY, GET_CITY_FAIL } from "../../store/constant";
// API
import axios from "axios";
import { BaseUrl } from "../../utils/config";
// CMP
import { Search, Card, Filters } from "../../components";

const Home = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  useEffect(() => {
    fetchCity("nl");
  }, []);

  const fetchCity = async (city, params = "m") => {
    try {
      const result = await axios(`${BaseUrl}/${city}?${params}`);
      dispatch({ type: GET_CITY, value: result.data });
      dispatch({ type: CHANGE_RESULT, value: result.data });
    } catch (e) {
      console.log("e");
      dispatch({ type: GET_CITY_FAIL, value: e });
    }
  };

  return (
    <>
      <Search />
      <div>
        <Filters />
      </div>
      <div>
        <Card data={state.resultSearch} />
      </div>
    </>
  );
};

export default Home;
