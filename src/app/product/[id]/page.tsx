"use client";
import Image from "next/image";
import React, { useState } from "react";
import { singleProduct } from "@/app/data";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [optionIdx, setOptionIdx] = useState(0);

  const isOptionSelected = (index: number) => index === optionIdx;
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-6rem-3rem)] p-4 lg:px-20 xl:px-40 text-red-500 md:py-8 md:flex-row md:gap-10">
      {/* IMG CONTAINER */}
      <div className="top relative flex-1">
        {singleProduct.img && (
          <Image
            src={singleProduct.img}
            fill
            alt={singleProduct.title}
            className="object-contain hover:rotate-[30deg] transition-all ease-out"
          />
        )}
      </div>
      <div className="bottom w-full flex flex-col gap-4 pper flex-1 px-2 md:gap-10 md:justify-start md:py-8">
        <h1 className="text-2xl font-extrabold uppercase md:text-3xl">
          {singleProduct.title}
        </h1>
        <p className="text-red-600 text-lg md:text-xl">{singleProduct.desc}</p>
        {singleProduct.options && (
          <span className="text-2xl font-extrabold">
            $
            {(
              (singleProduct.price +
                singleProduct.options[optionIdx].additionalPrice) *
              quantity
            ).toFixed(2)}
          </span>
        )}
        <div className="flex gap-4 buttons-container">
          {singleProduct.options &&
            singleProduct.options.map((option, index) => {
              return (
                <button
                  key={option.title}
                  className={`px-4 py-2 font-bold border-red-500 border-2 rounded-md hover:text-white hover:bg-red-500 ${
                    isOptionSelected(index) ? "bg-red-500 text-white" : ""
                  }`}
                  onClick={(e) => setOptionIdx(index)}
                >
                  {option.title}
                </button>
              );
            })}
        </div>
        <div className="flex items-center text-black w-[90%] border-[1.5px] border-red-500 h-[50px]">
          <div className="flex flex-[3] items-center justify-between px-3">
            <span>Quantity</span>
            <div className="flex items-center justify-evenly gap-4 text-xl">
              <span
                onClick={(e) =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
                className="cursor-pointer"
              >
                &lt;
              </span>
              <span>{quantity}</span>
              <span
                className="cursor-pointer"
                onClick={(e) =>
                  setQuantity((prev) => (prev === 10 ? 10 : prev + 1))
                }
              >
                &gt;
              </span>
            </div>
          </div>
          <button className="px-3 py-2 flex-1 font-bold h-full bg-red-500 text-white uppercase">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
