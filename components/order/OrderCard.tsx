import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

// -----------------------------
// Types
// -----------------------------
/**
 * Props for the OrderCard component.
 * @property order - The order object containing customer details, products, and total amount.
 */
type OrderCardProps = {
  order: OrderWithProducts;
};

// -----------------------------
// Component: OrderCard
// -----------------------------
/**
 * Displays full details of an order, including:
 * - Customer name
 * - Ordered products with quantities
 * - Total amount (formatted as currency)
 * - A form to mark the order as completed
 *
 * @param {OrderCardProps} props - Contains the order information.
 * @returns JSX section showing order details and completion form.
 */
export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4"
    >
      {/* Customer name */}
      <p className="text-2xl font-medium text-gray-900">Client: {order.name}</p>

      {/* Section title for product list */}
      <p className="text-lg font-medium text-gray-900">Ordered Products:</p>

      {/* Ordered products */}
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-2 border-t border-gray-200 pt-4"
          >
            {/* Product quantity */}
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">
                ({product.quantity}) {""}
              </span>
            </dt>

            {/* Product name */}
            <dd className="text-sm font-medium text-gray-900">
              {product.product.name}
            </dd>
          </div>
        ))}

        {/* Order total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total to pay:</dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      {/* Completion form */}
      <form action={completeOrder}>
        {/* Hidden field with order ID */}
        <input type="hidden" value={order.id} name="order_id" />

        {/* Submit button */}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Mark Order As Complete"
        />
      </form>
    </section>
  );
}
