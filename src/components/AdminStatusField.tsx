"use client";
import { OrderType } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStatusField = (order: OrderType) => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/orders/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
      }
    );

    if (!res.ok) {
      toast.error("Failed");
      return router.push("/");
    }

    toast.success("Order status changed successfully");
    router.push("/orders");
  };
  return (
    <div>
      <form
        className="flex items-center justify-around"
        onSubmit={(e) => handleSubmit(e, order.id)}
      >
        <input
          type="text"
          name="status"
          className="w-[80%] py-4 px-3 h-[50px]"
          placeholder={order.status}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">
          <Image
            width={30}
            height={30}
            alt="edit image"
            src="/edit.png"
            className="cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};

export default AdminStatusField;
