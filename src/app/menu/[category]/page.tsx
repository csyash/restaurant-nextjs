import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/types";
import prisma from "@/utils/prismaConnect";

type props = {
  params: { category: string };
};

const getData2 = async (category: string) => {
  const data = await prisma.product.findMany({
    where: {
      catSlug: category,
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

const CategoryPage = async ({ params }: props) => {
  const pizzas: ProductType[] = await getData2(params.category);

  if (pizzas.length == 0)
    return (
      <h1 className="text-2xl text-center text-red-500 font-bold md:px-20 lg:px-40 py-4 uppercase">
        No {params.category}
      </h1>
    );
  return (
    <div className="text-red-500 flex flex-wrap  w-screen h-max">
      {pizzas.map((pizza) => (
        <Link
          href={`/product/${pizza.id}`}
          key={pizza.id}
          className="flex flex-col gap-4 w-full py-2 h-[60vh] lg:h-[400px] md:w-1/2 lg:w-1/3 border-red-500 border-2 border-collapse hover:bg-fuchsia-100"
        >
          <div className="relative h-full w-full">
            {pizza.img && (
              <Image
                alt={pizza.title}
                src={pizza.img}
                fill
                className="object-contain"
                sizes="100%"
              />
            )}
          </div>
          <div className="flex gap-4 justify-between items-center w-full px-8  uppercase text-xl">
            <h1 className="font-extrabold">{pizza.title}</h1>
            <span className="font-extrabold md:group-hover:hidden ease-in transition-all">
              ${pizza.price}
            </span>
            <button className="hidden font-semibold bg-red-500 text-white py-2 px-3 rounded-md md:w-1/2 lg:w-1/3 md:group-hover:block ease transition-all">
              Add to cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
