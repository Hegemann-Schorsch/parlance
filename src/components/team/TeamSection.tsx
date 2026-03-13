"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Linkedin, BookOpen } from "lucide-react";

export default function TeamSection() {
  const t = useTranslations("team");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const founders = t.raw("founders") as Array<{
    initials: string;
    name: string;
    title: string;
    tagline: string;
    bio: string;
    credentials: string[];
  }>;

  const avatarColors = [
    "from-blue-700 to-blue-900",
    "from-slate-500 to-slate-800",
  ];

  return (
    <section id="team" ref={ref} className="py-32 lg:py-40 bg-slate-50">
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
        </motion.div>

        {/* Founder cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="bg-white rounded-2xl border border-slate-200 p-9 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Avatar + name */}
              <div className="flex items-start gap-5 mb-7">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white font-bold text-xl shrink-0`}
                >
                  {founder.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {founder.name}
                  </h3>
                  <div className="text-sm font-semibold text-blue-700 mt-1">
                    {founder.title}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 italic">
                    "{founder.tagline}"
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-500 leading-relaxed mb-7">
                {founder.bio}
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-2 mb-7">
                {founder.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-medium"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                {i === 0 && (
                  <>
                    <span className="text-slate-200">·</span>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-700 transition-colors"
                    >
                      <BookOpen size={14} />
                      Publications
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="text-slate-500 text-base leading-relaxed border-l-4 border-blue-600 pl-6 text-left">
            {t("narrative")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
