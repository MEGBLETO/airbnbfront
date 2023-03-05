import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";

const Modal = ({ handleclick, userData, setUserData}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getUserToken = async () => {
    let token = await localStorage.getItem("token");
    return token;
  };

  const onSubmit = async (data) => {
    console.log(data);
    let token = await getUserToken();
    try {
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, data, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }).then(res=>{
        console.log(res)
        setUserData(res.data)
      })
    } catch (error) {
      console.log(error);
      //   setError(error.response.data.message)
      //   setMessageColor('#FF0000')
    }
  };

  return (
    <div className=" flex h-screen backdrop-blur-sm bg-white/30 z-10  w-full absolute items-center justify-center">
      <div
        onClick={() => handleclick()}
        className="flex justify-center  absolute text-2xl p-4 cursor-pointer bg-red-500 top-3 right-3 items-center"
      >
        x
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/6 h-1/2 justify-evenly items-center"
      >
        <h1 className="text-2xl font-bold">Modifier Mon profil</h1>
        <div className="flex w-full flex-col  p-2 justify-between">
          <label className="pr-2">Name:</label>
          <input
            className="p-2 border-2 border-black"
            type="text"
            defaultValue={userData.data.lastName}
            name="firstName"
            {...register("firstName")}
          />
        </div>

        <div className="flex w-full flex-col  p-2 justify-between">
          <label className="pr-2">FirstName:</label>
          <input
            className="p-2 border-2 border-black"
            type="text"
            defaultValue={userData.data.firstName}
            name="lastName"
            {...register("lastName")}
          />
        </div>

        <div className="flex w-full flex-col  p-2 justify-between">
          <label className="pr-2">Email:</label>
          <input
            className="p-2 border-2 border-black"
            type="text"
            defaultValue={userData.data.email}
            name="email"
            {...register("email")}
          />
        </div>

        <Button type="submit" name="update" />
      </form>
    </div>
  );
};

export default Modal;
