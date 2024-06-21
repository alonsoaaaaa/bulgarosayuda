import { CakeIcon, Heading1 } from "lucide-react";
import React from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/groups", label: "Grupos" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/blog", label: "Recetas" },
  { href: "/calculator", label: "Calculadora" },
  { href: "/explain", label: "Pregunta IA" },
];
function Navbar() {
  return (
    <header className="flex items-center justify-center bg-gradient-to-r from-fuchsia-300 to-fuchsia-500 h-[10vh] max-sm:h-[20vh] transition-colors duration-500 ease-in-out">
      <nav className="flex items-center gap-3 flex-wrap justify-evenly">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-700 font-serif font-semibold text-lg hover:underline max-md:w-min"
            style={{ fontSize: "1rem" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
