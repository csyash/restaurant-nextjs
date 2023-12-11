"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserLinks from "./UserLinks";

const links = [
  {
    title: "Menu",
    url: "/menu",
  },
  {
    title: "contact",
    url: "/",
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = true;
  const clickHandler = () => {
    setOpen(false);
  };

  return (
    <div className="block md:hidden  ">
      {!open ? (
        <Image
          src="/open.png"
          width={18}
          height={18}
          alt="Open icon"
          onClick={() => setOpen(true)}
        />
      ) : (
        <span
          className="text-[20px] text-red-500"
          onClick={() => setOpen(false)}
        >
          X
        </span>
      )}
      {open && (
        <div className="absolute left-0 h-[calc(100vh-6rem)] bg-red-500 text-white w-full flex flex-col items-center justify-center gap-8 z-10">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className="font-semibold text-lg uppercase"
              onClick={clickHandler}
            >
              {link.title}
            </Link>
          ))}
          <div className={user ? "hidden" : "font-semibold text-lg uppercase"}>
            <Link href={"/login"} onClick={clickHandler}>
              Login
            </Link>
          </div>
          <div
            className={
              !user
                ? "hidden"
                : "font-semibold text-lg uppercase flex flex-col items-center justify-center gap-8"
            }
          >
            <UserLinks />
          </div>

          <div className="bg-yellow-500 text-white p-2 rounded-lg">
            +91 6261527118
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
