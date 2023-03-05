import { createContext, useState, useEffect } from "react";
const NavigationContext = createContext();

export default NavigationContext;
export const NavigationContextProvider = ({ children }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [searchInput, setSearchInput] = useState('')

  const ToggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  const context = {
    ToggleFilterModal,
    filterModal,
    filterData,
    setFilterData,
    searchInput,
    setSearchInput
  };
  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};
