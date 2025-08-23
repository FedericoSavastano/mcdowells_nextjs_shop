import { prisma } from "@/src/lib/prisma";

/**
 * Dynamic rendering configuration for this API route.
 *
 * Setting this to `'force-dynamic'` ensures that this route is always
 * dynamically evaluated on each request instead of being cached.
 */
export const dynamic = "force-dynamic";

/**
 * GET handler for the `/orders/api` route.
 *
 * This endpoint retrieves the **latest 5 completed or ready orders** from the database.
 * - Orders are considered "ready" if they have a non-null `orderReadyAt` timestamp.
 * - The results are ordered by `orderReadyAt` in descending order (most recent first).
 * - Each order includes its related `orderProducts` and their associated `product` details.
 *
 * @async
 * @function GET
 * @returns {Promise<Response>} A JSON response containing an array of order objects.
 *
 * @example
 * // Example response structure
 * [
 *   {
 *     id: "order_123",
 *     orderReadyAt: "2025-08-18T14:25:00Z",
 *     orderProducts: [
 *       {
 *         id: "op_456",
 *         product: {
 *           id: "prod_789",
 *           name: "Example Product",
 *           price: 12.99
 *         }
 *       }
 *     ]
 *   }
 * ]
 */
export async function GET() {
  const orders = await prisma.order.findMany({
    take: 5,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(orders);
}
