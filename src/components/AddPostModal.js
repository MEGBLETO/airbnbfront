import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";

const AddPost = ({ userId, handleclick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [typeofPlaces, settypeOfPlaces] = useState();

  const onSubmit = async (data) => {
    try {
      let tobeposted = {
        title: data.title,
        types: data.types,
        owner: userId,
        images: data.imageurl,
        price: {
          pricePerDAy: 120,
        },
        capacity: data.capacity,
        description: data.description,
        Address: {
          city: data.city,
          street: data.street,
          zipCode: data.zipcode,
          gps: { lat: data.lat, long: data.long },
        },
      };

      const req = await axios.post("http://localhost:5000/place/createplace/", tobeposted)
      if(req){
        console.log(req)
      }
      handleclick()
      console.log(data);
    } catch (error) {
      console.log(error);
      //   setError(error.response.data.message)
      //   setMessageColor('#FF0000')
    }
  };

  const getAlltypeOfPlaces = async () => {
    const placestype = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/type-place/getypeofplaces`
    );
    settypeOfPlaces(placestype.data);
  };

  useEffect(() => {
    getAlltypeOfPlaces();

    if(typeofPlaces){
      console.log(typeofPlaces);
    }
  }, []);

  return (
    <div className=" flex min-h-[120vh] backdrop-blur-sm bg-white/30 z-10  w-full absolute items-center justify-center">
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
        <h1 className="text-2xl font-bold">Add a Post</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Title:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                name="Title"
                {...register("title")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Types:</label>
              <select
                className="p-2 border-2 border-black"
                type="selector"
                defaultValue=""
                name="types"
                {...register("types")}
              >
                <option value="">--Please choose an option--</option>
                {typeofPlaces?.map(item => {
                return  <option key={item._id} value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Images url:</label>
              <input
                className="p-2 border-2 border-black"
                type=""
                defaultValue=""
                name="imageurl"
                {...register("imageurl")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Price / Day:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="price"
                {...register("price")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Capacity:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue="test"
                name="capacity"
                {...register("capacity")}
              />
            </div>
          </div>

          <div>
            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Description:</label>
              <textarea
                className="p-2 border-2 border-black"
                type="text"
                rows="5"
                cols="33"
                defaultValue="description"
                name="description"
                {...register("description")}
              ></textarea>
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">City:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="city"
                {...register("city")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Street:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="street"
                {...register("street")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">Zipcode:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="zipcode"
                {...register("zipcode")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">lat:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="lat"
                {...register("lat")}
              />
            </div>

            <div className="flex w-full flex-col  p-2 justify-between">
              <label className="pr-2">long:</label>
              <input
                className="p-2 border-2 border-black"
                type="text"
                defaultValue=""
                name="long"
                {...register("long")}
              />
            </div>
          </div>
        </div>
        <Button type="submit" name="submit" />
      </form>
    </div>
  );
};

export default AddPost;
