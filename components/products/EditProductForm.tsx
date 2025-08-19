"use client";

/**
 * EditProductForm.tsx
 * --------------------
 * A reusable form component for editing existing products in the admin panel.
 *
 * Dependencies:
 * - `updateProduct` action to send updated product data to the backend
 * - `ProductSchema` (Zod) for client-side validation
 * - `useRouter` and `useParams` from Next.js for navigation and accessing route params
 * - `react-toastify` for displaying success/error notifications
 *
 * Role:
 * Provides a standardized form layout for updating products. Handles validation,
 * submission, error handling, and redirects after successful update.
 */

import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter(); // Router for page navigation
  const params = useParams(); // Access route parameters
  const id = +params.id!; // Extract product ID from URL and convert to number

  /**
   * Handles form submission
   * -----------------------
   * @param formData - FormData object containing the input values
   *
   * Validates the input using ProductSchema, sends update request via `updateProduct`,
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

    // Validate form data using Zod schema
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message); // Display validation errors
      });
      return; // Stop submission if validation fails
    }

    // Send update request to backend
    const response = await updateProduct(result.data, id);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message); // Display API errors
      });
      return;
    }

    toast.success("Product Updated correctly"); // Show success notification
    router.push("/admin/products"); // Navigate back to products list
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children} {/* Allows passing custom input fields from parent */}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Save Changes"
        />
      </form>
    </div>
  );
}
