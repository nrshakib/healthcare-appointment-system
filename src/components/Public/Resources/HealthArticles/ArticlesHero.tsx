"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import { TbHome2Filled } from "react-icons/tb";
import { LuChevronRight, LuShieldCheck } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ArticlesHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-50 via-teal-50/60 to-emerald-100/50 p-5 sm:p-7 lg:p-8 border border-emerald-100/80 shadow-sm mb-8">
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
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
            <span className="text-emerald-700 font-semibold">
              Health Articles
            </span>
          </Breadcrumbs>

          {/* Headline */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Evidence-Based{" "}
            <span className="text-emerald-600">Health Advice</span> for Everyday
            Life
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-[13px] sm:text-sm text-slate-600 leading-relaxed max-w-lg">
            Explore clinically vetted articles, dietary breakdowns, and wellness
            strategies written by certified doctors to help you take charge of
            your wellbeing.
          </p>

          {/* Quick trust metrics */}
          <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5">
              <LuShieldCheck className="text-emerald-600 text-base" />
              <span>100% Doctor Vetted</span>
            </div>
            <div className="h-3 w-px bg-emerald-200" />
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full bg-emerald-500" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="shrink-0 flex items-center justify-center"
        >
          <Image
            src="/images/resources/health-articles-hero.png"
            alt="Health Articles Hero"
            width={260}
            height={190}
            priority
            className="rounded-xl object-cover drop-shadow-md select-none w-44 sm:w-56 lg:w-64 h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
