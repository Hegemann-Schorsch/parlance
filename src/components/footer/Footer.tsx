"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Linkedin, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const navLinks = [
    { href: "#product", label: t("links.product") },
    { href: "#technology", label: t("links.technology") },
    { href: "#use-cases", label: t("links.useCases") },
    { href: "#team", label: t("links.team") },
  ];

  const legalLinks = [
    { href: `/${locale}/impressum`, label: t("links.impressum") },
    { href: `/${locale}/datenschutz`, label: t("links.datenschutz") },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-mono font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-lg text-white">Parlance</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <p className="text-sm text-slate-500 mt-3">{t("builtIn")}</p>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Product
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Links
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/magpieprojects/robo-credit-analyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  arXiv Paper
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">{t("copyright")}</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
