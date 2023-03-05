import Head from "next/head";
import Image from "next/image";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import services from "../../services/index";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Error from "../../components/Error";
import Navigation from "../../components/Navigation";

export default function Index() {
  const [error, setError] = useState("");
  const [messageColor, setMessageColor] = useState("");

  let router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await services.login(data);
      console.log(res);
      if (res.status = 200) {
        console.log(res.status)
        localStorage.setItem("token", res.data.token);
        router.push("/profile")
      } 
      // else{
      //   localStorage.removeItem('token')
      //   router.push('/login')
      // }
    } catch (error) {
      setError(error.response.data.message);
      setMessageColor("#FF0000");
      localStorage.removeItem('token')
      router.push("/login");
      throw error;
    }
  };

  return (
    <div className="w-full">
      <Navigation />
      <div className="h-screen relative w-full flex flex-col items-center justify-center shadow-lg">
        <div className="flex items-center justify-center w-5/6">
          <h1 className="font-bold text-xl p-2 border-b-2 border-black">
            Login
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row  w-4/12 h-2/3 mx-auto items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1  h-full flex-col items-center justify-evenly"
          >
            {error ? (
              <Error message={error} color={messageColor}></Error>
            ) : (
              <></>
            )}
            <Input
              type="text"
              label="Email"
              placeholder="@yahoo.fr"
              register={register}
              name="email"
            />
            <Input
              type="password"
              label="Password"
              placeholder="......"
              register={register}
              name="password"
            />
            <Button type="submit" name="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
