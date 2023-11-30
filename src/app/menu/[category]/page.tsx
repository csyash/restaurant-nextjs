import React from "react";
import { pizzas } from "@/app/data";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className="text-red-500 flex flex-wrap  w-screen h-max">
      {pizzas.map((pizza) => (
        <Link
          href={`/product/${pizza.id}`}
          className="flex flex-col gap-4 w-full py-2 h-[60vh] lg:h-[400px] md:w-1/2 lg:w-1/3 border-red-500 border-2 border-collapse group"
        >
          <div className="relative h-full w-full">
            {pizza.img && (
              <Image
                alt={pizza.title}
                src={pizza.img}
                fill
                className="object-contain group-hover:rotate-[30deg] transition-all ease-in"
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
