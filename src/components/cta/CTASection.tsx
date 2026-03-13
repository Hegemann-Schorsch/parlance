"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder: integrate with Formspree
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Big CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl overflow-hidden relative"
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-10 py-20 md:px-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Headline */}
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 bg-white/10 rounded-full px-3 py-1 mb-6">
                  {t("badge")}
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                  {t("headline")}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">{t("subline")}</p>

                {/* Social proof */}
                <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  {t("socialProof")}
                </div>
                <div className="mt-4 flex flex-wrap gap-5">
                  <a
                    href="https://arxiv.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    arXiv Paper
                  </a>
                  <a
                    href="https://github.com/magpieprojects/robo-credit-analyst"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    GitHub Demo
                  </a>
                </div>
              </div>

              {/* Right: Forms */}
              <div className="space-y-5">
                {/* Waitlist */}
                <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
                  <h3 className="text-white font-semibold mb-5">{t("option1Title")}</h3>
                  {submitted ? (
                    <div className="flex items-center gap-3 text-green-300">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <ArrowRight size={12} className="text-green-400" />
                      </div>
                      <span className="text-sm">Thanks! We'll be in touch.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("option1Placeholder")}
                        className="flex-1 bg-white/10 border border-white/20 focus:border-white/50 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-white text-slate-900 font-bold px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm whitespace-nowrap"
                      >
                        {t("option1Button")}
                      </button>
                    </form>
                  )}
                </div>

                {/* Calendly */}
                <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
                  <h3 className="text-white font-semibold mb-5">{t("option2Title")}</h3>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                  >
                    <Calendar size={16} />
                    {t("option2Button")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
