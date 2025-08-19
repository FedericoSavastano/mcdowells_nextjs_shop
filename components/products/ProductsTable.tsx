/**
 * ProductsTable.tsx
 * ------------------
 * A table component for displaying a list of products with their details
 * and edit links in the admin panel.
 *
 * Dependencies:
 * - `ProductsWithCategory` type from admin products page
 * - `formatCurrency` utility to format product prices
 * - `Link` from Next.js for navigation to edit pages
 *
 * Role:
 * Provides a responsive table layout showing product name, price, category,
 * and an "Edit" action for each product.
 */

import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";

type ProductTableProps = {
  products: ProductsWithCategory; // Array of products including category info
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {/* Table headers */}
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    {/* Product Name */}
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>

                    {/* Product Price */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>

                    {/* Product Category */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.category.name}
                    </td>

                    {/* Edit Action */}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Edit <span className="sr-only">, {product.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
