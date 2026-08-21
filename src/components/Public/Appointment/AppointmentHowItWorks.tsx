"use client";

import { motion } from "framer-motion";
import {
  LuSearch,
  LuCalendarDays,
  LuClipboardCheck,
  LuBell,
  LuChevronRight,
} from "react-icons/lu";

const steps = [
  {
    stepNumber: 1,
    icon: LuSearch,
    title: "Search Doctor",
    description: "Find a doctor or specialty that fits your needs.",
  },
  {
    stepNumber: 2,
    icon: LuCalendarDays,
    title: "Choose Time",
    description: "Select a convenient date and time slot.",
  },
  {
    stepNumber: 3,
    icon: LuClipboardCheck,
    title: "Confirm Booking",
    description: "Confirm your appointment in one click.",
  },
  {
    stepNumber: 4,
    icon: LuBell,
    title: "Get Reminder",
    description: "We'll remind you before your appointment.",
  },
];

export default function AppointmentHowItWorks() {
  return (
    <section className="py-6 sm:py-8 pb-14 sm:pb-18">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[90%] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-100 bg-linear-to-br from-[#ebfaf5] via-[#f2fdf9] to-[#e6f7f2]  p-5 sm:p-8 lg:p-10 shadow-lg">
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
                    <div className="flex items-center gap-2.5 ">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#006b52] text-[11px] font-bold text-white shadow-xs">
                        {step.stepNumber}
                      </span>
                      <div className="flex size-13 items-center justify-center rounded-full bg-[#b3e3d0] text-[#006b52]">
                        <step.icon className="text-xl stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <p className="mt-3.5 text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 max-w-[155px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Dotted connector with arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex items-center justify-center pt-4 px-2 text-primary">
                      <div className="w-12 lg:w-16 border-t-2 border-dotted border-primary" />
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
    </section>
  );
}
