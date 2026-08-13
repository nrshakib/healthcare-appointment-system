"use client";

import { FiSearch, FiVideo } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

const steps = [
  {
    icon: FiSearch,
    title: "1. Find a Doctor",
    description: "Search by specialty, symptoms, or doctor's name.",
  },
  {
    icon: FaRegCalendarAlt,
    title: "2. Book Appointment",
    description: "Choose a convenient date & time and book instantly.",
  },
  {
    icon: FiVideo,
    title: "3. Get Your Care",
    description: "Visit in-person or connect via video consultation.",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm font-bold tracking-[0.15em] text-emerald-600 uppercase mb-2">
          How It Works
        </p>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
          Get your care in{" "}
          <span className="text-emerald-600">3 simple steps</span>
        </h2>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              {!isLast && (
                <div className="hidden sm:block absolute sm:top-5 lg:top-9 left-[calc(50%+80px)] right-[calc(-50%+44px)] border-t-2 border-dashed border-slate-200" />
              )}

              <div className="relative z-10 flex size-10 lg:size-18 items-center justify-center rounded-full bg-emerald-50">
                <Icon
                  className="text-xl lg:text-3xl text-emerald-600"
                  strokeWidth={2}
                />
              </div>

              <p className="mt-2 lg:mt-5 text-base sm:text-lg font-bold text-slate-900">
                {step.title}
              </p>
              <p className="lg:mt-2 max-w-55 text-sm text-slate-500 lg:leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
