/**
 * page.tsx
 *
 * Client-side component for the **Admin Orders Page**.
 *
 * Responsibilities:
 * - Fetches and displays a list of pending orders for administrators.
 * - Uses SWR (stale-while-revalidate) to keep order data updated in real-time.
 * - Displays orders in a responsive grid using `OrderCard` components.
 * - Provides fallback states for loading and when there are no orders.
 *
 * Dependencies:
 * - `useSWR`: Client-side data fetching & caching hook.
 * - `OrderCard`: Component responsible for rendering a single order.
 * - `Heading`: UI component for page headings.
 * - `OrderWithProducts` (TypeScript type): Defines the shape of order data with products.
 */

"use client";

import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

/**
 * OrdersPage Component
 *
 * Admin interface to manage and view all pending orders.
 *
 * Data Flow:
 * 1. Defines the API endpoint `/admin/orders/api`.
 * 2. Fetches orders using a custom fetcher wrapped in SWR.
 * 3. Refreshes automatically every 1 second (`refreshInterval: 1000`),
 *    ensuring near real-time updates without a full page reload.
 * 4. Displays `OrderCard` components for each order.
 * 5. Shows appropriate UI states for:
 *    - Loading
 *    - Empty orders list
 *
 * @returns {JSX.Element} A fully rendered admin orders management page.
 */
export default function OrdersPage() {
  const url = "/admin/orders/api";

  // Custom fetcher for SWR (fetch + parse JSON)
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  // SWR hook for data fetching and revalidation
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000, // re-fetch orders every 1s
    revalidateOnFocus: false, // don't revalidate when window regains focus
  });

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  // Render orders if data is available
  if (data)
    return (
      <>
        <Heading>Manage Orders</Heading>

        {data.length ? (
          // Display orders in a responsive grid
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          // Empty state when no orders are found
          <p className="text-center">There are no pending orders</p>
        )}
      </>
    );
}
