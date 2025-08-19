/**
 * not-found.tsx
 *
 * Custom "Not Found" page for the product edit route (`/admin/products/[id]/edit`).
 *
 * Responsibilities:
 * - Display a user-friendly message when a requested product does not exist.
 * - Provide navigation back to the main products admin page.
 *
 * Dependencies:
 * - `Heading`: Shared UI component for consistent page titles.
 * - `Link` (Next.js): For navigation back to `/admin/products`.
 */

import Heading from "@/components/ui/Heading";
import Link from "next/link";

/**
 * NotFound
 *
 * Renders a simple error message when a product cannot be found.
 * Includes a call-to-action button that links back to the products page.
 *
 * @returns {JSX.Element} Centered "Product Not Found" message with navigation link.
 */
export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Product Not Found</Heading>

      <Link
        href="/admin/products"
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
      >
        Go to Products
      </Link>
    </div>
  );
}
