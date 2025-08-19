/**
 * complete-orders-action.ts
 *
 * Server Action used to mark an order as complete in the database.
 *
 * This function is triggered from a form submission (via `formData`).
 * It validates the order ID using a Zod schema, updates the corresponding
 * order in the Prisma database, and then revalidates the `/admin/orders` page
 * to ensure the UI reflects the changes immediately.
 *
 * Dependencies:
 * - `next/cache`: For `revalidatePath`, ensuring UI updates after mutation.
 * - `@/src/lib/prisma`: Prisma client for database operations.
 * - `@/src/schema`: Contains `OrderIdSchema` (Zod schema for validation).
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

/**
 * Marks an order as completed in the database.
 *
 * @param {FormData} formData - The submitted form data containing `order_id`.
 *
 * Process:
 * 1. Extracts `order_id` from the form.
 * 2. Validates it using `OrderIdSchema` (Zod).
 * 3. If valid, updates the order in the DB:
 *    - Sets `status = true` (order completed).
 *    - Adds a timestamp to `orderReadyAt`.
 * 4. Revalidates the `/admin/orders` path so changes show instantly.
 *
 * @returns {Promise<void>} Does not return anything; side effects only.
 */
export async function completeOrder(formData: FormData) {
  // Extract the order ID from form data
  const data = {
    orderId: formData.get("order_id"),
  };

  // Validate input using Zod schema
  const result = OrderIdSchema.safeParse(data);

  if (result.success) {
    try {
      // Update the order in the database
      await prisma.order.update({
        where: {
          id: result.data.orderId,
        },
        data: {
          status: true, // mark as complete
          orderReadyAt: new Date(Date.now()), // store completion time
        },
      });

      // Revalidate admin orders page to show updated status
      revalidatePath("/admin/orders");
    } catch (error) {
      console.log(error); // log any DB or runtime errors
    }
  }
}
