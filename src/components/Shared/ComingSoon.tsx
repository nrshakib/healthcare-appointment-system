"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFlask } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";

interface ComingSoonProps {
  /** Feature / page name shown in the heading */
  feature?: string;
  /** Short description shown below the heading */
  description?: string;
  /** Whether to show the "Go Home" back button */
  showHome?: boolean;
}

export default function ComingSoon({
  feature = "This Feature is",
  description = "I'm working hard to build something amazing. Stay tuned for updates!",

  showHome = true,
}: ComingSoonProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-112 w-md rounded-full opacity-[0.12] blur-3xl"
        style={{
          background: "radial-gradient(circle, #06836b 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 h-112 w-md rounded-full opacity-[0.10] blur-3xl"
        style={{
          background: "radial-gradient(circle, #48ac98 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Animated icon stack */}
        <div className="mb-8 relative flex items-center justify-center w-24 h-24 rounded-full bg-white border border-emerald-100 shadow-xl">
          <MdOutlineHealthAndSafety className="text-5xl text-primary" />
          <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-md">
            <FaFlask className="text-white text-[10px]" />
          </span>
        </div>

        {/* Badge */}
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold tracking-widest text-emerald-700 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Coming Soon
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
          {feature}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #06836b 0%, #48ac98 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Coming Soon
          </span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-xs">
          {description}
        </p>

        {/* Progress bar (decorative) */}
        <div className="w-full max-w-xs mb-10">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>In Development</span>
            <span>70%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "70%",
                background: "linear-gradient(90deg, #06836b 0%, #48ac98 100%)",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {showHome && (
            <Link
              href="/"
              id="coming-soon-go-home"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md active:scale-95"
            >
              Go Back Home
            </Link>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-12">
          <Image
            src="/images/medicare-logo2.png"
            alt="Medicare Logo"
            width={120}
            height={64}
            className="opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
