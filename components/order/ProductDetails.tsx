import { XCircleIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";
import { useMemo } from "react";

// -----------------------------
// Types
// -----------------------------
/**
 * Props for the ProductDetails component.
 * @property item - The order item, including quantity, price, and subtotal.
 */
type ProductDetailsProps = {
  item: OrderItem;
};

// -----------------------------
// Constants
// -----------------------------
/** Minimum quantity allowed for an item */
const MIN_ITEMS = 1;
/** Maximum quantity allowed for an item */
const MAX_ITEMS = 5;

// -----------------------------
// Component: ProductDetails
// -----------------------------
/**
 * Displays details for a single product in the order, including:
 * - Name, price, and subtotal
 * - Controls to increase/decrease quantity (with min/max limits)
 * - A remove button to delete the item from the order
 *
 * Uses Zustand store actions for state management.
 *
 * @param {ProductDetailsProps} props - The product item details.
 * @returns JSX element showing product information and quantity controls.
 */
export default function ProductDetails({ item }: ProductDetailsProps) {
  // Zustand store actions
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);

  // Disable buttons when at min or max quantity
  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEMS,
    [item]
  );
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white border-t border-gray-200">
      <div className="space-y-4">
        {/* Product name and remove button */}
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name}</p>
          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>

        {/* Product price */}
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="disabled:opacity-10"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
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
