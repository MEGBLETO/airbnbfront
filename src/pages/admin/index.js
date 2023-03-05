import { TrashIcon } from "@heroicons/react/24/solid";
import { CancelOutlined, CheckRounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import WithAuth from "../../HOC/WithAuth";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState("section-1");
  const [usersDetails, setUsersDetails] = useState(null);
  const [reservations, setReservations] = useState(null);

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
  };

  const handleDelete = (userId) => {
    setUsersDetails(usersDetails.filter((item) => item._id !== userId));
  };

  const getAllusers = () => {
    try {
      axios.get("http://localhost:5000/user/all").then((res) => {
        console.log(res.data);
        setUsersDetails(res.data);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAllReservationRequests = () => {
    try {
      axios
        .get("http://localhost:5000/reservation/getallreservations/")
        .then((res) => {
          console.log(res.data);
          setReservations(res.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedSection === "section-1") {
      getAllusers();
    } else {
      getAllReservationRequests();
    }
  }, [selectedSection]);

  return (
    <div>
      <Navigation />
      <div>
        <nav>
          <ul className="h-[10vh] space-x-5 flex items-center justify-center">
            <li className="cursor-pointer hover:text-red-400 pr-5 border-r-2 border-black">
              <a onClick={() => handleSectionClick("section-1")}>View Users</a>
            </li>
            <li className="cursor-pointer hover:text-red-400">
              <a onClick={() => handleSectionClick("section-2")}>
                Checkout Reservations
              </a>
            </li>
          </ul>
        </nav>
        {selectedSection === "section-1" && (
          <section className="min-h-screen w-full " id="section-1">
            <div className="h-full p-3 mx-auto  w-11/12">
              {usersDetails?.map((detail) => {
                return (
                  <div className="flex justify-between space-y-2 m-2 border-2 border-gray-200 p-3">
                    <div>
                      <p>{detail.firstName}</p>
                      <p>{detail.lastName}</p>
                      <p>{detail.email}</p>
                    </div>
                    <div className="flex items-center">
                      <TrashIcon
                        onClick={() => handleDelete(detail._id)}
                        className="w-5 text-red-800"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {selectedSection === "section-2" && (
          <section className=" h-screen " id="section-2">
            {reservations?.map((reservation) => {
              return (
                <div className="flex justify-between space-y-2 m-2 border-2 border-gray-200 p-3">
                  <div className="space-y-2">
                    <div className="flex">
                      <label className="text-red-300">Reservation ID: </label>
                      <p>{reservation._id}</p>
                    </div>
                    <div className="flex">
                      <label className="text-red-300">NumberofGuest: </label>
                      <p>{reservation.numberofGuest}</p>
                    </div>
                    <div className="flex">
                      <label className="text-red-300">StartDate: </label>
                      <p>{reservation.startDate}</p>
                    </div>

                    <div className="flex">
                      <label className="text-red-300">EndDate: </label>
                      <p>{reservation.endDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around items-center">
                    <CheckRounded
                      onClick={() => handleDelete(reservation._id)}
                      className="w-5 text-green-800 hover:cursor-pointer"
                    />
                      <CancelOutlined
                      onClick={() => handleDelete(reservation._id)}
                      className="w-5 text-red-800 hover:cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default WithAuth(Index);
