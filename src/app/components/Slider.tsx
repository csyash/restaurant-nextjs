"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.png",
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-col w-screen h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] md:flex-row">
      {/* Text Container  */}
      <div className="h-1/2 flex flex-col item-center text-center justify-center gap-20 bg-fuchsia-50 uppercase flex-1 md:h-full">
        <div>
          <h1 className=" text-4xl md:text-5xl font-bold tex text-red-500 lg:text-7xl">
            {data[index].title}
          </h1>
        </div>
        <Link href={"/menu"}>
          <button className="text-xl md:text-2xl bg-red-500 p-4 w-40 font-bold text-white self-center rounded-lg">
            Order now
          </button>
        </Link>
      </div>
      {/* IMG Container  */}
      <div className="relative h-1/2 flex-1 md:h-full">
        <Image
          src={data[index].image}
          fill
          alt="slider img"
          className="object-cover"
          sizes="100%"
        />
      </div>
    </div>
  );
};

export default Slider;
