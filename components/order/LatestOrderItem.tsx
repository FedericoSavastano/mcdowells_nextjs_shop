import { OrderWithProducts } from "@/src/types"

// -----------------------------
// Types
// -----------------------------
/**
 * Props for the LatestOrderItem component.
 * @property order - An order object including customer details and associated products.
 */
type LatestOrderItemProps = {
    order: OrderWithProducts
}

// -----------------------------
// Component: LatestOrderItem
// -----------------------------
/**
 * Displays a single order's details, including:
 * - The customer's name
 * - A list of ordered products with their quantities
 * 
 * @param {LatestOrderItemProps} props - The order data to display.
 * @returns JSX element showing order information.
 */
export default function LatestOrderItem({ order }: LatestOrderItemProps) {
    return (
        <div className="bg-white shadow p-5 space-y-5 rounded-lg">
            {/* Customer name */}
            <p className="text-2xl font-bold text-slate-600">
                Client: {order.name}
            </p>

            {/* Product list */}
            <ul
                className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                role="list"
            >
                {order.orderProducts.map(product => (
                    <li
                        key={product.id} // Unique key for React rendering
                        className="flex py-6 text-lg"
                    >
                        <p>
                            <span className="font-bold">
                                ({product.quantity}) {''} 
                                {/* Quantity of the product ordered */}
                            </span>
                            {product.product.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
