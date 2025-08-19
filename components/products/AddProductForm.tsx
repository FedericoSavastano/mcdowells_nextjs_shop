"use client";

/**
 * AddProductForm.tsx
 * -------------------
 * A reusable form component for creating new products.
 *
 * Dependencies:
 * - `createProduct` action to send the product data to the backend
 * - `ProductSchema` (Zod) for validating form input
 * - `useRouter` from Next.js for navigation after submission
 * - `react-toastify` for displaying success/error notifications
 *
 * Role:
 * Provides a standardized form layout for adding products in the admin panel.
 * Handles client-side validation, submission, error handling, and navigation.
 */

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter(); // Next.js router for page navigation

  /**
   * Handles form submission
   * -----------------------
   * @param formData - FormData object containing the input values
   *
   * Validates input with ProductSchema, calls `createProduct` action,
   * displays error/success notifications, and redirects on success.
   */
  const handleSubmit = async (formData: FormData) => {
    // Gather form values
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    // Validate data using Zod schema
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message); // Display validation errors
      });
      return; // Stop submission if validation fails
    }

    // Send validated data to backend
    const response = await createProduct(result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message); // Display API errors
      });
      return;
    }

    toast.success("Product Created correctly"); // Show success notification
    router.push("/admin/products"); // Navigate to products list
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children} {/* Allows passing custom input fields from parent */}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Create Product"
        />
      </form>
    </div>
  );
}
