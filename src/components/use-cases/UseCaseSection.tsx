"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { FileText, Scale, BarChart3 } from "lucide-react";

const icons = [
  <FileText key="doc" size={22} className="text-blue-600" />,
  <Scale key="scale" size={22} className="text-indigo-600" />,
  <BarChart3 key="chart" size={22} className="text-slate-600" />,
];

const cardStyles = [
  "bg-white border-slate-200",
  "bg-white border-slate-200",
  "bg-white border-slate-200",
];

const iconBg = [
  "bg-blue-50",
  "bg-indigo-50",
  "bg-slate-100",
];

const tagColors = [
  "text-blue-700 bg-blue-50",
  "text-indigo-700 bg-indigo-50",
  "text-slate-600 bg-slate-100",
];

export default function UseCaseSection() {
  const t = useTranslations("useCases");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cases = t.raw("cases") as Array<{
    title: string;
    description: string;
    exampleQuery: string;
    tag: string;
  }>;

  return (
    <section id="use-cases" ref={ref} className="py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
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
          <p className="text-lg text-slate-500 leading-relaxed">
            {t("subline")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`rounded-2xl border p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow ${cardStyles[i]}`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg[i]}`}>
                  {icons[i]}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[i]}`}>
                  {uc.tag}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {uc.description}
                </p>
              </div>

              {/* Example query */}
              <div className="mt-auto pt-5 border-t border-slate-100">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
                  Example query
                </div>
                <div className="bg-slate-950 rounded-xl px-4 py-3.5">
                  <p className="text-xs font-mono text-green-400 leading-relaxed">
                    "{uc.exampleQuery}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
