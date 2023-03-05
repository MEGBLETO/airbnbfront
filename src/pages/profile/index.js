import Head from "next/head";
import Image from "next/image";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import services from "../../services/index";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navigation from "../../components/Navigation";
import userService from "../../services/user.service";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../components/UpdateprofileModal";
import WithAuth from "../../HOC/WithAuth";

const Index = () => {
  const [userData, setUserData] = useState();
  const [showModal, setShowModal] = useState(false);

  const getUserData = async () => {
    let token = await localStorage.getItem("token");
    if (token) {
      let user = await userService.getMe(token);
      setUserData(user);
    }
  };

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  return (
    <div>
      <Navigation />
      <div className="h-screen relative top-20 w-full bg-white-600 flex flex-col items-center justify-center">
        {showModal ? (
          <Modal
            handleclick={handleClick}
            userData={userData}
            setUserData={setUserData}
          />
        ) : (
          <></>
        )}

        <div className="flex relative flex-col items-center h-2/3 w-1/2 shadow-lg shadow-black-500/50">
          <div className="flex flex-col p-5 items-center justify-center border-b-2 border-black shadow-md">
            <UserIcon className="h-4 w-4 text-black" />
            <h1 className="font-bold">Profile</h1>
          </div>

          <div className=" flex flex-1  w-full items-center justify-center ">
            {userData ? (
              <div className="flex flex-col justify-evenly space-y-4">
                <div className="flex border-b-2 border-gray-300 flex-col p-2 justify-between">
                  <label className="pr-2 text-red-400">Name</label>
                  <p className="uppercase">{userData.data.lastName}</p>
                </div>

                <div className="flex border-b-2 border-gray-300  flex-col p-2 justify-between">
                  <label className="pr-2 text-red-400">FirstName</label>
                  <p className="uppercase">{userData.data.firstName}</p>
                </div>

                <div className="flex border-b-2 border-gray-300  flex-col p-2 justify-between">
                  <label className="pr-2 text-red-400">Email</label>
                  <p className="">{userData.data.email}</p>
                </div>
                <button
                  className="bg-red-300 cursor-pointer p-4 rounded-md hover:bg-red-400"
                  onClick={() => handleClick()}
                >
                 <p className="text-black"> Update Profile</p>
                </button>
               
              </div>
            ) : (
              <>
                <h1>Loading user Data</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Index);
