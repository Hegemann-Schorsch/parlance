"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "en" ? "de" : "en";

  const navLinks = [
    { href: "#product", label: t("product") },
    { href: "#technology", label: t("technology") },
    { href: "#use-cases", label: t("useCases") },
    { href: "#team", label: t("team") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-900 dark:bg-blue-600 flex items-center justify-center">
              <span className="text-white font-mono font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Parlance
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Lang + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/${otherLocale}`}
              className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1"
            >
              {otherLocale}
            </Link>
            <a
              href="#contact"
              className="bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              {t("requestDemo")}
            </a>
          </div>

          {/* Mobile: Lang + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={`/${otherLocale}`}
              className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
            >
              {otherLocale}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-blue-900 dark:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                {t("requestDemo")}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
