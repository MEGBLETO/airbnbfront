import { useContext, useState } from "react";
import WishlistContext from "../contexts/WishListContext";
import Image from "next/image";
import sideimg from "../assets/sideimg.png";
import { HeartOutline } from "heroicons-react";
import { Heart } from "heroicons-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Postcard = ({ item }) => {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);

  const upDateLikes = () => {
    setClicked((prev) => !prev);
    addPlaceWishlist(item);
  };

  const { addPlaceWishlist } = useContext(WishlistContext);

  return (
    <Link
      href={`/product/${item._id}`}
      className="flex relative cursor-pointer flex-col w-[300px] min-h-[400px] rounded-lg shadow-md p-2"
    >
      {clicked ? (
        <Heart
          className="absolute top-3  right-3"
          onClick={() => upDateLikes()}
          color="black"
        />
      ) : (
        <HeartOutline
          className="absolute right-3 top-3"
          onClick={() => upDateLikes()}
          color="black"
        />
      )}
      <div className="flex-auto w-full h-3/6">
        <Image
          alt="logo"
          className="h-full rounded-md w-full object-cover"
          width="400"
          height="300"
          src={item.images[0]}
        />
      </div>
      <div className="flex flex-col q flex-auto p-2 w-full h-1/3 justify-between">
        <div className="flex justify-between">
          <h3 className="font-bold">{item.title}</h3>
          <h3 className="text-xs">4.8 (95)</h3>
        </div>
        <p className="text-xs p-2 text-gray-500">{item.description}</p>
      </div>
      <p className="flex justify-start pt-2">
        <span className="font-bold">{item.price.pricePerDAy} euroes / </span>{" "}
        <span className="text-gray-500"> night</span>
      </p>
    </Link>
  );
};

export default Postcard;
