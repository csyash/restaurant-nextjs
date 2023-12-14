"use client";
import { CartItemType, OrderType } from "@/types/types";
import { useCartStore } from "@/utils/CartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const { totalItems, totalPrice, removeFromCart, products, resetCart } =
    useCartStore();
  const deliveryCharge: number = 5;
  const handleDelteProductFromCart = (item: CartItemType) => {
    removeFromCart(item);
  };
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") return router.push("/login");

  if (status === "loading") return <p>Loading...</p>;

  const handleNewOrder = async () => {
    const newOrder = {
      userEmail: session?.user.email,
      price: totalPrice > 50 ? totalPrice : totalPrice + deliveryCharge,
      products: products,
      status: "Preparing",
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (res.ok) {
      toast.success("Order Placed"), resetCart();
      return router.push("/orders");
    } else {
      console.log(await res.json());
    }
  };

  return (
    <div className="w-screen h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row lg:px-20 xl:px-40">
      {/* TOP CONTAINER  */}
      <div className="flex-1 w-full overflow-y-scroll no-scrollbar md:py-4 lg:py-8">
        {/* EACH ORDER  */}
        <div className="w-full h-max flex flex-col gap-4 max-sm:p-4 md:pr-8">
          {products.map((item) => {
            return (
              <div
                className="flex items-center justify-between gap-4 w-full h-[120px] md:h-[150px]"
                key={item.id}
              >
                {item.img && (
                  <div className="relative flex-[3] h-full">
                    <Image
                      src={item.img}
                      fill
                      alt="pizza"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-[4] flex flex-col text-red-500">
                  <h1 className="text-xl font-bold">
                    {item.title} x{item.quantity}
                  </h1>
                  <h2 className="text-xl">{item.optionTitle}</h2>
                </div>
                <div className="flex-1 flex items-center gap-8 text-red-500">
                  <span className="text-2xl font-bold flex">${item.price}</span>
                  <span className="text-lg font-semibold">
                    (${item.price / item.quantity}x{item.quantity})
                  </span>
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() =>
                      handleDelteProductFromCart({
                        id: item.id,
                        title: item.title,
                        img: item.img,
                        price: item.price,
                        optionTitle: item.optionTitle,
                        quantity: item.quantity,
                      })
                    }
                  >
                    X
                  </span>
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
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Service Cost</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Delivery</span>
            {totalPrice < 50 ? (
              <span className="text-green-600">${deliveryCharge}</span>
            ) : (
              <span className="text-green-600">Free!</span>
            )}
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <span>Total</span>
            {totalPrice < 50 ? (
              <span>${totalPrice + deliveryCharge}</span>
            ) : (
              <span>${totalPrice}</span>
            )}
          </div>
          <div className="w-full flex justify-end">
            <button
              className="uppercase bg-red-500 font-semibold text-white py-3 px-4 w-[150px] rounded-md disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={products.length == 0}
              onClick={handleNewOrder}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
