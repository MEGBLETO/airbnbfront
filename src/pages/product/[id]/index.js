import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "../../../components/Navigation";
import Map from "../../../components/Map";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Heart, Share, Star } from "heroicons-react";
import Image from "next/image";
import fakecomments from "../../../FakeData/fakecomments.json";
import { useForm } from "react-hook-form";

const index = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [product, setProductData] = useState();

  const onSubmit = async (data) => {
    try {
      const finalData = {
        placeId : product._id,
        owner: product.owner,
        startDate: data.checkinDate,
        endDate : data.checkoutDate,
        numberofGuest: data.numberofPeople,
        totalPrice: product.price.pricePerDAy,
        isPaid: true
      }

      await axios.post('http://localhost:5000/reservation/makereservations/', finalData).then((res=>{
        console.log(res, "successBoy")
      }))
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getProducData = async (productID) => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/place/singleplace/${productID}`
    );
    if (data != null || data != undefined) {
      setProductData(data.data[0]);
    }
  };

  useEffect(() => {
    let productID = router.query.id;
    if (router.query.id === undefined && sessionStorage.getItem("id") != null) {
      productID = sessionStorage.getItem("id");
    } else {
      sessionStorage.setItem("id", router.query.id);
    }
    getProducData(productID);
  }, []);

  return (
    <div className="min-h-screen bg-red">
      <Navigation show={false} />
      <div className="min-h-[400px]  w-full">
        {product ? (
          <div className="h-full w-full">
            <div className="flex flex-[100px] flex-col w-11/12 mx-auto h-full">
              <div className="flex justify-between">
                <div className="">
                  <h1 className="text-2xl font-bold capitalize pb-3">
                    {product.title}
                  </h1>
                  <p className="flex space-x-3">
                    <span className="flex text-sm ">
                      <Star size={20} /> 4.95.
                    </span>
                    <span className="border-b-5 pb-5 border-black text-black text-sm font-medium">
                      {Math.floor(Math.random() * 50)} commentaires
                    </span>
                    <p className="text-sm">
                      . {product.Address.street}, {product.Address.city}
                    </p>
                  </p>
                </div>

                <div className="flex items-center space-x-4 ">
                  <p className="flex space-x-2">
                    <Share className="" size={20} /> Partager
                  </p>
                  <p className="flex  space-x-4">
                    <Heart className="" size={20} /> Enregistrer
                  </p>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  alt="logo"
                  className="object-center object-cover"
                  fill={true}
                  src={product.images[0]}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="h-screen w-full">
          <div className="flex w-11/12 mx-auto h-full">
            <div className="relative p-8 flex-initial h-full w-3/4">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="none  flex-1 h-full">
              <form  onSubmit={handleSubmit(onSubmit)} className="flex  w-11/12 mx-auto  flex-col items-center justify-center space-y-5 sticky top-10 min-h-[500px]">
                <div className="flex flex-col w-full">
                  <div className="w-full p-3 flex justify-between items-center text-center">
                    <p className="text-xl font-bold">
                      {product?.price?.pricePerDAy} / night
                    </p>
                    <p className="font-bold">
                      {Math.floor(Math.random() * 50)} Reviews
                    </p>
                  </div>
                  <div className="flex">
                    <div className="w-full border-2 border-gray-300">
                      <p className="font-bold text-sm">CHECK_IN</p>
                      <input {...register("checkinDate")} className="p-3" type="date" />
                    </div>
                    <div className="w-full border-2 border-gray-300 ">
                      <p className="font-bold text-sm">CHECKOUT</p>
                      <input  {...register("checkoutDate")} className="w-full pt-3 pb-3" type="date" />
                    </div>
                  </div>

                  <div className="flex items-center w-full">
                    <input
                      className="w-full p-3 border-2 border-gray-300 "
                      {...register("numberofPeople")}
                      type="number"
                    />
                  </div>
                </div>

                <button type="submit" className="text-white p-3 bg-red-300 rounded-md w-full">
                  Reserve
                </button>
                <div>
                  <p>Show price breakdown</p>
                  <p>Airbnb service fee Show price breakdown € 19</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="min-h-[500px]  w-full ">
          <div className="w-11/12 grid-cols-1 p-10 place-items-center mx-auto grid sm:grid-cols-3 h-full ">
            {fakecomments.map((item) => {
              return (
                <div className="flex items-start space-y-5 flex-col w-[200px] min-h-[300px]">
                  <div className="flex">
                    <Image
                      alt="logo"
                      className="p-2 rounded-full"
                      width={50}
                      height={50}
                      objectFit="cover"
                      src={item.picture}
                    />
                    <div className="flex flex-col">
                      <h1 className="flex">{item.name}</h1>
                      <h1 className="text-sm text-gray-500">{item.date}</h1>
                    </div>
                  </div>
                  <div className="w-10/12">
                    <p className="text-sm text-gray-800">{item.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-10/12 mx-auto  border-b-2 border-gray mb-6"></div>

      <div className="min-h-screen flex flex-col  w-10/12 mx-auto justify-start items-start">
        <p className="font-bold text-xl pb-3">Where you’ll be</p>
        <div className="flex flex-row h-[500px] w-full">
          {product ? <Map coordinates={product.Address.gps} /> : <></>}
        </div>
        <div className="flex items-start p-2 w-full h-[100px]">
          <h1 className="font-bold capitalize">
            {product ? product.title : ""}
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
