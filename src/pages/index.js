import React, { useState, useContext, useEffect } from "react";
import Navigation from "../components/Navigation";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import axios from "axios";
import Footer from "../components/Footer";
import NavigationContext from "../contexts/NavigationContext";
import FilteringModal from "../components/FilteringModal";
import FilterContext from "../contexts/FilterContext";

const Index = () => {
  const { filterModal, ToggleFilterModal, filterData, setFilterData, searchInput } =
    useContext(NavigationContext);
  const { filterParams, setFilterParams } = useContext(FilterContext);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await axios.get("http://localhost:5000/place/getallplaces/");
    const data = await res.data;
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);



  const getPostsBasedOnSearch = async() =>{
   try {
    const res = await axios.get(`http://localhost:5000/place/getallplaces/?description=${searchInput}`);
    const data = await res.data;
    setPosts(data);
   } catch (error) {
     console.log(error)
   }
  }



  useEffect(()=> {
      getPostsBasedOnSearch()
  },[searchInput])

  const getFilteredPosts = async () => {
    if (filterParams.searchBy === "capacity") {
      const res = await axios.get(
        `http://localhost:5000/place/getallplaces/?searchBy=capacity&min=${filterParams.minCapacity}&max=${filterParams.maxCapacity}`
      );
      const data = await res.data;
      console.log(data, "capacity");
      setPosts(data);
    } else {
      const res = await axios.get(
        `http://localhost:5000/place/getallplaces/?searchBy=price&min=${filterParams.minAmount}&max=${filterParams.maxAmount}`
      );
      const data = await res.data;
      console.log(data, "price");
      setPosts(data);
    }
  };

  useEffect(() => {
    console.log(filterParams, "test here");
    if (filterParams) {
      getFilteredPosts();
    }
  }, [filterParams]);

  // useEffect(()=>{
  //   console.log(filterParams)
  // },[filterModal])

  return (
    <div className="min-h-screen w-full ">
      <Navigation show={true} />
      <div className="min-h-screen w-full pb-10">
        {filterModal ? <FilteringModal /> : null}
        <div className="w-11/12 mx-auto">
          <div className="flex-auto p-5 w-full items-center grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
            {posts.map((item) => {
              return <Postcard key={item._id} item={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticProps() {

//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default Index;
