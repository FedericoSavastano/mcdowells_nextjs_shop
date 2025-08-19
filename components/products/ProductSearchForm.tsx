"use client";

/**
 * ProductSearchForm.tsx
 * ----------------------
 * A search form component for filtering products in the admin panel.
 *
 * Dependencies:
 * - `SearchSchema` (Zod) for validating search input
 * - `useRouter` from Next.js for navigation
 * - `react-toastify` for displaying validation errors
 *
 * Role:
 * Provides a simple search input that validates user input and redirects
 * to the search results page upon submission.
 */

import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter(); // Router for page navigation

  /**
   * Handles search form submission
   * ------------------------------
   * @param formData - FormData object containing the search query
   *
   * Validates the search input using SearchSchema. If valid, redirects
   * to the product search results page with query string.
   */
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    // Validate the search input
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message); // Display validation errors
      });
      return; // Stop submission if invalid
    }

    // Navigate to search results page with query parameter
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex items-center">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search Product"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />

      {/* Submit button */}
      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        value={"Search"}
      />
    </form>
  );
}
