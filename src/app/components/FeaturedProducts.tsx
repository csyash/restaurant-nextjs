import React from "react";
import Image from "next/image";
import { featuredProducts } from "../data";

const FeaturedProducts = () => {
  return (
    <div className="w-screen overflow-x-scroll text-red-500 h-[80vh] no-scrollbar">
      {/* WRAPPER  */}
      <div className="w-max flex h-full">
        {/* SINGLE ITEM  */}
        {featuredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="w-screen flex group flex-col items-center justify-between h-full p-4 gap-8 hover:bg-fuchsia-50 md:w-[calc(100vw/2)] lg:w-[calc(100vw/3)] lg:gap-4"
            >
              {/* IMAGE CONTAINER  */}
              {product.img && (
                <div className="relative flex-1 w-full group-hover:rotate-[30deg] ease-in transition-all ">
                  <Image
                    fill
                    src={product.img}
                    alt="img"
                    className="object-contain"
                  />
                </div>
              )}
              {/* TEXT CONTAINER  */}
              <div className="flex flex-col items-center px-2 justify-around gap-4 text-center flex-1 lg:px-6 ">
                <h1 className="text-lg font-extrabold uppercase lg:text-2xl">
                  {product.title}
                </h1>
                <p className="text-base lg:text-md">{product.desc}</p>
                <span className="font-bold text-2xl lg:text-3xl">
                  ${product.price}
                </span>
                <button className="bg-red-500 text-white font-bold px-4 py-3 w-max rounded-lg uppercase lg:font-extrabold">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
