"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (data)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">Orders Ready</h1>

        <Logo />

        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No order is ready yet</p>
        )}
      </>
    );
}
