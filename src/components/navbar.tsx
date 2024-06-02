import { CakeIcon, Heading1 } from "lucide-react";
import React from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/calculator", label: "Calculadora" },
  { href: "/groups", label: "Grupos" },
  { href: "/recipes", label: "Recetas" },
  { href: "/login", label: "Iniciar sesión" },
];
function Navbar() {
  return (
    <header className="flex items-center justify-center bg-fuchsia-400">
      <nav className="flex items-center gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-700 font-serif font-semibold text-lg hover:underline"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
