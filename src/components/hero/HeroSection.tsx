"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import QueryAnimation from "./QueryAnimation";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(226 232 240 / 0.5) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Gradient overlay — fades grid at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
      {/* Subtle blue glow top right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-600/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-28">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Agentic Text-to-SQL · Financial Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]"
            >
              {t("headline")}
              <br />
              <span className="text-blue-800">{t("headlineSub")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-lg text-slate-500 leading-relaxed max-w-lg"
            >
              {t("subline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5"
              >
                {t("cta1")}
                <ArrowRight size={16} />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              >
                {t("cta2")}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-14 flex flex-wrap gap-10 border-t border-slate-100 pt-10"
            >
              {[
                { value: "10%+", label: "Accuracy improvement" },
                { value: "<5", label: "Reasoning steps" },
                { value: "3x", label: "Benchmark coverage" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-blue-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <QueryAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300"
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
