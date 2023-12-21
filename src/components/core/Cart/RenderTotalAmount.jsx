import React from "react";
import { useSelector } from "react-redux";
import Button from "../HomePage/Button";
const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these course:", courses);
    //TODO: API integrate -> payment gateway tak leke jaegi
  };
  return (
    <div className=" flex items-center  w-[40%] mx-auto justify-around ">
      <div className="flex flex-col gap-0 text-[24px]">
        <p className="text-sm">Total:</p>
        <p className="text-yellow-5">Rs. {total}</p>
      </div>

      <button className="w-[40%]">
        <Button
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses={"w-full justify-center"}
        >
          Check Out
        </Button>
      </button>
    </div>
  );
};

export default RenderTotalAmount;
