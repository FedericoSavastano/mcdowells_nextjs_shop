import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

/**
 * Fetches products from the database that belong to a given category.
 *
 * @async
 * @function getProducts
 * @param {string} category - The slug of the category used to filter products.
 * @returns {Promise<Array>} A promise that resolves to an array of products belonging to the category.
 */
async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

/**
 * OrderPage component - Displays a list of products filtered by category.
 * This page is dynamically generated based on the `category` parameter from the route.
 *
 * @async
 * @function OrderPage
 * @param {Object} props - The props object provided by Next.js.
 * @param {Object} props.params - Route parameters from Next.js dynamic segment.
 * @param {string} props.params.category - The category slug used to fetch products.
 * @returns {Promise<JSX.Element>} The rendered page displaying a heading and a grid of product cards.
 */
export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts(params.category);

  return (
    <>
      <Heading>Choose and create your order below</Heading>

      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
