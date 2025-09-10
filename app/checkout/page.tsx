"use client";

import { useStore } from "@/src/store";
import { useMemo } from "react";
import OrderedItems from "@/components/checkout/OrderedItems";
import { toast } from "react-toastify";
import { formatCurrency } from "@/src/utils";
import ToastNotification from "@/components/ui/ToastNotification";
import Link from "next/link";
import Image from "next/image";

export default function Checkout() {
  const order = useStore((state) => state.order); // Retrieves current order items from Zustand store

  // Calculate total price whenever `order` changes
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  /**
   * Handles order submission:
   * - Collects data from the form
   * - Saves order in LocalStorage
   * - Redirects to Stripe Checkout page
   *
   * @param formData - Form data containing user's name
   */
  const handleGoToPay = async (formData: FormData) => {
    // Save order data locally so it can be restored after Stripe redirect
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        order,
        total,
        name: formData.get("name"),
      })
    );

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100, // (in cents)
          productName: "McDowell's",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("something went wrong. try again");
    }
  };

  return (
    <>
      <Link
        href={"/order/burger"}
        className="bg-amber-400 hover:bg-amber-200 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
      >
        {" "}
        cancel
      </Link>
      <h1 className="text-center mt-20 text-3xl font-black">Checkout</h1>

      <div className="flex justify-center mt-5">
        <div className="relative w-20 h-20">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={true}
            alt="Mc Dowell's Logo"
            src="/mcdowellslogo.webp"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
        {order.map((item) => (
          <OrderedItems key={item.id} item={item} />
        ))}
      </div>
      {/* Display total */}
      <p className="text-2xl mt-20 text-center">
        Total to pay: {""}
        <span className="font-bold">{formatCurrency(total)}</span>
      </p>

      <p className="text-center mt-5">
        * you will be redirected to the Stripe page to pay. Please use this
        dummy credit card number "4242 4242 4242 4242", other data in the Stripe
        form is indiferent
      </p>

      {/* Order confirmation form */}
      <form
        className="max-w-sm m-auto flex flex-col align-center justify-center mt-10 mb-20 space-y-5"
        action={handleGoToPay} // Client-side form handler
      >
        <label htmlFor="name">Enter your name and confirm your order</label>
        <input
          type="text"
          placeholder="Your Name"
          className="bg-white border border-gray-400 p-2 w-full"
          name="name"
          required
        />

        <input
          type="submit"
          className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
          value="Go To Pay"
        />
      </form>

      <ToastNotification />
    </>
  );
}
