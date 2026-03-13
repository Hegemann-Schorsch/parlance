"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

const STEP_CODE = [
  `# Query Decomposition
question = "What % of mortgage portfolio has LTV > 80%?"

decomposed = agent.decompose(question)
# → sub_query_1: SQL aggregation on mortgage_portfolio
# → sub_query_2: No text retrieval needed
# → data_source: "mortgage_portfolio_db"
# → filter: "ltv_ratio > 0.80"`,

  `# Semantic Search over Documents
results = vector_store.search(
  query="LTV threshold regulatory guidance",
  k=5,
  rerank=True
)
# [0] Basel III Annex 7, p.12  score: 0.91
# [1] Internal Credit Policy v4  score: 0.87
# [2] EBA LTV Guidelines 2023  score: 0.84`,

  `-- SQL Generation & Execution
SELECT
  ROUND(
    COUNT(*) FILTER (WHERE ltv_ratio > 0.80)
    * 100.0 / COUNT(*), 1
  ) AS pct_high_ltv,
  COUNT(*) FILTER (WHERE ltv_ratio > 0.80) AS n_high,
  COUNT(*) AS n_total
FROM mortgage_portfolio
WHERE reporting_date = CURRENT_DATE;
-- Result: 34.2% (2,671 / 7,803)`,

  `# Answer Synthesis
answer = synthesizer.compose(
  sql_result={"pct_high_ltv": 34.2, "n_high": 2671},
  text_context=eba_guidelines,
  confidence="high"
)
# "34.2% of mortgages exceed LTV 80%.
#  This exceeds the EBA recommended threshold
#  of 20% and warrants credit policy review."`,
];

export default function HowItWorks() {
  const t = useTranslations("solution");
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
    tag: string;
  }>;

  return (
    <section id="technology" ref={ref} className="py-32 lg:py-40 bg-white">
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

        {/* Interactive Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Step selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-2xl p-6 border transition-all duration-200 ${
                  activeStep === i
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`text-2xl font-bold font-mono transition-colors ${
                      activeStep === i
                        ? "text-blue-600"
                        : "text-slate-200"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold transition-colors ${
                          activeStep === i
                            ? "text-slate-900"
                            : "text-slate-600"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">
                        {step.tag}
                      </span>
                    </div>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-slate-500 leading-relaxed mt-2"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-28"
          >
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/30">
              <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-2 text-xs text-slate-400 font-mono">
                  step_{String(activeStep + 1).padStart(2, "0")}.py
                </span>
                <span className="ml-auto text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                  {steps[activeStep]?.tag}
                </span>
              </div>
              <div className="bg-slate-950 p-6 min-h-[300px]">
                <motion.pre
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-mono leading-relaxed overflow-x-auto"
                >
                  {STEP_CODE[activeStep].split("\n").map((line, i) => {
                    const isComment = line.trim().startsWith("#") || line.trim().startsWith("--");
                    const isKeyword =
                      /^(SELECT|FROM|WHERE|WITH|GROUP|ORDER|ROUND|COUNT|SUM|CASE|WHEN|THEN|END|AND|OR|AS|JOIN|ON|LIMIT|FILTER)\b/.test(
                        line.trim().toUpperCase()
                      );
                    return (
                      <div key={i}>
                        {isComment ? (
                          <span className="text-slate-500">{line}</span>
                        ) : isKeyword ? (
                          <span>
                            <span className="text-blue-400">{line.match(/^\s*/)?.[0]}</span>
                            {line.trim().split(" ").map((word, j) => (
                              <span
                                key={j}
                                className={
                                  /^(SELECT|FROM|WHERE|WITH|GROUP|ORDER|ROUND|COUNT|SUM|CASE|WHEN|THEN|END|AND|OR|AS|JOIN|ON|LIMIT|FILTER)$/.test(
                                    word.replace(/[(),]/g, "").toUpperCase()
                                  )
                                    ? "text-purple-400"
                                    : "text-slate-200"
                                }
                              >
                                {j > 0 ? " " : ""}
                                {word}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="text-slate-200">{line}</span>
                        )}
                        {"\n"}
                      </div>
                    );
                  })}
                </motion.pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
