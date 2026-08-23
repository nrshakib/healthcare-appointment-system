"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaVideo, FaHandHoldingHeart } from "react-icons/fa";
import { LuSearch, LuCalendarDays, LuChevronRight } from "react-icons/lu";

const steps = [
  {
    stepNumber: 1,
    icon: LuSearch,
    title: "Choose Doctor",
    description: "Select a doctor & check availability.",
  },
  {
    stepNumber: 2,
    icon: LuCalendarDays,
    title: "Book Appointment",
    description: "Pick a time and book your slot",
  },
  {
    stepNumber: 3,
    icon: FaVideo,
    title: "Join Consultation",
    description: "Join the secure video call at the scheduled time.",
  },
  {
    stepNumber: 4,
    icon: FaHandHoldingHeart,
    title: "Get Treatment",
    description: "Receive advice & prescription.",
  },
];

export default function VideoHowItWorks() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-6 gap-3 py-6 sm:py-8 pb-8 sm:pb-12 xl:max-w-[95%] mx-auto">
      <div className="xl:col-span-4 px-4 sm:px-6 lg:px-2">
        <div className="rounded-2xl border border-slate-100 bg-linear-to-br from-[#ebfaf5] via-[#f2fdf9] to-[#e6f7f2] p-5 sm:p-8 lg:p-10 shadow-lg">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center text-lg sm:text-xl font-bold text-slate-900"
          >
            How It Works
          </motion.h2>

          <div className="mt-8 sm:mt-10">
            {/* Desktop / Tablet Horizontal Flow */}
            <div className="hidden md:flex items-start justify-between">
              {steps.map((step, index) => (
                <div key={step.title} className="flex flex-1 items-start">
                  {/* Step Item */}
                  <div className="flex flex-col items-center text-center w-full">
                    {/* Number Badge + Icon Circle */}
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#006b52] text-[11px] font-bold text-white shadow-xs">
                        {step.stepNumber}
                      </span>
                      <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-[#b3e3d0] text-[#006b52]">
                        <step.icon className="text-xl stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <p className="mt-3.5 text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 max-w-40 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Dotted connector with arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex items-center justify-center pt-4 px-2 text-primary shrink-0">
                      <div className="w-8 lg:w-16 border-t-2 border-dotted border-primary" />
                      <LuChevronRight className="text-primary text-sm -ml-1 shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Vertical Flow */}
            <div className="flex flex-col gap-6 md:hidden">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center pt-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#006b52] text-[11px] font-bold text-white">
                      {step.stepNumber}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="my-1.5 h-10 w-0.5 border-l-2 border-dotted border-primary" />
                    )}
                  </div>

                  {/* Icon + text */}
                  <div className="flex items-start gap-3.5 flex-1 pb-2">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#b3e3d0] text-[#006b52]">
                      <step.icon className="text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promo panel */}
      <div className="xl:col-span-2 px-4 sm:px-6 lg:px-0 ">
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:h-full rounded-2xl bg-linear-to-br from-[#026d44] via-[#66ae7c] to-[#34d775] px-3 sm:px-8 xl:px-4 2xl:px-5 py-6 sm:py-8 lg:py-10 shadow-lg">
          <div className="flex-1">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-white">
              Healthcare at your fingertips
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
              Quality care, just a click away
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-2.5 sm:px-5 py-1.5 sm:py-3 text-xs lg:text-sm font-semibold text-[#05c127] shadow-xs transition-colors hover:bg-[#32df7a] hover:text-white"
            >
              Consult Now
            </Link>
          </div>

          <div className="relative w-28 min-[400px]:w-36 sm:w-40 md:w-48 lg:w-56 xl:w-52 h-20 min-[400px]:h-24 sm:h-28 md:h-28 lg:h-36 xl:h-40 shrink-0">
            <Image
              src="/images/services/video-consultation-now.png"
              alt="Video Consultation now"
              fill
              priority
              sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 768px) 208px, (min-width: 400px) 176px, 128px"
              className="select-none object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
