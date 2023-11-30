import React from "react";

const Notification = () => {
  return (
    <div className="font-semibold bg-red-500 text-white h-12 w-full flex items-center justify-center text-center px-4">
      Free orders above $50 Order Now
      <div className=" hidden md:block bg-yellow-500 font-semibold text-white text-sm p-2 rounded-lg md:absolute md:right-4 lg:right-8">
        +91 6261527118
      </div>
    </div>
  );
};

export default Notification;
