import { Delete, TaskAltOutlined, TrendingDown } from "@mui/icons-material";
import { PencilOutline } from "heroicons-react";
import Image from "next/image";
import React from "react";

const Userpost = ({ userData, post , handleDelete, handleCliEditModal }) => {
  return (
    <div className="relative shadow-md boder-1 border-gray-300 bg-white w-2/3 h-[400px]">
      <TrendingDown className="absolute cursor-pointer -top-3 right-20 text-orange-500"  size={20}/>
      <PencilOutline onClick={() => handleCliEditModal(post)} size={20} className="absolute cursor-pointer -top-3 right-10 text-green-300" size={20} />
      <Delete onClick={()=> handleDelete(post._id)}  className="absolute cursor-pointer -top-3 right-0 text-red-700"  size={20} />
      <div>
        <div className="p-3">
        <Image
          className="h-full rounded-md w-full object-cover"
          alt="logo"
          width="400"
          height="300"
          src={post.images[0]}
        />
        </div>
          <p>{post.title}</p>
          <p>{post.description}</p>
          <p>{post.price.pricePerDAy}</p>
      </div>
    </div>
  );
};

export default Userpost;
