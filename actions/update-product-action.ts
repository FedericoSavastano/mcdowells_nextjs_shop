/**
 * update-product-action.ts
 *
 * Server Action used to update an existing product in the database.
 *
 * This function validates the incoming product data against the `ProductSchema`
 * (Zod), and if valid, updates the product record using Prisma.
 * After updating, it triggers a cache revalidation for the admin products page
 * to ensure the UI reflects the latest changes.
 *
 * Dependencies:
 * - `@/src/lib/prisma`: Prisma client for database operations.
 * - `@/src/schema`: Contains `ProductSchema` (Zod schema for validation).
 * - `next/cache`: Provides `revalidatePath` for cache invalidation.
 */

"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

/**
 * Updates an existing product in the database.
 *
 * @param {unknown} data - Incoming data (expected to match `ProductSchema`).
 * @param {number} id - The ID of the product to update.
 *
 * Process:
 * 1. Validates incoming data using `ProductSchema`.
 * 2. If validation fails, returns validation errors.
 * 3. If valid, updates the product in the database by ID.
 * 4. Calls `revalidatePath('/admin/products')` to refresh the admin UI.
 *
 * @returns {Promise<{ errors?: any } | void>}
 *          - Returns validation errors if input is invalid.
 *          - Otherwise, updates the product and triggers cache revalidation.
 */
export async function updateProduct(data: unknown, id: number) {
  // Validate incoming product data
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    // Return Zod validation errors if schema check fails
    return {
      errors: result.error.issues,
    };
  }

  // Update the product in the database by ID with validated data
  await prisma.product.update({
    where: {
      id,
    },
    data: result.data,
  });

  // Invalidate cache to ensure UI shows the latest product updates
  revalidatePath("/admin/products");
}
