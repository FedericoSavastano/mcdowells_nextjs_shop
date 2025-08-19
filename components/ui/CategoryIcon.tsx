/**
 * CategoryIcon.tsx
 *
 * UI component for rendering a single category in the order sidebar.
 * - Displays the category icon and name.
 * - Highlights the active category based on the current route parameter.
 * - Provides navigation to the category's order page.
 *
 * Dependencies:
 * - Next.js `Image` and `Link` for optimized images and routing.
 * - `useParams` from `next/navigation` for accessing dynamic route params.
 * - Prisma `Category` type for type safety.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type CategoryIconProps = {
  category: Category;
};

/**
 * Renders an icon + link for a product category.
 *
 * @param {CategoryIconProps} props - The category data.
 * @returns {JSX.Element} A clickable category item with icon and name.
 */
export default function CategoryIcon({ category }: CategoryIconProps) {
  // Get the current route params, expecting { category: string }
  const params = useParams<{ category: string }>();

  return (
    <div
      className={`${
        // Highlight background if this category matches the active route param
        category.slug === params.category ? "bg-amber-400" : ""
      } flex items-center gap-2 w-full border-t border-gray-200 p-2 last-of-type:border-b`}
    >
      {/* Category icon (based on slug) */}
      <div className="w-12 h-12 relative">
        <Image
          fill
          src={`/icon_${category.slug}.svg`} // Example: icon_pizza.svg
          alt="Category Image"
        />
      </div>

      {/* Category name links to its order page */}
      <Link className="text-l font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
}
