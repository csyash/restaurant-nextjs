import React from "react";
import Link from "next/link";
import { MenuType } from "@/types/types";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/categories", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed!");
  }

  return response.json();
};

const MenuPage = async () => {
  const menu: MenuType = await getData();
  return (
    <div className="w-screen h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] md:p-4 lg:px-20 xl:px-40 flex flex-col items-center justify-center md:flex-row">
      {menu.map((item) => {
        return (
          <Link
            key={`${item.id}`}
            href={`menu/${item.slug}`}
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundPosition: "left",
            }}
            className="rounded-md w-full flex-1 p-4 md:h-[60%]"
          >
            <div
              className="flex flex-col items-start justify-center
               h-full gap-4 lg:gap-8 pr-40"
              style={{ color: `${item.color}` }}
            >
              <h1 className="font-bold text-xl">{item.title}</h1>
              <p className="text-left text-lg font-semibold">{item.desc}</p>
              <button
                className="hidden md:block text-xl font-bold rounded-md px-2 py-2 md:px-4 md:py-3"
                style={{
                  backgroundColor: `${item.color}`,
                  color: item.color === "white" ? "black" : "white",
                }}
              >
                Explore
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuPage;
