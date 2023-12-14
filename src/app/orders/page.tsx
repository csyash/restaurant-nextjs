"use client";
import { OrderType } from "@/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AdminStatusField from "@/components/AdminStatusField";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/orders");

      if (!res.ok) throw new Error("Orders fetching failed");

      const data = await res.json();
      setOrders(data);
    };

    getData();
  }, []);
  const { data: session, status: authenticationStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderType[]>([]);

  if (authenticationStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (authenticationStatus === "unauthenticated") {
    return router.push("/");
  }

  const isAdmin = session?.user.isAdmin;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      {session?.user.isAdmin && (
        <h1 className="text-between font-bold text-2xl text-red-500">
          Welcome Admin {session?.user.name}
        </h1>
      )}
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="text-sm md:text-base bg-red-50" key={order.id}>
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1 text-red-500 font-bold">
                ${order.price}
              </td>

              <td className="hidden md:block py-6 px-1">
                {order.products.map((product, index) => {
                  if (index == order.products.length - 1) return product.title;

                  return product.title + ", ";
                })}
              </td>
              {isAdmin ? (
                <td className=" py-4 px-1">
                  <AdminStatusField {...order} />
                </td>
              ) : (
                <td className="py-6 px-1">{order.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
