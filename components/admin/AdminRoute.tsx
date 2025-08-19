"use client" 
// Marks this as a Client Component in Next.js 13+ (required because we're using hooks like usePathname)

import Link from "next/link"
import { usePathname } from "next/navigation"

// -----------------------------
// Types
// -----------------------------
/**
 * Props for the AdminRoute component
 * @property link - Object describing the route link
 * @property link.url - Path to navigate to
 * @property link.text - Display text for the link
 * @property link.blank - Whether the link should open in a new tab
 */
type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  }
}

// -----------------------------
// Component: AdminRoute
// -----------------------------
/**
 * Renders a navigation link for the admin panel, 
 * highlighting it if it's the active route.
 * 
 * @param {AdminRouteProps} props - Contains the link configuration.
 * @returns JSX element for the admin navigation link.
 */
export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname() // Get the current URL path from Next.js navigation
  const isActive = pathname.startsWith(link.url) 
  // Checks if the current path begins with the link URL (for active state highlighting)

  return (
    <Link
      className={`${isActive ? 'bg-amber-400' : ''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      // Conditional class: adds amber background if the link is active
      href={link.url}
      target={link.blank ? '_blank' : ''} // Opens in new tab if link.blank is true
    >
      {link.text}
    </Link>
  )
}
