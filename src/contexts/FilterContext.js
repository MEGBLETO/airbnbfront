import React, { createContext, useState, useEffect } from "react";
const FilterContext = createContext();

export default FilterContext;

export const FilterContextProvider = ({ children }) => {
  const [filterParams, setFilterParams] = useState();

  const fetchPostData = async () => {
    const res = await axios.get("http://localhost:5000/place/getallplaces/");
       return posts = await res.data;
  };

  const context = {
    filterParams,
    setFilterParams,
    fetchPostData
  };

  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};
