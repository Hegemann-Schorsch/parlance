"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, ChevronRight, Check } from "lucide-react";
import { demoResponses, getBestMatch } from "@/data/demo-responses";

type RunState = "idle" | "running" | "done";

export default function PlaygroundSection() {
  const t = useTranslations("demo");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [query, setQuery] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState<(typeof demoResponses)[0] | null>(null);

  const suggestions = t.raw("suggestions") as string[];

  const runDemo = (q: string) => {
    if (runState === "running") return;
    const matched = getBestMatch(q || suggestions[0]);
    setResult(matched);
    setRunState("running");
    setCurrentStep(0);

    matched.steps.forEach((_, i) => {
      setTimeout(
        () => {
          setCurrentStep(i);
          if (i === matched.steps.length - 1) {
            setTimeout(() => setRunState("done"), 800);
          }
        },
        i * 1400
      );
    });
  };

  const reset = () => {
    setRunState("idle");
    setCurrentStep(-1);
    setResult(null);
    setQuery("");
  };

  return (
    <section ref={ref} className="py-32 lg:py-40 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-6">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            {t("headline")}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">{t("subline")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runDemo(query)}
                placeholder={t("placeholder")}
                disabled={runState === "running"}
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-blue-600 rounded-xl px-5 py-4 text-white placeholder-slate-500 text-sm outline-none transition-colors disabled:opacity-50"
              />
              {runState === "done" ? (
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Reset
                </button>
              ) : (
                <button
                  onClick={() => runDemo(query)}
                  disabled={runState === "running"}
                  className="px-6 py-4 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
                >
                  {runState === "running" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      {t("runButton")}
                      <Send size={14} />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Suggestions */}
            {runState === "idle" && (
              <div className="mt-5">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mr-3">
                  {t("suggestedLabel")}
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(s);
                        runDemo(s);
                      }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg px-3.5 py-2 transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Pipeline visualization */}
          <AnimatePresence>
            {runState !== "idle" && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Step tabs */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  {result.steps.map((step, i) => (
                    <button
                      key={i}
                      onClick={() => i <= currentStep && setCurrentStep(i)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        i === currentStep
                          ? "bg-blue-700 text-white"
                          : i < currentStep
                          ? "bg-slate-800 text-green-400"
                          : "bg-slate-900 text-slate-600 cursor-not-allowed"
                      }`}
                    >
                      {i < currentStep ? (
                        <Check size={12} />
                      ) : i === currentStep ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                      {step.label}
                    </button>
                  ))}
                  {runState === "done" && (
                    <button
                      onClick={() => setCurrentStep(-2)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        currentStep === -2
                          ? "bg-green-600 text-white"
                          : "bg-green-900/30 text-green-400"
                      }`}
                    >
                      <Check size={12} />
                      Final Answer
                    </button>
                  )}
                </div>

                {/* Step content */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden min-h-[320px]">
                  <AnimatePresence mode="wait">
                    {currentStep >= 0 && currentStep < result.steps.length && currentStep !== -2 && (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-7"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <h4 className="text-sm font-semibold text-white">
                            {result.steps[currentStep].label}
                          </h4>
                          <span className="text-xs text-slate-400">
                            {result.steps[currentStep].content}
                          </span>
                        </div>
                        {result.steps[currentStep].code && (
                          <div className="bg-slate-950 rounded-xl p-5">
                            <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto whitespace-pre">
                              {result.steps[currentStep].code}
                            </pre>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Final answer */}
                    {(currentStep === -2 || (runState === "done" && currentStep === result.steps.length - 1)) && (
                      <motion.div
                        key="final"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-7"
                      >
                        <div className="flex items-center gap-2 mb-5">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold text-green-400">
                            Final Answer
                          </span>
                        </div>
                        <div className="bg-green-950/30 border border-green-900/40 rounded-xl p-6">
                          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                            {result.finalAnswer.replace(/\*\*(.*?)\*\*/g, "$1")}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                          <ChevronRight size={12} />
                          Computed via SQL · Cross-validated with documents · Full audit trail available
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
