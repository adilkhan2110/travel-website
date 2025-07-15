import SideNav from "../../../components/admin/master/sidenav"; // Correct path based on file structure
import AdminHeader from "../../../components/admin/master/header"; // Correct path based on file structure
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "2 Your Gateway to Amazing Destinations",
  description:
    "Discover incredible travel destinations with Arisha Tours and Travels. We offer holiday packages, visa services, hotel bookings, and complete travel solutions.",
  keywords:
    "travel, tours, holidays, visa services, hotel booking, travel insurance, flights, arisha tours",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SideNav />
        {/* <AdminHeader /> */}
        <main className="ml-0 md:ml-64 p-6">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
