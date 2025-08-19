/**
 * route.ts
 *
 * API route for retrieving pending orders in the admin panel.
 *
 * Responsibilities:
 * - Handles HTTP GET requests to `/admin/orders/api`.
 * - Queries the database for orders with `status: false` (pending orders).
 * - Includes related order products and their associated product details.
 * - Returns the data as a JSON response.
 *
 * Dependencies:
 * - `prisma`: Database ORM client for interacting with the underlying database.
 *
 * Dynamic Rendering:
 * - `export const dynamic = 'force-dynamic'`
 *   Ensures this route is always server-rendered dynamically
 *   instead of being statically cached by Next.js.
 */

import { prisma } from "@/src/lib/prisma";

// Force dynamic rendering (important for real-time updates)
export const dynamic = "force-dynamic";

/**
 * GET Handler
 *
 * Fetches all pending orders (status = false) with their related products.
 *
 * Data Model:
 * - `order` (base entity)
 * - `orderProducts` (intermediate join table for products in an order)
 * - `product` (details of each product in the order)
 *
 * Example Response:
 * [
 *   {
 *     id: 1,
 *     status: false,
 *     orderProducts: [
 *       {
 *         id: 10,
 *         quantity: 2,
 *         product: {
 *           id: 101,
 *           name: "Product Name",
 *           price: 29.99
 *         }
 *       }
 *     ]
 *   }
 * ]
 *
 * @returns {Response} JSON array of pending orders with products
 */
export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: false, // fetch only pending orders
    },
    include: {
      orderProducts: {
        include: {
          product: true, // include product details in the response
        },
      },
    },
  });

  return Response.json(orders);
}
