import Head from "next/head";
import Image from "next/image";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import services from "../../services/index";
import Navigation from "../../components/Navigation";

export default function Index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await services.registeruser(data);
      if (res.status = 200) {
        alert("Success");
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center  bg-white">
          <h1 className="font-bold text-xl p-2 border-b-2 border-black">
            Registration
          </h1>
        </div>
        <div className="flex items-center h-4/6  justify-center w-7/12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 w-3/6 h-full flex-col items-center justify-evenly"
          >
            <Input
              type="text"
              label="Firstname"
              placeholder="firstname"
              register={register}
              name="firstName"
            />
            <Input
              type="text"
              label="Lastname"
              placeholder="lastname"
              register={register}
              {...register("lastName")}
              name="lastName"
            />
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
            <Button className="" type="submit" name="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
