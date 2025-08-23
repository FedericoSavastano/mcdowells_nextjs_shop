"use client";

import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import MadeBy from "@/components/ui/MadeBy";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

/**
 * OrdersPage component
 *
 * This page is responsible for displaying the latest ready orders in real-time.
 * It fetches data from the `/orders/api` endpoint using **SWR** for automatic
 * revalidation and refreshing.
 *
 * @component
 * @returns {JSX.Element} The rendered page containing the orders list or appropriate fallback messages.
 *
 * @example
 * // Example usage inside the app's routing:
 * <OrdersPage />
 */
export default function OrdersPage() {
  const url = "/orders/api";

  /**
   * Fetcher function for SWR.
   * Fetches data from the provided API endpoint and returns the JSON response.
   *
   * @async
   * @function fetcher
   * @returns {Promise<OrderWithProducts[]>} A promise resolving to the list of orders.
   */
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  /**
   * useSWR hook for managing order data fetching and revalidation.
   *
   * @constant
   * @type {import("swr").SWRResponse<OrderWithProducts[], any>}
   *
   * @property {OrderWithProducts[] | undefined} data - The fetched orders data.
   * @property {Error | undefined} error - Any error encountered during fetch.
   * @property {boolean} isLoading - Indicates whether the data is still being loaded.
   */
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000, // Poll every second to keep orders up-to-date
    revalidateOnFocus: false, // Prevent refetching when user refocuses tab
  });

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  // Main render
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

        <MadeBy />
      </>
    );
}
