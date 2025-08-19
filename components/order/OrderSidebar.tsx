import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

// -----------------------------
// Data Fetching: getCategories
// -----------------------------
/**
 * Fetches all product categories from the database using Prisma.
 *
 * @returns Promise resolving to an array of category objects.
 */
async function getCategories() {
  return await prisma.category.findMany();
}

// -----------------------------
// Component: OrderSidebar
// -----------------------------
/**
 * Displays the sidebar for the ordering interface, including:
 * - The application logo
 * - A list of categories (each rendered with CategoryIcon)
 *
 * This component is async because it fetches data on the server
 * before rendering.
 *
 * @returns JSX aside element containing logo and category navigation.
 */
export default async function OrderSidebar() {
  const categories = await getCategories(); // Fetch categories from DB

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      {/* Brand logo at the top */}
      <Logo />

      {/* Category navigation */}
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon
            key={category.id} // Unique key for React list rendering
            category={category} // Pass category data to icon component
          />
        ))}
      </nav>
    </aside>
  );
}
