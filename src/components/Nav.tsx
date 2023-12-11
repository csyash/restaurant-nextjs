import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import UserLinks from "./UserLinks";
import { getAuthSession } from "@/utils/options";

const Nav = async () => {
  const session = await getAuthSession();

  return (
    <nav className="flex h-12 items-center justify-between p-4 border-b-2 border-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex items-center  md:gap-10 lg:gap-20 text-lg font-semibold flex-1 text-red-500">
        <Link href={"/menu"}>MENU</Link>
        <Link href={"/"}>CONTACT</Link>
        {session?.user.isAdmin && <Link href={"/add"}>Add Product</Link>}
      </div>
      <div className="text-xl flex-1 md:text-center lg:text-center font-bold text-red-500">
        <Link href="/">MASSIMO</Link>
      </div>
      <div className="hidden md:flex items-center justify-end md:gap-10 lg:gap-20 text-lg font-semibold flex-1 text-red-500">
        <UserLinks />
      </div>
      <div className="block md:hidden">
        <Menu />
      </div>
    </nav>
  );
};

export default Nav;
