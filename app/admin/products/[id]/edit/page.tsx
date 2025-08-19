/**
 * page.tsx
 *
 * Admin page for editing a specific product by its ID.
 *
 * Responsibilities:
 * - Fetches a product from the database using its unique `id`.
 * - If the product does not exist, triggers Next.js's `notFound()` function to display a 404.
 * - Renders an edit form pre-filled with the product’s current details.
 * - Wraps the form inside `EditProductForm` to handle submission.
 *
 * Dependencies:
 * - `prisma`: For fetching the product by ID from the database.
 * - `EditProductForm`: Higher-order component to handle edit submissions.
 * - `ProductForm`: Form UI component, populated with product details.
 * - `GoBackButton`: Utility button to navigate back to the previous page.
 * - `Heading`: Shared UI component for section titles.
 * - `notFound` (from Next.js): Handles missing product cases.
 * - `params`: Provided by Next.js dynamic routes (`[id]`).
 */

import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

/**
 * Fetch a product by its ID.
 * - Uses Prisma’s `findUnique`.
 * - Calls `notFound()` if product does not exist.
 *
 * @param {number} id - Product ID
 * @returns {Promise<Product>} The found product
 */
async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound(); // Next.js 404 handling
  }

  return product;
}

/**
 * EditProductsPage
 *
 * Main page component for editing a product.
 *
 * @param {Object} props
 * @param {Object} props.params - Next.js dynamic route params
 * @param {string} props.params.id - Product ID from the URL
 *
 * @returns {JSX.Element} Page UI with product edit form
 */
export default async function EditProductsPage({
  params,
}: {
  params: { id: string };
}) {
  // Convert `id` param to number and fetch product
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Edit Product: {product.name}</Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
