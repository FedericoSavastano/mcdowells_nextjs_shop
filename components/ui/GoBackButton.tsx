/**
 * GoBackButton.tsx
 *
 * A simple client-side button component that navigates the user
 * back to the previous page in the browser history.
 *
 * Dependencies:
 * - `useRouter` from `next/navigation` to access Next.js router methods.
 */

"use client";

import { useRouter } from "next/navigation";

/**
 * Renders a styled "Back" button that navigates to the previous page.
 *
 * @returns {JSX.Element} A button that triggers `router.back()` when clicked.
 */
export default function GoBackButton() {
  const router = useRouter(); // Next.js router hook for navigation control

  return (
    <button
      // When clicked, go back in browser history
      onClick={() => router.back()}
      className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
    >
      Back
    </button>
  );
}
