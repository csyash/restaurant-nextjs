import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import Link from "next/link";
import prisma from "@/utils/prismaConnect";

const getData2 = async () => {
  const data = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
  });

  const products = data.map((item) => ({
    id: item.id,
    title: item.title,
    desc: item.desc,
    img: item.img,
    price: Number(item.price),
    options: mapOptions(item.options),
  }));

  return products;
};

const mapOptions = (
  options: unknown
): { title: string; additionalPrice: number }[] => {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    if (
      typeof option === "object" &&
      option !== null &&
      "title" in option &&
      "additionalPrice" in option
    ) {
      return {
        title: option.title,
        additionalPrice: Number(option.additionalPrice),
      };
    } else {
      // Handle the case where option is not in the expected format
      // You can log a warning or take appropriate action
      return {
        title: "Unknown Title",
        additionalPrice: 0,
      };
    }
  });
};

const FeaturedProducts = async () => {
  const featuredProducts: ProductType[] = await getData2();
  return (
    <div className="w-screen overflow-x-scroll text-red-500 h-[80vh] no-scrollbar">
      {/* WRAPPER  */}
      <div className="w-max flex h-full">
        {/* SINGLE ITEM  */}
        {featuredProducts.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="w-screen flex  flex-col items-center justify-between h-full p-4 gap-8 hover:bg-fuchsia-50 md:w-[calc(100vw/2)] lg:w-[calc(100vw/3)] lg:gap-4"
            >
              {/* IMAGE CONTAINER  */}
              {product.img && (
                <div className="relative flex-1 w-full ">
                  <Image
                    fill
                    src={product.img}
                    alt="img"
                    className="object-contain"
                    sizes="100%"
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
                <button className="bg-red-500  text-white font-bold px-4 py-3 w-max rounded-lg uppercase lg:font-extrabold">
                  See product
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
