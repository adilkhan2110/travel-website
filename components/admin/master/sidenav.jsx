'use client'; // If using Next.js 13+ with app directory

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // npm install lucide-react

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
  const links = [
    { href: '/gallery-view', label: 'gallery view' },
    { href: '/add-tour-package', label: 'Tour' },
    { href: '/packages', label: 'Packages' },
    { href: '/visa-services', label: 'Visa Services' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="flex flex-col space-y-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="hover:bg-gray-700 p-2 rounded"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
