"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { useStore } from "@/src/store";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";
import ToastNotification from "@/components/ui/ToastNotification";
import { OrderItem } from "@/src/types";
import Image from "next/image";

/**
 * SuccessPage component
 *
 * This page is displayed after a checkout process has been completed successfully.
 * It restores order data from localStorage, validates it using the OrderSchema,
 * sends it to the server, and then clears both the store and localStorage.
 *
 * @component
 * @returns {JSX.Element} The success page with confirmation and branding.
 */
export default function SuccessPage() {
  const router = useRouter();

  /** Zustand  **/
  const addToOrder = useStore((state) => state.addToOrder); // action to add products into the order state
  const order = useStore((state) => state.order); // Retrieves current order items from Zustand store
  const clearOrder = useStore((state) => state.clearOrder); // Store action to reset order

  /**
   * Loads saved order data from localStorage on initial render,
   * and rehydrates the Zustand store by adding each product back into the order.
   */
  useEffect(() => {
    const saved = localStorage.getItem("orderData");

    if (saved) {
      const savedOrder = JSON.parse(saved);

      if (savedOrder) {
        savedOrder.order.forEach((ord: Product) => addToOrder(ord));
      }
    }
  }, []);

  /**
   * Watches for changes in the order state.
   * When the order is populated, it triggers order creation on the server.
   */
  useEffect(() => {
    const saved = localStorage.getItem("orderData");
    const savedOrder = JSON.parse(saved!);

    if (order.length) {
      handleCreateOrder(savedOrder.name, savedOrder.total, order);
    }
  }, [order]);

  /**
   * Handles the creation of an order.
   *
   * - Validates the order data against Zod's {@link OrderSchema}.
   * - Calls the server action {@link createOrder}.
   * - Displays toast notifications for errors or success.
   * - Clears the local store and localStorage.
   * - Redirects to the home page after a short delay.
   *
   * @async
   * @param {string} name - The customer name associated with the order.
   * @param {number} total - The total price of the order.
   * @param {OrderItem[]} order - The list of items in the order.
   * @returns {Promise<void>} Resolves when the process is completed.
   */
  const handleCreateOrder = async (
    name: string,
    total: number,
    order: OrderItem[]
  ) => {
    const data = {
      name,
      total,
      order,
    };

    // Validate data against schema
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    // Send order to server
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    toast.success("Order Done!");
    clearOrder();
    localStorage.removeItem("orderData");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <h1 className="text-center mt-20 text-3xl font-black">
        Your order was created!
      </h1>

      <div className="flex justify-center mt-5">
        <div className="relative w-20 h-20">
          <Image fill alt="Mc Dowell's Logo" src="/mcdowellslogo.webp" />
        </div>
      </div>

      <h4 className="text-center mt-20 text-2xl font-black">
        Check the 'Orders Ready' screen to recieve it when it's ready
      </h4>

      <h2 className="text-center mt-20 text-3xl font-black">Thanks!</h2>
      <ToastNotification />
    </>
  );
}
