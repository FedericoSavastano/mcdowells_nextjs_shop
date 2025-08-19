/**
 * create-order-actions.ts
 *
 * Server Action used to create a new order in the database.
 *
 * This function validates incoming order data, then persists it
 * in the database using Prisma. Each order includes:
 * - Customer `name`
 * - `total` price
 * - Related `orderProducts` (list of products with their quantities).
 *
 * Dependencies:
 * - `@/src/lib/prisma`: Prisma client for database operations.
 * - `@/src/schema`: Contains `OrderSchema` (Zod schema for validating orders).
 */

"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

/**
 * Creates a new order in the database.
 *
 * @param {unknown} data - Incoming data (expected to match `OrderSchema`).
 *
 * Process:
 * 1. Validates the provided data against `OrderSchema` (Zod).
 * 2. If validation fails, returns the error messages.
 * 3. If valid, creates a new order in the database with:
 *    - Customer `name`
 *    - `total` order amount
 *    - Related `orderProducts` (each linked to a `productId` + `quantity`).
 *
 * @returns {Promise<{ errors?: any } | void>}
 *          - Returns an object with validation errors if input is invalid.
 *          - Otherwise, performs DB insertion and returns nothing.
 */
export async function createOrder(data: unknown) {
  // Validate incoming data against schema
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    // Return validation errors if data is invalid
    return {
      errors: result.error.issues,
    };
  }

  try {
    // Create the order in the database
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          // Create related orderProducts (many-to-one relationship)
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    // Log DB or runtime errors
    console.log(error);
  }
}
