import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Globe } from "heroicons-react";
import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full flex-col min-h-[400px] text-sm bg-gray-100">
      <div className="flex relative pb-5 items-center flex-1 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-4  h-full w-10/12 mx-auto ">
          <div className="flex  flex-col text-gray-500 space-y-3 items-start">
            <p className="font-bold">Support</p>
            <p>Help Center</p>

            <p>AirCover</p>

            <p>Supporting people with disabilities</p>

            <p>Cancellation options</p>

            <p>Our COVID-19 Response</p>

            <p>Report a neighborhood concern</p>
          </div>

          <div className="flex space-y-3 text-gray-500 flex-col items-start">
            <p className="font-bold">Support</p>
            <p>Community</p>

            <p>AirCover</p>
          </div>

          <div className="flex  space-y-3 text-gray-500 flex-col items-start">
            <p className="font-bold">Hosting</p>
            <p>Help Center</p>

            <p>AirCover</p>

            <p>Supporting people with disabilities</p>

            <p>Cancellation options</p>

            <p>Our COVID-19 Response</p>

            <p>Report a neighborhood concern</p>
          </div>

          <div className="flex space-y-3 text-gray-500 flex-col items-start">
            <p className="font-bold">Airbnb</p>
            <p>Help Center</p>

            <p>AirCover</p>

            <p>Supporting people with disabilities</p>

            <p>Cancellation options</p>

            <p>Our COVID-19 Response</p>

            <p>Report a neighborhood concern</p>
          </div>
        </div>
      </div>

      <div className="flex text-gray-500 flex-initial  p-5 border-t-2 sm:flex-row">
        <div className="flex flex-col space-x-3 flex-1 sm:flex-row">
          <p>&copy;2023 Airbnb, Inc.</p>
          <p>. Terms</p>
          <p>. Sitemap</p>
          <p>. Privacy</p>
          <p>. YourPrivacyChoices</p>
        </div>
        <div className=" flex flex-1 justify-evenly">
          <p className="flex">
            <Globe />
            <span className="pl-2">English(US)</span>
          </p>
          <div className="flex space-x-2 text-black">
            <Facebook className="cursor-pointer" size={20} />
            <Twitter className="cursor-pointer" size={20} />
            <Instagram className="cursor-pointer" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
