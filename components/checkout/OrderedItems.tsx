import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";

// -----------------------------
// Types
// -----------------------------
/**
 * Props for the OrderedItems component.
 * @property item - The order item, including quantity, price, and subtotal.
 */
type OrderedItemsProps = {
  item: OrderItem;
};

// -----------------------------
// Component: OrderedItems
// -----------------------------
/**
 * Displays details for a single product in the order in checkout, including:
 * - Name, price, and subtotal
 *
 * @param {OrderedItemsProps} props - The product item details.
 * @returns JSX element showing product information and quantity controls.
 */
export default function OrderedItems({ item }: OrderedItemsProps) {
  return (
    <div className="shadow space-y-1 p-4 bg-white border-t border-gray-200">
      <div className="space-y-4">
        {/* Product details  */}
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">
            {item.name} (x {item.quantity}) {formatCurrency(item.price)}
          </p>
        </div>

        {/* Subtotal */}
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
