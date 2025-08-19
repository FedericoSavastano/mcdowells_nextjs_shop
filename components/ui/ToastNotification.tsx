/**
 * ToastNotification.tsx
 *
 * A client-side wrapper component for displaying toast notifications
 * using the `react-toastify` library.
 *
 * This component renders a `ToastContainer`, which acts as the
 * notification placeholder for any toast messages triggered in the app.
 *
 * Dependencies:
 * - `react-toastify` for notifications.
 * - Global CSS import from `react-toastify/dist/ReactToastify.min.css`
 *   for default styles.
 */

"use client";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

/**
 * Renders a global toast notification container.
 *
 * Place this component high in the component tree (e.g., `_app.tsx` or `layout.tsx`)
 * so that toast messages can be triggered from anywhere in the app.
 *
 * @returns {JSX.Element} A `ToastContainer` component from `react-toastify`.
 */
export default function ToastNotification() {
  return <ToastContainer />;
}
