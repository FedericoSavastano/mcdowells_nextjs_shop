/**
 * ProductCard.tsx
 * ----------------
 * A card component to display product details including image, name, price,
 * and an "Add" button to add the product to the order.
 *
 * Dependencies:
 * - `formatCurrency` and `getImagePath` utilities for formatting price and resolving image URLs
 * - `Product` type from Prisma Client
 * - `Image` from next/image for optimized image rendering
 * - `AddProductButton` component to handle adding the product to the order
 *
 * Role:
 * Used throughout the product listing or menu pages to visually display
 * each product with interactive functionality.
 */

import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product; // Product object containing name, price, image, etc.
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image); // Resolve the image URL using utility

  return (
    <div className="border bg-white">
      {/* Product image */}
      <Image
        width={400}
        height={500}
        src={imagePath}
        style={{ width: "100%", height: "auto" }}
        priority={false}
        alt={`Image of ${product.name}`}
      />

      <div className="p-5">
        {/* Product name */}
        <h3 className="text-xl font-bold">{product.name}</h3>

        {/* Product price */}
        <p className="mt-5 font-black text-2xl text-amber-500">
          {formatCurrency(product.price)}
        </p>

        {/* Add to order button */}
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
