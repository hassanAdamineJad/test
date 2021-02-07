import React from "react";
const Search = ({ onSearch }) => {
  return <input onChange={onSearch} name="search" />;
};
export default Search;
