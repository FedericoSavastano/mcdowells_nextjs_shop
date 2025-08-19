/**
 * page.tsx
 *
 * Admin page for creating a new product (`/admin/products/new`).
 *
 * Responsibilities:
 * - Display a heading for the "New Product" page.
 * - Render the product creation form inside an `AddProductForm` wrapper.
 *
 * Dependencies:
 * - `Heading`: Shared UI component for consistent page titles.
 * - `AddProductForm`: A wrapper component responsible for handling the form
 *   submission logic (likely tied to the `createProduct` server action).
 * - `ProductForm`: The actual form component with fields for product data input.
 */

import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

/**
 * CreateProductPage
 *
 * Main entry point for the product creation page in the admin dashboard.
 *
 * @returns {JSX.Element} A page containing a heading and the product form wrapped in submission logic.
 */
export default function CreateProductPage() {
  return (
    <>
      <Heading>New Product</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
