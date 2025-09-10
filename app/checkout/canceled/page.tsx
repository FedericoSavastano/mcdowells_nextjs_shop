"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

/**
 * CanceledPage component
 *
 * This page is displayed after a checkout process has failed.
 * It removes order data from localStorage
 * redirects user to homepage
 *
 * @component
 * @returns {JSX.Element} The success page with confirmation and branding.
 */
export default function CanceledPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("orderData");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, [router]);

  return (
    <>
      <h1 className="text-center mt-20 text-3xl font-black">
        Something went wrong!
      </h1>

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

      <h4 className="text-center mt-20 text-2xl font-black">
        Please make your order again
      </h4>
    </>
  );
}
