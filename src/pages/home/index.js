import React, { useEffect, useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT, GET_CITY, GET_CITY_FAIL } from "../../store/constant";
// API
import axios from "axios";
import { BaseUrl } from "../../utils/config";
// CMP
import { Search, Card, Filters } from "../../components";
//Helper
import { onlyUniqueArray } from "../../utils/helper";

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

  const handleSearch = (e) => {
    const keyword = e.target.value;
    dispatch({
      type: CHANGE_RESULT,
      value: searchArrayWithKeyAndKeyword(state.city, "city", keyword)
        .concat(searchArrayWithKeyAndKeyword(state.city, "admin_name", keyword))
        .filter(onlyUniqueArray),
    });
  };
  const searchArrayWithKeyAndKeyword = (array, key, keyword) => {
    return array.filter(
      (item) =>
        String(item[key]).toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
  };
  const handleSort = (list, field, type) => {
    let newList;
    if (type === "asc") {
      newList = list.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      newList = list.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    }
    return dispatch({ type: CHANGE_RESULT, value: newList });
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div>
        <Filters
          handleSort={(field, type) =>
            handleSort(state.resultSearch, field, type)
          }
        />
      </div>
      <div>
        <Card data={state.resultSearch} />
      </div>
    </>
  );
};

export default Home;
