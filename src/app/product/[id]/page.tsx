"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ProductType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/CartStore";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  useEffect(() => {
    const getData = async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      setSingleProduct(data);
    };

    getData(id);
    useCartStore.persist.rehydrate();
  }, [id]);

  const { data: session } = useSession();
  const [quantity, setQuantity] = useState<number>(1);
  const [optionIdx, setOptionIdx] = useState<number>(0);
  const router = useRouter();
  const [singleProduct, setSingleProduct] = useState<ProductType>({
    id: "",
    title: "",
    desc: "",
    img: "",
    price: 0,
    options: [
      {
        title: "",
        additionalPrice: 0,
      },
    ],
  });
  const { addToCart } = useCartStore();
  const totalPrice = singleProduct.options?.length
    ? quantity *
      (Number(singleProduct.price) +
        Number(singleProduct.options[optionIdx]?.additionalPrice))
    : quantity * Number(singleProduct.price);

  useEffect(() => {
    const getData = async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      setSingleProduct(data);
    };

    getData(id);
    useCartStore.persist.rehydrate();
  }, [id]);

  const deleteProductHandler = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/");
      toast.success("Product Deleted");
    } else {
      toast.error("Delete product failed");
    }
  };

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
            className="object-contain"
          />
        )}
      </div>
      <div className="bottom w-full flex flex-col gap-4 pper flex-1 px-2 md:gap-10 md:justify-start md:py-8 relative">
        {session?.user.isAdmin && (
          <button
            className="absolute text-white font-bold bg-red-500 py-3 px-4 rounded-md right-0"
            onClick={() => deleteProductHandler(singleProduct.id)}
          >
            Delete
          </button>
        )}
        <h1 className="text-2xl font-extrabold uppercase md:text-3xl">
          {singleProduct.title}
        </h1>
        <p className="text-red-600 text-lg md:text-xl">{singleProduct.desc}</p>

        <span className="text-2xl font-extrabold">${totalPrice}</span>

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
          <button
            className="px-3 py-2 flex-1 font-bold h-full bg-red-500 text-white uppercase"
            onClick={() => {
              addToCart({
                id: singleProduct.id,
                title: singleProduct.title,
                img: singleProduct.img,
                price: totalPrice,
                quantity: quantity,
                optionTitle: singleProduct.options?.length
                  ? singleProduct.options[optionIdx].title
                  : "regular",
              });
              toast.success(
                `${singleProduct.title} ${
                  singleProduct.options?.length
                    ? singleProduct.options?.[optionIdx].title
                    : ""
                } was added`
              );
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
