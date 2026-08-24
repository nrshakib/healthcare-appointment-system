"use client";

import Link from "next/link";
import { FaHeadphones, FaArrowRight, FaUserMd, FaQuestionCircle } from "react-icons/fa";
import { LuPhoneCall, LuMessageSquare } from "react-icons/lu";

export default function FaqContactCard() {
  return (
    <div className="mt-12 rounded-3xl border border-emerald-200/80 bg-linear-to-br from-emerald-50 via-white to-teal-50/50 p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left icon & text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
          <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <FaHeadphones className="text-2xl sm:text-3xl" />
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              <FaQuestionCircle className="text-xs" />
                <span>Dedicated Care Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              Still Have Questions or Need Direct Help?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Can&apos;t find the answer you&apos;re looking for? Our friendly patient concierge and clinical support team is available 24/7 to assist you.
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start lg:justify-end gap-3 w-full lg:w-auto shrink-0">
          <Link
            href="/resources/help-center"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 hover:gap-2.5 active:scale-95"
          >
            <span>Visit Help Center</span>
            <FaArrowRight className="text-xs" />
          </Link>

          <Link
            href="/find-care/doctors"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-95"
          >
            <FaUserMd className="text-xs" />
            <span>Find a Doctor</span>
          </Link>
        </div>
      </div>

      {/* Support Sub-Channels */}
      <div className="mt-8 pt-6 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <LuPhoneCall className="text-base" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Toll-Free Hotline</p>
            <p className="text-xs font-bold text-slate-900">+1 (800) 555-CARE</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <LuMessageSquare className="text-base" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Live Chat Support</p>
            <p className="text-xs font-bold text-emerald-700">Instant Response</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <FaHeadphones className="text-base" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Email Desk</p>
            <p className="text-xs font-bold text-slate-900">support@medicare.health</p>
          </div>
        </div>
      </div>
    </div>
  );
}
