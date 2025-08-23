"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-900 text-white flex items-center justify-between p-4">
        <div className="text-xl font-bold">Arisha Travels </div>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex-col p-4">
        <div className="text-2xl font-bold mb-8">Arisha Travels </div>
        <NavLinks />
      </aside>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4 space-y-4">
          <NavLinks onLinkClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}

function NavLinks({ onLinkClick }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/add-tour-package", label: "Tour Package" },
    { href: "/holiday", label: "Holiday" },
    { href: "/gallery-view", label: "Gallery View" },
    { href: "/visa-update", label: "Visa Services" },
    { href: "/banner-image", label: "Banner image" },
    { href: "/jaipur-sightseeing", label: "Jaipur Sightseeing" },
    { href: "/cars", label: "Car rentel" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    if (onLinkClick) onLinkClick();
    router.push("/login");
    toast("Image updated successfully", {
      type: "success",
    });
  };

  return (
    <nav className="flex flex-col space-y-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={clsx(
              "p-2 rounded transition-colors duration-200",
              isActive
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-700 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        );
      })}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 p-2 rounded bg-red-600 hover:bg-red-700 transition-colors duration-200 text-left"
      >
        Logout
      </button>
    </nav>
  );
}
