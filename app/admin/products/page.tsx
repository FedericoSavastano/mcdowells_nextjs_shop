/**
 * Admin - Products Listing Page
 *
 * Path: /admin/products
 *
 * Displays a paginated list of products for administrators to manage.
 * Provides quick access to product creation, search, and navigation through
 * multiple pages of results.
 *
 * --------------------------------------------------------
 * Responsibilities:
 * - Fetch paginated products from the database (with category info).
 * - Compute total number of products for pagination.
 * - Handle page bounds (redirect if invalid).
 * - Render:
 *   • Page heading ("Manage Products")
 *   • Button/link to create a new product
 *   • Search form (`ProductSearchForm`)
 *   • Paginated product table (`ProductTable`)
 *   • Pagination controls (`ProductsPagination`)
 *
 * Dependencies:
 * - `Heading`                → Shared UI component for consistent section titles.
 * - `ProductTable`           → Displays products in a structured table layout.
 * - `ProductsPagination`     → Handles navigation between product pages.
 * - `ProductSearchForm`      → Allows keyword-based product searches.
 * - `prisma`                 → Database client for querying products.
 * - `redirect` (Next.js)     → Redirects users to valid pages if page param is invalid.
 * - `Link` (Next.js)         → Client-side navigation to product creation page.
 */
import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

/**
 * productCount
 *
 * Fetches the total number of products in the database.
 *
 * @returns {Promise<number>} - Total count of products.
 */
async function productCount() {
  return await prisma.product.count();
}

/**
 * getProducts
 *
 * Retrieves a paginated set of products with their related categories.
 *
 * @param {number} page - Current page number (1-indexed).
 * @param {number} pageSize - Number of products to display per page.
 *
 * @returns {Promise<Product[]>} - List of products for the given page.
 *
 * Notes:
 * - Uses Prisma `findMany` with `take` and `skip` for pagination.
 * - Includes `category` relation for context in `ProductTable`.
 */
async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

/**
 * ProductsWithCategory
 *
 * Exported type alias representing the resolved result of `getProducts`.
 * Ensures consistent typing when passing product data to child components.
 */
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

/**
 * ProductsPage
 *
 * The main page component for managing products in the admin panel.
 *
 * @param {Object} props
 * @param {Object} props.searchParams - Query parameters from the URL.
 * @param {string} props.searchParams.page - Current page number (string from URL).
 *
 * @returns {JSX.Element} - The full product management interface.
 *
 * Render Logic:
 * - Determines `page` from `searchParams` (defaults to 1).
 * - If page < 0 → redirects to `/admin/products`.
 * - Fetches both products (for the current page) and total product count concurrently.
 * - Calculates `totalPages` from `totalProducts`.
 * - If `page > totalPages` → redirects to `/admin/products`.
 * - Renders:
 *   1. Heading: "Manage Products"
 *   2. "Create Product" button (links to `/admin/products/new`).
 *   3. Product search form (`ProductSearchForm`).
 *   4. Product table (`ProductTable`) with current page results.
 *   5. Pagination controls (`ProductsPagination`) at the bottom.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;
  if (page < 0) redirect("/admin/products");
  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Manage Products</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Create Product
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
