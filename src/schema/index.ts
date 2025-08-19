import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "Your name is required"),
  total: z.number().min(1, "There are errors in the order"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "There are errors" }),
});

export const SearchSchema = z.object({
  search: z.string().trim().min(1, { message: "Search cant be empty" }),
});

export const ProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name is required" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Invalid Price" })
    .or(z.number().min(1, { message: "Category is required" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "Category is required" })
    .or(z.number().min(1, { message: "Category is required" })),
  image: z.string().min(1, { message: "Image is required" }),
});
