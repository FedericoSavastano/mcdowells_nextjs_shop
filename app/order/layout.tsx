import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

/**
 * RootLayout component - Provides the main layout structure for all pages inside the `/order` route.
 *
 * The layout includes:
 * - A sidebar for navigation or order-related options (`OrderSidebar`).
 * - A main content area where child pages will be rendered.
 * - An order summary panel (`OrderSummary`) to display the current state of the order.
 * - A global toast notification system (`ToastNotification`).
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 * @returns {JSX.Element} The structured layout wrapping the order-related pages.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>

      <ToastNotification />
    </>
  );
}
