"use client"; // If using Next.js 13+ with app directory

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import clsx from "clsx"; // npm install clsx

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-900 text-white flex items-center justify-between p-4">
        <div className="text-xl font-bold">Arisha Travels</div>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex-col p-4">
        <div className="text-2xl font-bold mb-8">Arisha Travels</div>
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

  const links = [
    { href: "/add-tour-package", label: "Tour Package" },
    { href: "/holiday", label: "Holiday" },
    { href: "/gallery-view", label: "Gallery View" },
    { href: "/visa-update", label: "Visa Services" },
  ];

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
    </nav>
  );
}
