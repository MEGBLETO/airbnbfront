import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import NavigationContext from "../contexts/NavigationContext";
import FilterContext from "../contexts/FilterContext";

const FilteringModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedValue, setSelectedValue] = useState("");
  const { filterParams, setFilterParams } = useContext(FilterContext);
  const { filterModal, ToggleFilterModal, filterData, setFilterData } =
    useContext(NavigationContext);

  const onSubmit = async (data) => {
    try {
      setFilterParams(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getValue = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className=" flex min-h-[150vh] backdrop-blur-sm bg-white/30 z-10  w-full absolute  justify-center">
      <div
        onClick={() => ToggleFilterModal()}
        className="flex justify-center  absolute text-2xl p-4 cursor-pointer bg-red-500 top-3 right-3 items-center"
      >
        x
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col w-3/6 h-[400px] justify-evenly items-center"
      >
        <h1 className="text-2xl font-bold pb-3">Filter Posts</h1>

        <div className=" flex items-center bg-white flex-col h-full w-full">
          <fieldset className="flex  space-x-8 w-5/12  h-[80px] items-center justify-evenly">
            <div className="flex whitespace-nowrap space-x-2 w-full">
              <label className="flex text-sm flex-col font-bold">
                By Capacity
              </label>
              <input
                type="radio"
                onClick={(e) => getValue(e)}
                name="choice"
                value="capacity"
                {...register("searchBy")}
              />
            </div>
            <div className="flex  whitespace-nowrap	 wrap space-x-2">
              <label className="text-sm font-bold">By Price</label>
              <input
                onClick={(e) => getValue(e)}
                type="radio"
                name="choice"
                value="price"
                {...register("searchBy")}
              />
            </div>
          </fieldset>

          {selectedValue === "price" ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex w-1/2 flex-col  p-2 justify-between">
                <label className="pr-2 font-bold">MinAmount:</label>
                <input
                  className="p-2 border-2 border-black"
                  type="number"
                  name="minAmount"
                  {...register("minAmount")}
                />
              </div>
              <div className="flex w-1/2 flex-col  p-2 justify-between">
                <label className="pr-2 font-bold">MaxAmount:</label>
                <input
                  className="p-2 border-2 border-black"
                  type="number"
                  name="maxAmount"
                  {...register("maxAmount")}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="flex w-1/2 flex-col  p-2 justify-between">
                <label className="pr-2 font-bold">MinCapacity:</label>
                <input
                  className="p-2 border-2 border-black"
                  type="number"
                  name="minCapacity"
                  {...register("minCapacity")}
                />
              </div>
              <div className="flex w-1/2 flex-col  p-2 justify-between">
                <label className="pr-2 font-bold">MaxCapacity:</label>
                <input
                  className="p-2 border-2 border-black"
                  type="number"
                  name="maxCapacity"
                  {...register("maxCapacity")}
                />
              </div>
            </div>
          )}
        </div>
        <Button type="submit" name="Filter" />
      </form>
    </div>
  );
};

export default FilteringModal;
