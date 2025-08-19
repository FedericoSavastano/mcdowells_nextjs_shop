/**
 * Logo.tsx
 *
 * A reusable component for the main logo of the site
 *
 */
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-40">
        <Image fill alt="Mc Dowell's Logo" src="/mcdowellslogo.webp" />
      </div>
    </div>
  );
}
