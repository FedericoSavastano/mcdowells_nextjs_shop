import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

/**
 * Store interface that defines the shape of the Zustand store.
 */
interface Store {
  /** The list of products currently in the order */
  order: OrderItem[];

  /**
   * Add a product to the order.
   * - If the product already exists, increases its quantity by 1.
   * - Otherwise, adds it as a new item with quantity = 1.
   *
   * @param {Product} product - The product to add to the order.
   */
  addToOrder: (product: Product) => void;

  /**
   * Increase the quantity of a given product in the order by 1.
   *
   * @param {Product['id']} id - The ID of the product to update.
   */
  increaseQuantity: (id: Product["id"]) => void;

  /**
   * Decrease the quantity of a given product in the order by 1.
   *
   * @param {Product['id']} id - The ID of the product to update.
   */
  decreaseQuantity: (id: Product["id"]) => void;

  /**
   * Remove a product completely from the order.
   *
   * @param {Product['id']} id - The ID of the product to remove.
   */
  removeItem: (id: Product["id"]) => void;

  /**
   * Clear the entire order, resetting it to an empty array.
   */
  clearOrder: () => void;
}

/**
 * Zustand store hook for managing the shopping order state.
 *
 * This store:
 * - Keeps track of products in the current order.
 * - Allows adding, removing, increasing, and decreasing product quantities.
 * - Provides a method to clear the order.
 *
 * @example
 * const { order, addToOrder, increaseQuantity } = useStore()
 * addToOrder(product)
 * increaseQuantity(product.id)
 */
export const useStore = create<Store>((set, get) => ({
  order: [],

  addToOrder: (product) => {
    const { categoryId, image, ...data } = product;
    let order: OrderItem[] = [];

    // If product already exists, increase its quantity
    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      // Otherwise, add as a new item
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    set(() => ({ order }));
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },

  decreaseQuantity: (id) => {
    const order = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
          }
        : item
    );

    set(() => ({ order }));
  },

  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },

  clearOrder: () => {
    set(() => ({ order: [] }));
  },
}));
