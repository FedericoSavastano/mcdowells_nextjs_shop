"use client";
// Marks this as a Client Component since it uses hooks and client-side state

import { useMemo } from "react";
import { toast } from "react-toastify";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";

// -----------------------------
// Component: OrderSummary
// -----------------------------
/**
 * Displays a summary of the user's current order, including:
 * - A list of products in the order
 * - The total cost (calculated dynamically)
 * - A form to confirm the order by entering a name
 *
 * Handles order creation by validating input with Zod (`OrderSchema`)
 * and calling the `createOrder` server action.
 *
 * @returns JSX aside element containing order summary and checkout form.
 */
export default function OrderSummary() {
  const order = useStore((state) => state.order); // Retrieves current order items from Zustand store
  const clearOrder = useStore((state) => state.clearOrder); // Store action to reset order

  // Calculate total price whenever `order` changes
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  /**
   * Handles order submission:
   * - Collects data from the form
   * - Validates using `OrderSchema`
   * - Calls `createOrder` server action
   * - Shows toast notifications for errors or success
   *
   * @param formData - Form data containing user's name
   */
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
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
  };

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

          {/* Order confirmation form */}
          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder} // Client-side form handler
          >
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />

            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirm Order"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
