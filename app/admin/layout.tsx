import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";

/**
 * AdminLayout component
 *
 * This is a Next.js layout component used to wrap admin pages.
 * It provides a consistent layout with a sidebar for navigation,
 * a main content area, and a toast notification system.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered in the main area of the layout.
 *
 * @returns {JSX.Element} The layout with a sidebar, main content area, and toast notifications.
 */
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <aside className="md:w-72 md:h-screen bg-white">
          <AdminSidebar />
        </aside>

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
          {children}
        </main>
      </div>

      <ToastNotification />
    </>
  );
}
