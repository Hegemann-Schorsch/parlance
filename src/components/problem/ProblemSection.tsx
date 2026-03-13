"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, AlertTriangle } from "lucide-react";

export default function ProblemSection() {
  const t = useTranslations("problem");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const ragPoints = t.raw("ragPoints") as string[];
  const ourPoints = t.raw("ourPoints") as string[];

  return (
    <section id="product" ref={ref} className="py-32 lg:py-40 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Badge + Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-6">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t("headline")}
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">{t("subline")}</p>
        </motion.div>

        {/* Concrete Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <AlertTriangle size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t("example.label")}
              </span>
            </div>
            <div className="p-8">
              <p className="text-slate-800 font-medium text-base mb-6 leading-relaxed">
                {t("example.question")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-red-50 border border-red-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <X size={14} className="text-red-500" />
                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                      {t("example.ragResult")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 italic">{t("example.explanation")}</p>
                </div>
                <div className="rounded-xl bg-green-50 border border-green-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Check size={14} className="text-green-600" />
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                      {t("example.correctResult")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">SQL-backed exact computation.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* RAG */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm"
          >
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                <X size={14} className="text-red-500" />
              </span>
              {t("ragTitle")}
            </h3>
            <ul className="space-y-4">
              {ragPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-500 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm"
          >
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Check size={14} className="text-blue-600" />
              </span>
              {t("ourTitle")}
            </h3>
            <ul className="space-y-4">
              {ourPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
