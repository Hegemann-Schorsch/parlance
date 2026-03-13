"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

export default function BenchmarkSection() {
  const t = useTranslations("benchmarks");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const methods = t.raw("methods") as Array<{
    name: string;
    scores: number[];
    highlight: boolean;
  }>;
  const tableHeaders = t.raw("tableHeaders") as string[];

  const maxScore = 60;
  const benchmarks = tableHeaders.slice(1, 4);

  return (
    <section ref={ref} className="py-32 lg:py-40 bg-slate-50">
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

        {/* Bar chart viz */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 p-10 mb-8 overflow-x-auto shadow-sm"
        >
          <div className="min-w-[600px]">
            {/* Benchmark columns */}
            <div className="grid grid-cols-3 gap-10">
              {benchmarks.map((bm, bIdx) => (
                <div key={bm}>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 text-center">
                    {bm}
                  </div>
                  <div className="space-y-4">
                    {methods.map((method, mIdx) => (
                      <div key={method.name} className="flex items-center gap-3">
                        <div className="w-24 text-xs text-slate-400 truncate text-right shrink-0">
                          {method.highlight ? (
                            <span className="font-bold text-blue-700">
                              Parlance
                            </span>
                          ) : (
                            method.name
                          )}
                        </div>
                        <div className="flex-1 h-7 bg-slate-100 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(method.scores[bIdx] / maxScore) * 100}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.4 + mIdx * 0.1 }}
                            className={`h-full flex items-center justify-end pr-2 rounded-lg ${
                              method.highlight
                                ? "bg-gradient-to-r from-blue-700 to-blue-500"
                                : "bg-slate-200"
                            }`}
                          >
                            <span
                              className={`text-xs font-bold ${
                                method.highlight ? "text-white" : "text-slate-500"
                              }`}
                            >
                              {method.scores[bIdx]}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 rounded-2xl p-7"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{t("improvement")}</div>
              <div className="text-sm text-slate-400 mt-1">{t("note")}</div>
            </div>
          </div>
          <a
            href="https://arxiv.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            <span>{t("paperNote")}</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
