"use client";

/**
 * AddProductButton.tsx
 * ---------------------
 * A button component that adds a given product to the user's order.
 *
 * Dependencies:
 * - Product type from Prisma Client
 * - useStore hook for accessing global state (likely Zustand)
 *
 * Role:
 * This is a small reusable UI component used throughout the app wherever
 * a product can be added to the order/cart.
 */

import { Product } from "@prisma/client";
import { useStore } from "@/src/store";

/**
 * Props for AddProductButton component
 */
type AddProductButtonProps = {
  product: Product; // The product object to add to the order
};

/**
 * AddProductButton
 * ----------------
 * Renders a styled button that, when clicked, adds the provided product
 * to the order using the global store's `addToOrder` function.
 *
 * @param product - The product object to be added to the order
 */
export default function AddProductButton({ product }: AddProductButtonProps) {
  // Get the addToOrder function from the global store
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      className="bg-indigo-600 rounded-sm hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={() => addToOrder(product)} // Adds the product to the order when clicked
    >
      Add
    </button>
  );
}
