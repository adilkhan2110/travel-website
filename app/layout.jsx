// app/layout.js or app/layout.tsx
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Arisha Tours and Travels - Your Gateway to Amazing Destinations",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
