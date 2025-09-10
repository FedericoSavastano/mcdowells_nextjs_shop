"use client";
// Marks this as a Client Component since it uses hooks and client-side state

import { useMemo } from "react";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";

// -----------------------------
// Component: OrderSummary
// -----------------------------
/**
 * Displays a summary of the user's current order, including:
 * - A list of products in the order
 * - The total cost (calculated dynamically)
 * Directs user to checkout page
 *
 * @returns JSX aside element containing order summary and checkout link.
 */
export default function OrderSummary() {
  const order = useStore((state) => state.order); // Retrieves current order items from Zustand store

  // Calculate total price whenever `order` changes
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">My Order</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">The order is empty</p>
      ) : (
        <div className="mt-5">
          {/* Render each product in the order */}
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          {/* Display total */}
          <p className="text-2xl mt-20 text-center">
            Total to pay: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <div className="w-full mt-10 space-y-5 text-center">
            <Link
              className="p-2 m-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              href="/checkout"
            >
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
