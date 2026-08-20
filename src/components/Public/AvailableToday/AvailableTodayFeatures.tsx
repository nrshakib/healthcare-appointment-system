"use client";

import { LuCalendarDays, LuShieldCheck, LuClock, LuLock } from "react-icons/lu";

export default function AvailableTodayFeatures() {
  const features = [
    {
      icon: LuCalendarDays,
      title: "Same-Day Appointments",
      description: "Book with available doctors on the same day.",
    },
    {
      icon: LuShieldCheck,
      title: "Verified Doctors",
      description: "All doctors are verified and highly rated by patients.",
    },
    {
      icon: LuClock,
      title: "Quick & Easy Booking",
      description: "Book appointments in just a few clicks.",
    },
    {
      icon: LuLock,
      title: "Secure & Private",
      description: "Your health information is always protected.",
    },
  ];

  return (
    <section className="mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12">
      <div className="bg-linear-to-br from-[#cee2db] via-[#d2e8e0] to-[#bee3d8] border border-emerald-100/90 rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-7 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-5 ">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg p-2"
              >
                <div className="size-10 rounded-xl sm:rounded-2xl bg-[#06836b]/10 text-[#06836b] flex items-center justify-center shrink-0">
                  <Icon className="text-lg sm:text-xl lg:text-2xl" />
                </div>
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <h3 className="text-sm xl:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs xl:text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
