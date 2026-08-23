"use client";

import specialities, { createSpecialitySlug } from "@/utils/specialities";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const displayed = specialities.slice(0, 6);

export default function InPersonSpecialities() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-linear-to-br from-[#eaf1ee] via-[#f8fffd] to-[#e1fff5]">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[95%] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center  mb-2 sm:mb-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900">
            Specialities Available
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
            Book an appointment with top doctors near you.
          </p>
        </div>
        {/* Speciality Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {displayed.map(({ Icon, name, details, color }) => (
            <Link
              key={name}
              href={`/find-care/specialities/${createSpecialitySlug(name)}`}
              className={`flex flex-col items-center justify-center group rounded-xl border ${color.borderClass} bg-white p-3 sm:p-4 hover:shadow-md transition-all duration-200`}
            >
              {/* Icon bubble */}
              <div
                className={`flex items-center justify-center size-10 sm:size-12 rounded-full ${color.bgClass} mb-2 sm:mb-3 transition-all`}
              >
                <Icon className={`text-lg sm:text-xl ${color.textClass}`} />
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold group-hover:text-primary transition-colors leading-snug">
                {name}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-snug text-center">
                {details}
              </p>
            </Link>
          ))}
        </div>

        {/* View All link — visible on mobile below the grid */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link
            href="/find-care/specialities"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-[#e6f7f2] transition-all"
          >
            View All Specialities
            <LuChevronRight className="text-base" />
          </Link>
        </div>
      </div>
    </section>
  );
}
