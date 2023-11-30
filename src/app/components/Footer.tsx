import React from "react";

const Footer = () => {
  return (
    <div className="h-12 p-4 md:h-16 lg:px-20 xl:px-40 text-xl md:text-sm lg:text-xl font-bold text-red-500 flex items-center justify-between w-full border-t-2 border-red-500 uppercase">
      <div className="flex">
        <span className="block md:hidden">@</span>
        Massimo
      </div>
      <div className="hidden md:block">@All rights reserved 2023</div>
    </div>
  );
};

export default Footer;
