/**
 * MadeBy.tsx
 *
 * A reusable component for the credits of the site, and link to portfolio
 *
 */

import Link from "next/link";
export default function MadeBy() {
  return (
    <div
      className="flex justify-center mt-5 mb-5 bg-amber-50 hover:bg-amber-300 border border-solid border-orange-100
"
    >
      Made with 🍟 by &nbsp;
      <Link
        className="text-orange-500 hover:text-white"
        href="https://federicosavastano.vercel.app"
        target="_blank"
      >
        {" "}
        Federico Savastano
      </Link>
    </div>
  );
}
