import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <div className="h-[60vh] w-screen flex flex-col bg-[url('/offerBg.png')] bg-cover p-4 md:flex-row md:px-6 lg:h-[65vh]">
      {/* LEFT CONTAINER */}
      <div className="flex-1 flex flex-col h-full text-white items-center justify-center gap-4 md:gap-6 lg:gap-8">
        <h1 className="text-2xl font-bold md:text-3xl text-center">
          Delicious Burger & French Fry
        </h1>
        <p className="text-base text-center md:text-lg">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <div className="text-3xl font-extrabold text-yellow-300">
          <CountDown />
        </div>
        <button className="font-bold text-xl bg-red-500 px-3 py-2 rounded-md md:px-6 md:py-3">
          Order now
        </button>
      </div>
      {/* RIGHT CONTAINER */}
      <div className="relative flex-1 h-full">
        <Image
          src="/offerProduct.png"
          alt="Burger pic"
          fill
          className="object-contain"
          sizes="100%"
        />
      </div>
    </div>
  );
};

export default Offer;
