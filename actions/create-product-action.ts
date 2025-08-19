/**
 * create-product-action.ts
 *
 * Server Action used to create a new product in the database.
 *
 * This function validates incoming product data against the `ProductSchema`
 * (Zod), and if valid, persists it using Prisma.
 *
 * Dependencies:
 * - `@/src/lib/prisma`: Prisma client for database operations.
 * - `@/src/schema`: Contains `ProductSchema` (Zod schema for product validation).
 */

"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

/**
 * Creates a new product in the database.
 *
 * @param {unknown} data - Incoming data (expected to match `ProductSchema`).
 *
 * Process:
 * 1. Validates the incoming data using `ProductSchema`.
 * 2. If validation fails, returns an object with validation errors.
 * 3. If valid, creates a new product record in the database.
 *
 * @returns {Promise<{ errors?: any } | void>}
 *          - Returns validation errors if input is invalid.
 *          - Otherwise, persists the product and returns nothing.
 */
export async function createProduct(data: unknown) {
  // Validate incoming data against schema
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    // Return validation errors if validation fails
    return {
      errors: result.error.issues,
    };
  }

  // Create a new product in the database with validated data
  await prisma.product.create({
    data: result.data,
  });
}
