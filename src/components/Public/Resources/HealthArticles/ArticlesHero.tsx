"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import { TbHome2Filled } from "react-icons/tb";
import { LuChevronRight, LuSparkles, LuShieldCheck } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ArticlesHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/50 p-5 sm:p-7 lg:p-8 border border-emerald-100/80 shadow-sm mb-8">
      {/* Background ambient blurs */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left text column */}
        <div className="w-full md:max-w-xl flex flex-col items-start">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<LuChevronRight className="text-xs text-slate-400" />}
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              mb: { xs: 2, sm: 2.5 },
              "& .MuiBreadcrumbs-separator": { mx: 0.75 },
            }}
          >
            <Link
              href="/"
              className="text-primary hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <TbHome2Filled className="text-base" />
            </Link>
            <span className="text-slate-500 font-normal">Resources</span>
            <span className="text-emerald-700 font-semibold">Health Articles</span>
          </Breadcrumbs>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-3">
            <LuSparkles className="text-emerald-600 text-sm" />
            <span>Medically Verified Library</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Evidence-Based <span className="text-emerald-600">Health Advice</span> for Everyday Life
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
            Explore clinically vetted articles, dietary breakdowns, and wellness strategies written by certified doctors to help you take charge of your wellbeing.
          </p>

          {/* Quick trust metrics */}
          <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5">
              <LuShieldCheck className="text-emerald-600 text-base" />
              <span>100% Doctor Vetted</span>
            </div>
            <div className="h-3 w-px bg-emerald-200" />
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-emerald-500" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-44 sm:w-56 lg:w-64 h-36 sm:h-44 lg:h-48 shrink-0 flex items-center justify-center"
        >
          <Image
            src="/images/resources/health-articles-hero.png"
            alt="Health Articles Hero"
            fill
            priority
            sizes="(max-width: 768px) 200px, 280px"
            className="object-contain drop-shadow-md select-none"
          />
        </motion.div>
      </div>
    </div>
  );
}
