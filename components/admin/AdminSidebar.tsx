import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"

// -----------------------------
// Static Data: Admin Navigation Links
// -----------------------------
/**
 * List of navigation links for the admin sidebar.
 * Each link object contains:
 * - url: Route path
 * - text: Link display text
 * - blank: Whether to open the link in a new tab
 */
const adminNavigation = [
    { url: '/admin/orders', text: 'Orders', blank: false },
    { url: '/admin/products', text: 'Products', blank: false },
    { url: '/order/cafe', text: 'See shop', blank: true },
]

// -----------------------------
// Component: AdminSidebar
// -----------------------------
/**
 * Renders the admin panel's sidebar with:
 * - A logo at the top
 * - A list of navigation links (AdminRoute components)
 * 
 * @returns JSX element representing the sidebar navigation.
 */
export default function AdminSidebar() {
    return (
        <>
            {/* Application logo at the top of the sidebar */}
            <Logo />

            <div className="space-y-3">
                {/* Section title */}
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
                    Navigation
                </p>

                {/* Navigation links */}
                <nav className="flex flex-col">
                    {adminNavigation.map(link => (
                        <AdminRoute
                            key={link.url} // Ensures unique React keys for list rendering
                            link={link}    // Passes link object to AdminRoute
                        />
                    ))}
                </nav>
            </div>
        </>
    )
}
