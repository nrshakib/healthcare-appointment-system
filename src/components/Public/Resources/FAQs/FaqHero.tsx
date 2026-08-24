"use client";

import Image from "next/image";
import { LuShieldCheck, LuSearch, LuX } from "react-icons/lu";
import { motion } from "framer-motion";

interface FaqHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onQuickSearch?: (tag: string) => void;
}

const quickTopics = [
  "Appointments",
  "Telemedicine",
  "Insurance",
  "Prescriptions",
  "Refunds",
];

export default function FaqHero({
  searchQuery = "",
  onSearchChange,
  onQuickSearch,
}: FaqHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-emerald-50 via-teal-50/60 to-emerald-100/50 p-3 sm:p-8 lg:p-10 border border-emerald-100/80 shadow-xs mb-10">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Left text & search column */}
        <div className="w-full lg:max-w-2xl flex flex-col items-start">
          {/* Headline */}
          <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold text-slate-900 leading-tight">
            How Can We <span className="text-emerald-600">Help You</span> Today?
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            Find immediate answers about doctor consultations, online
            telemedicine, insurance coverage, e-prescriptions, and account
            security.
          </p>

          {/* Integrated Quick Search Input */}
          {onSearchChange && (
            <div className="mt-6 w-full max-w-lg">
              <div className="relative flex items-center">
                <LuSearch className="absolute left-4 text-slate-400 text-base pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search questions (e.g. reschedule, insurance, video call)..."
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-emerald-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <LuX className="text-sm" />
                  </button>
                )}
              </div>

              {/* Quick Topics Tags */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-600 text-[11px]">
                  Popular:
                </span>
                {quickTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => onQuickSearch?.(topic)}
                    className="px-2.5 py-1 rounded-full bg-white/80 border border-emerald-200/60 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick trust metrics */}
          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5">
              <LuShieldCheck className="text-emerald-600 text-base" />
              <span>Verified Clinical &amp; Billing Guides</span>
            </div>
            <div className="h-3 w-px bg-emerald-200" />
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Care Support</span>
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
            src="/images/resources/faqs-hero.png"
            alt="FAQs Hero"
            width={280}
            height={200}
            priority
            className="rounded-2xl object-cover drop-shadow-md select-none w-48 sm:w-60 lg:w-72 h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
