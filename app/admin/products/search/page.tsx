/**
 * page.tsx
 *
 * Admin page for searching products (`/admin/products/search`).
 *
 * Responsibilities:
 * - Accept a search term from query parameters.
 * - Query the database for matching products (case-insensitive).
 * - Display search results in a reusable `ProductTable`.
 * - Render a `ProductSearchForm` for refining queries.
 *
 * Dependencies:
 * - `Heading`: Shared UI component for consistent page headings.
 * - `ProductSearchForm`: A form component to submit new product searches.
 * - `ProductTable`: Reusable component for displaying product data in a table format.
 * - `prisma`: ORM used to query the database (with product + category relationships).
 */
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

/**
 * searchProducts
 *
 * Queries the database for products matching the given search term.
 *
 * @param {string} searchTerm - The keyword to search for in product names.
 * @returns {Promise<Product[]>} List of matching products with their categories.
 */
async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

/**
 * SearchPage
 *
 * The main page component for displaying search results in the admin dashboard.
 *
 * @param {Object} props
 * @param {Object} props.searchParams - Query string params provided by Next.js.
 * @param {string} props.searchParams.search - The search keyword from the URL.
 *
 * @returns {JSX.Element} A heading, search form, and results table (or empty state).
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Search results: {searchParams.search}</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No results</p>
      )}
    </>
  );
}
