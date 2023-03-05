import "../styles/globals.css";
import { WishlistContextProvider } from "../contexts/WishListContext";
import { NavigationContextProvider } from "../contexts/NavigationContext";
import { FilterContextProvider } from "../contexts/FilterContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <FilterContextProvider>
        <NavigationContextProvider>
          <WishlistContextProvider>
            <Component {...pageProps} />
          </WishlistContextProvider>
        </NavigationContextProvider>
      </FilterContextProvider>
    </>
  );
}

export default MyApp;
