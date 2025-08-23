/**
 * Format a number as a currency string in USD.
 *
 * @param {number} amount - The numeric amount to format.
 * @returns {string} The formatted currency string (e.g., "$1,234.56").
 *
 * @example
 * formatCurrency(1500) // "$1,500.00"
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Get the correct image path for a product.
 *
 * - If the given path is already a full Cloudinary URL, it is returned as-is.
 * - Otherwise, assumes the image is a local file under `/products/` and appends ".jpg".
 *
 * @param {string} imagePath - The raw image path or Cloudinary URL.
 * @returns {string} The resolved image URL.
 *
 * @example
 * getImagePath("coffee")
 * // "/products/coffee.jpg"
 *
 * @example
 * getImagePath("https://res.cloudinary.com/demo/image.jpg")
 * // "https://res.cloudinary.com/demo/image.jpg"
 */
export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.jpg`;
  }
}
