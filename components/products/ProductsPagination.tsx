/**
 * ProductsPagination.tsx
 * -----------------------
 * A pagination component for navigating through product pages in the admin panel.
 *
 * Dependencies:
 * - `Link` from Next.js for client-side navigation between pages
 *
 * Role:
 * Displays page numbers and next/previous arrows for paginated product lists.
 * Highlights the current page and disables navigation when at the first or last page.
 */

import Link from "next/link";

type ProductsPaginationProps = {
  page: number; // Current page number
  totalPages: number; // Total number of pages available
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  // Generate an array of page numbers [1, 2, 3, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {/* Previous page link */}
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {/* Page number links */}
      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`${
            page === currentPage && "font-black"
          } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {/* Next page link */}
      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
