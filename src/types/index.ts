import { Order, OrderProducts, Product } from "@prisma/client";

/**
 * Represents a single product item within a customer's order.
 *
 * - Extends the `Product` type from Prisma, but only keeps `id`, `name`, and `price`.
 * - Adds `quantity` to track how many of the product were ordered.
 * - Adds `subtotal` to represent the total cost for that product (`price * quantity`).
 *
 * @typedef {Object} OrderItem
 * @property {number} id - The product's unique identifier.
 * @property {string} name - The product name.
 * @property {number} price - The price of a single unit of the product.
 * @property {number} quantity - How many units of the product are in the order.
 * @property {number} subtotal - The total cost for this product line.
 */
export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

/**
 * Represents an order with all its associated products.
 *
 * - Extends Prisma's `Order` model.
 * - Includes an array of `orderProducts`, where each entry:
 *   - Extends `OrderProducts` (the join table between orders and products).
 *   - Includes the full `Product` object for convenience.
 *
 * This type is used when fetching orders from the database and returning them
 * with their related product details.
 *
 * @typedef {Object} OrderWithProducts
 * @property {number} id - The unique order identifier.
 * @property {Date} createdAt - When the order was created.
 * @property {Date | null} orderReadyAt - When the order was marked ready (if applicable).
 * @property {Array<OrderProducts & { product: Product }>} orderProducts - The products included in the order, each with full product details.
 */
export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};
