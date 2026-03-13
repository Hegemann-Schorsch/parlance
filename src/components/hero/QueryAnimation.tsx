"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUERY =
  "What percentage of our mortgage portfolio has an LTV ratio above 80%?";

const SQL = `SELECT
  ROUND(
    COUNT(*) FILTER (WHERE ltv_ratio > 0.80)
    * 100.0 / COUNT(*), 1
  ) AS pct_high_ltv
FROM mortgage_portfolio
WHERE reporting_date = '2024-03-31';`;

const RESULT = "34.2%";
const RESULT_DETAIL = "2,671 of 7,803 mortgages exceed LTV 80%";

type Phase = "query" | "decompose" | "sql" | "result";

export default function QueryAnimation() {
  const [phase, setPhase] = useState<Phase>("query");
  const [typedSQL, setTypedSQL] = useState("");
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    setPhase("query");
    setTypedSQL("");

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("decompose"), 2000));
    timers.push(setTimeout(() => setPhase("sql"), 4000));
    timers.push(setTimeout(() => setPhase("result"), 7000));
    timers.push(setTimeout(() => setLoopKey((k) => k + 1), 10000));

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  // SQL typing effect
  useEffect(() => {
    if (phase !== "sql") return;
    setTypedSQL("");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= SQL.length) {
        clearInterval(interval);
        return;
      }
      setTypedSQL(SQL.slice(0, i + 1));
      i++;
    }, 18);
    return () => clearInterval(interval);
  }, [phase]);

  const steps = [
    { id: "query" as Phase, label: "Natural Language", color: "amber" },
    { id: "decompose" as Phase, label: "Decomposition", color: "blue" },
    { id: "sql" as Phase, label: "SQL Execution", color: "purple" },
    { id: "result" as Phase, label: "Answer", color: "green" },
  ];

  const phaseIndex = steps.findIndex((s) => s.id === phase);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-6">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={`flex items-center gap-1.5 transition-all duration-500 ${
                i <= phaseIndex ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === phaseIndex
                    ? "bg-blue-600 scale-125 shadow-lg shadow-blue-500/50"
                    : i < phaseIndex
                    ? "bg-green-500"
                    : "bg-slate-300"
                }`}
              />
              <span className="text-xs font-medium text-slate-600 hidden sm:block">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 transition-all duration-500 ${
                  i < phaseIndex ? "bg-green-400" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs font-medium text-slate-400 font-mono">
            parlance-agent
          </span>
        </div>

        <div className="p-5 min-h-[280px] flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {phase === "query" && (
              <motion.div
                key="query"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                  Input Query
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4">
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
                    "{QUERY}"
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">Analyzing...</span>
                </div>
              </motion.div>
            )}

            {phase === "decompose" && (
              <motion.div
                key="decompose"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
                  Query Decomposition
                </div>
                {[
                  { label: "Data source", value: "mortgage_portfolio", type: "db" },
                  { label: "Filter condition", value: "ltv_ratio > 0.80", type: "code" },
                  { label: "Aggregation", value: "COUNT(*) percentage", type: "code" },
                  { label: "Text retrieval", value: "Not required", type: "none" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span
                      className={`text-xs font-mono font-medium px-2 py-0.5 rounded ${
                        item.type === "db"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : item.type === "code"
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {phase === "sql" && (
              <motion.div
                key="sql"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                  Generated SQL
                </div>
                <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs leading-relaxed min-h-[160px]">
                  <pre className="text-green-400 whitespace-pre-wrap break-all">
                    {typedSQL}
                    <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse align-middle" />
                  </pre>
                </div>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">
                  Answer
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl p-5 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-5xl font-bold text-green-700 dark:text-green-400 mb-2"
                  >
                    {RESULT}
                  </motion.div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{RESULT_DETAIL}</p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Exact SQL computation · Source: mortgage_portfolio
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
