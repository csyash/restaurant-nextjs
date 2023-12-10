"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useCartStore } from "@/utils/CartStore";

const UserLinks = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const { status } = useSession();
  const { totalItems } = useCartStore();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      {status === "authenticated" ? (
        <div className={"flex items-center justify-center md:gap-10 lg:gap-20"}>
          <Link href={"/orders"}>Orders</Link>
          <Link href={"/cart"}>Cart ({totalItems})</Link>
          <span
            className="text-red-500 uppercase font-semibold cursor-pointer"
            onClick={() => {
              signOut();
              toast.success("LogOut Successful");
            }}
          >
            Logout
          </span>
        </div>
      ) : (
        <div className="flex">
          <Link href={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
