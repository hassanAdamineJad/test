import React, { useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT, GET_CITY, GET_CITY_FAIL } from "../../store/constant";
//Helper
import { onlyUniqueArray } from "../../utils/helper";

export default function Search() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

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

  return <input onChange={handleSearch} name="search" />;
}
