import { useContext, useEffect, useState, useRef } from "react";
import WishlistContext from "../contexts/WishListContext";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import userService from "../services/user.service";
import { useRouter } from "next/router";

import {
  FilmOutline,
  Filter,
  GlobeAlt,
  GlobeOutline,
  HomeOutline,
  Menu,
  Moon,
  Newspaper,
  Puzzle,
  Search,
  TruckOutline,
  User,
} from "heroicons-react";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ForkLeft,
} from "@mui/icons-material";
import NavigationContext from "../contexts/NavigationContext";

const Navigation = ({ show }) => {
  let router = useRouter();
  const menuRef = useRef();
  const filterRef = useRef();

  const { filterModal, ToggleFilterModal, searchInput, setSearchInput } =
    useContext(NavigationContext);

  const { wishlist } = useContext(WishlistContext);
  const [showmenu, setshowMenu] = useState(false);
  const [openFilterModal, setOpenFilterModl] = useState(false);
  const [userData, setUserData] = useState();
  const [Login, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");

  const getUserData = async () => {
    let token = await localStorage.getItem("token");
    if (token) {
      let user = await userService.getMe(token);
      if (user.status == 200) {
        setUserData(user);
        setIsLogin(true);
      }
    }
  };

  const scrollLeft = () => {
    filterRef.current.scrollLeft -= 50;
  };

  const moveRight = () => {
    filterRef.current.scrollLeft += 50;
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const consoleValue = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = () => {
    setSearchInput(search);
  };

  // useEffect(() => {
  //   console.log(filterModal);
  // }, [filterModal]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showmenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setshowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showmenu]);

  // console.log(wishlist.length);

  const ToggleMenu = () => {
    setshowMenu((prev) => !prev);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-full flex  items-center flex-wrap sm:flex-nowrap  flex-col min-h-60 sticky top-0 z-10 ">
      <div className="w-full p-8 border-b-2 items-center bg-white text-black flex justify-between">
        <Link
          href={"/"}
          className="h-10 flex items-center flex-1 relative hover:cursor-pointer"
        >
          <Image
            alt="logo"
            className="object-contain object-left"
            layout="fill"
            src={Logo}
          />
        </Link>

        <div className="hidden sm:flex relative  w-[300px] h-[45px] border-2 border-gray-200 shadow-md flex-end rounded-full">
          <input
            className="focus:outline-none  w-10/12 h-full  p-2"
            type="text"
            onChange={(e) => consoleValue(e)}
          />
          <Search
            onClick={() => submitSearch()}
            className=" absolute cursor-pointer outline-none right-2  top-1 bg-red-400 rounded-full p-2 w-[28px]"
            color="white"
            size={30}
          />
        </div>

        <div className=" flex flex-1 h-full justify-around">
          <div className="min-w-[300px] flex  justify-evenly  items-center ">
            <p className="text-sm hidden cursor-pointer hover:shadow-md rounded-md p-3 md:block">
              Airbnb your home
            </p>
            <div className="flex items-center h-full">
              <GlobeOutline />
            </div>

            <div
              onClick={() => ToggleMenu()}
              className="flex relative hover:shadow-lg cursor-pointer w-[80px] rounded-full border pt-3 pb-3 justify-evenly shadow-md items-center"
            >
              <Menu size={20} />
              <User size={20} />
              {showmenu ? (
                <div
                  ref={menuRef}
                  className="flex flex-col shadow-md items-start p-3 absolute justify-evenly  z-50 min-h-[250px] rounded-lg w-[250px] bg-white right-2 top-[5vh] border-black boder-2"
                >
                  <div className="flex border-b-2 border-gray-300 w-full flex-col space-y-3 ">
                    {Login ? (
                      <Link className="hover:bg-gray-200" href="/profile">
                        My profile
                      </Link>
                    ) : (
                      <></>
                    )}

                    {Login ? (
                      <Link className="hover:bg-gray-200" href="/posts">
                        My Posts
                      </Link>
                    ) : (
                      <Link className=" hover:bg-gray-200" href="/login">
                        Login
                      </Link>
                    )}

                    {Login ? (
                      <p onClick={() => logout()} className="pb-2 hover:bg-gray-200">
                        Logout
                      </p>
                    ) : (
                      <Link className="pb-2 hover:bg-gray-200" href="/registration">
                        Sign Up
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col space-y-3">
                    <p className="hover:bg-gray-200">Airbnb your home</p>
                    <p className="hover:bg-gray-200">Host an experience</p>
                    <p className="hover:bg-gray-200">Help</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* <p>wishlist {wishlist.length}</p> */}

        {/* {show ? } */}
      </div>

      {show ? (
        <div className="relative p-3 hidden border-b-2 border-gray-200  bg-white sm:flex justify-evenly space-x-6  h-full  scrollbar-hide  w-full">
          <div
            onClick={() => scrollLeft()}
            className="flex items-center  h-full"
          >
            <button className="flex cursor-pointer items-center shadow-md p-3 rounded-xl">
              <ArrowCircleLeft size={10} />
            </button>
          </div>
          <div
            ref={filterRef}
            className="flex justify-evenly space-x-5 h-full overflow-x-scroll flex-nowrap  flex-initial w-11/12"
          >
            <div className="flex flex-col text-sm items-center  ">
              <HomeOutline size={23} color="#808080" />
              <p className="text-[10px] whitespace-nowrap">Beachfront</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <TruckOutline size={23} color="#808080" />
              <p className="text-[10px] whitespace-nowrap">Amazing Pools</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <FilmOutline size={23} color="#808080" />
              <p className="text-[10px]  whitespace-nowrap">Private Rooms</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Newspaper size={23} color="#808080" />
              <p className="flex whitespace-nowrap text-[10px]">Amazing News</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Moon size={23} color="#808080" />
              <p className="text-[10px]">Breakfasts</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <GlobeAlt size={23} color="#808080" />
              <p className="text-[10px]">Countryside</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <GlobeAlt size={23} color="#808080" />
              <p className="text-[10px]">Countryside</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Puzzle size={23} color="#808080" />
              <p className="text-[10px]">Camping</p>
            </div>
            <div className="flex text-sm flex-col items-center  ">
              <GlobeAlt size={23} color="#808080" />
              <p className="text-[10px]">Countryside</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <TruckOutline size={23} color="#808080" />
              <p className="text-[10px] whitespace-nowrap">Amazing Pools</p>
            </div>
            <div className="flex text-sm flex-col items-center  ">
              <Puzzle size={23} color="#808080" />
              <p className="text-[10px]">Camping</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Moon size={23} color="#808080" />
              <p className="text-[10px]">Breakfasts</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <TruckOutline size={23} color="#808080" />
              <p className="text-[10px] whitespace-nowrap">Amazing Pools</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Newspaper size={23} color="#808080" />
              <p className="flex whitespace-nowrap text-[10px]">Amazing News</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Newspaper size={23} color="#808080" />
              <p className="flex whitespace-nowrap text-[10px]">Amazing News</p>
            </div>
            <div className="flex flex-col text-sm items-center  ">
              <Moon size={23} color="#808080" />
              <p className="text-[10px]">Breakfasts</p>
            </div>
          </div>

          <div
            onClick={() => moveRight()}
            className="flex items-center  h-full"
          >
            <button className="flex cursor-pointer items-center shadow-md p-3 rounded-xl">
              <ArrowCircleRight size={10} />
            </button>
          </div>

          <div
            onClick={() => ToggleFilterModal()}
            className="flex items-center  h-full"
          >
            <button className="flex cursor-pointer items-center shadow-md p-3 rounded-xl">
              <Filter size={10} />
              filter
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navigation;
