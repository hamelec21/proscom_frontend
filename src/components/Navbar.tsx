"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 shadow">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="w-10 sm:w-10 md:w-12 lg:w-14 lg:h-14"
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links escritorio */}
        <div className="hidden md:flex space-x-4 text-white">
          {["Inicio", "Nosotros", "Servicios", "Proyectos", "Blog", "Contacto"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Inicio" ? "" : item.toLowerCase()}`}
              className="hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Links móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out mt-2 space-y-2 px-4 text-white ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {["Inicio", "Nosotros", "Servicios", "Proyectos", "Blog", "Contacto"].map((item) => (
          <Link
            key={item}
            href={`/${item === "Inicio" ? "" : item.toLowerCase()}`}
            className="block hover:underline"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}
      </div>
    </header>
  );
}
