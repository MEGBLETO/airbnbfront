import { AddCircleOutline } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddPost from "../../components/AddPostModal";
import EditPostModal from "../../components/EditPostModal";
import Navigation from "../../components/Navigation";
import Userpost from "../../components/Userpost";
import userService from "../../services/user.service";

const Index = () => {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState(null);
  const [myposts, setMyPosts] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState();

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  const handleCliEditModal = (postId) => {
    setCurrentPost(postId);
    setshowEditModal((prev) => !prev);
  };

  const handleDelete = (postId) => {
    setMyPosts(myposts.filter((item) => item._id !== postId));
  };

  const getUserData = async () => {
    let token = await localStorage.getItem("token");
    if (token) {
      let user = await userService.getMe(token);
      if (user.data._id) {
        setUserId(user.data._id);
        getuserPosts(user.data._id);
      }
    }
  };

  const getuserPosts = async (uid) => {
    const posts = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/place/myplace/${uid}`
    );
    setMyPosts(posts.data);
  };

  useEffect(() => {
    getUserData();
  }, []);


  // useEffect(()=>{

  // }.[])

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="min-h-screen w-full">
        {showModal ? (
          <AddPost userId={userId} handleclick={handleClick} />
        ) : (
          <></>
        )}
        {showEditModal ? (
          <EditPostModal
            currentPost={currentPost}
            setUserData={setUserData}
            userId={userId}
            handleCliEditModal={handleCliEditModal}
          />
        ) : (
          <></>
        )}

        <div className="w-full flex flex-col pb-4">
          <button
            onClick={() => handleClick()}
            className="flex bg-gray-300 hover:bg-red-300 flex-col items-center"
          >
            {" "}
            <AddCircleOutline className="w-[10px]" />
            Add a post
          </button>
        </div>
        <div className="w-11/12  mx-auto grid grid-cols-2 gap-8 min-h-screen place-items-center	 justify-center  pt-10 ">
          {myposts?.map((post) => {
            return (
              <Userpost
                userData={userData}
                key={post._id}
                handleCliEditModal={handleCliEditModal}
                handleDelete={handleDelete}
                post={post}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
