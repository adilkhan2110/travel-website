"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "HOLIDAYS", href: "/tours" },
    { name: "JAIPUR SITE SEENS", href: "/jaipur-seens" },
    { name: "CAR RENTEL", href: "/car-rentel" },
    { name: "GALLERY", href: "/gallery" },
    { name: "VISA", href: "/visa" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-lg z-50 sticky top-0 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div>
              <img
                src={"/images/logo.png"}
                alt="Arisha Tours & Travels Logo"
                className="w-full h-20 object-cover transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-all duration-300 hover:text-emerald-600 relative ${
                  pathname === item.href ? "text-emerald-600" : "text-gray-700"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* LOGIN Button */}
            <Link
              href="/login"
              className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 shadow hover:shadow-md"
            >
              LOG IN
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-xl border-t z-40">
            <nav className="py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-semibold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${
                    pathname === item.href
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* LOGIN Button for Mobile */}
              <div className="px-4 py-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOG IN 
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
