import Image from "next/image";
import React from "react";

const CartPage = () => {
  return (
    <div className="w-screen h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row lg:px-20 xl:px-40">
      {/* TOP CONTAINER  */}
      <div className="flex-1 w-full overflow-y-scroll no-scrollbar md:py-4">
        {/* EACH ORDER  */}
        <div className="w-full h-max flex flex-col gap-4 max-sm:p-4 md:pr-8">
          {[1, 2, 3].map((item) => {
            return (
              <div
                className="flex items-center justify-between gap-4 w-full h-[120px] md:h-[150px]"
                key={item}
              >
                <div className="relative flex-[3] h-full">
                  <Image
                    src={"/temporary/p1.png"}
                    fill
                    alt="pizza"
                    className="object-contain"
                  />
                </div>
                <div className="flex-[4] flex flex-col text-red-500">
                  <h1 className="text-xl font-bold">Sicilian Pizza</h1>
                  <h2 className="text-xl">Large</h2>
                </div>
                <div className="flex-1 flex gap-8 text-red-500">
                  <span className="text-2xl font-bold">$24</span>
                  <span className="text-2xl cursor-pointer">X</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* BOTTOM CONTAINER  */}
      <div className="flex-1 flex  p-4 md:px-20 bg-fuchsia-50 w-full font-[500] text-lg md:text-xl text-red-500 md:justify-center md:items-center ">
        <div className="w-full flex flex-col gap-4 lg:w-[80%]">
          <div className="flex justify-between items-center">
            <span>Subtotal(3)</span>
            <span>$81.7</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Service Cost</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Delivery</span>
            <span className="text-green-600">Free!</span>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>$81.7</span>
          </div>
          <div className="w-full flex justify-end">
            <button className="uppercase bg-red-500 font-semibold text-white py-3 px-4 w-[150px] rounded-md">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
