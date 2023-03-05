import {createContext, useState, useEffect} from 'react';

const WishlistContext = createContext();

export default WishlistContext;

export const WishlistContextProvider = ({ children }) => {



  
  const [wishlist, setWishlist] = useState([]);

  const removePlaceWishlist = (id) => {
    // ....
  }
  const addPlaceWishlist = (place) => {
    console.log(place);
    setWishlist([...wishlist, place])
    // ...
  }

  const deleteWishlist = () => {
    setWishlist([])
  }

  const context = {
    removePlaceWishlist,
    addPlaceWishlist,
    deleteWishlist,
    wishlist
  }

  return (
  <WishlistContext.Provider value={context}>
    {children}
  </WishlistContext.Provider>
  )

}