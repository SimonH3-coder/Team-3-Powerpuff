import { useState } from "react";
import Container from "./Container";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Community", "Tutorials"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

function AccordionColumn({ column }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 lg:border-none">
      {/* Mobile accordion trigger */}
      <button
        className="flex w-full items-center justify-between py-4 lg:hidden text-left focus:outline-none focus:ring-2 focus:ring-sky rounded"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`Toggle ${column.title} links`}
      >
        <span className="text-sm font-semibold text-white uppercase tracking-wider">
          {column.title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop always-visible title */}
      <h3 className="hidden lg:block text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {column.title}
      </h3>

      {/* Links list */}
      <ul
        className={`space-y-2 overflow-hidden transition-all duration-300 lg:!max-h-none lg:!opacity-100 lg:!pb-0 ${
          open ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {column.links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-sky transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded px-1"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8">
      <Container>
        {/* Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-12">
          {columns.map((col) => (
            <AccordionColumn key={col.title} column={col} />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Raíces. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Made with 💚 for the Canary Islands
          </p>
        </div>
      </Container>
    </footer>
  );
}
