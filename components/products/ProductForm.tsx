/**
 * ProductForm.tsx
 * ----------------
 * A form component for creating or editing a product.
 *
 * Dependencies:
 * - `prisma` for fetching categories from the database
 * - `ImageUpload` component for uploading product images
 * - `Product` type from Prisma Client
 *
 * Role:
 * Provides input fields for product name, price, category selection,
 * and image upload. Can be used for both adding and editing products.
 */

import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

/**
 * Fetch all categories from the database
 */
async function getCategories() {
  return await prisma.category.findMany();
}

type ProductFormProps = {
  product?: Product; // Optional product for editing
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories(); // Fetch categories for the select dropdown

  return (
    <>
      {/* Product Name Field */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Product Name"
          defaultValue={product?.name} // Pre-fill if editing
        />
      </div>

      {/* Product Price Field */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Price:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Product Price"
          defaultValue={product?.price} // Pre-fill if editing
        />
      </div>

      {/* Product Category Selection */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Category:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId} // Pre-select if editing
        >
          <option value=""> -- Select -- </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload Field */}
      <ImageUpload image={product?.image} />
    </>
  );
}
