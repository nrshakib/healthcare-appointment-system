"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  LuCalendarCheck,
  LuUserCheck,
  LuShieldCheck,
  LuBell,
} from "react-icons/lu";
import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: LuCalendarCheck,
    title: "Easy Booking",
    description: "Book appointments in less than a minute.",
  },
  {
    icon: LuUserCheck,
    title: "Expert Doctors",
    description: "Get care from verified and experienced doctors.",
  },
  {
    icon: LuShieldCheck,
    title: "Flexible Options",
    description: "Choose online or in-person appointments.",
  },
  {
    icon: LuBell,
    title: "Timely Reminders",
    description: "Receive reminders so you never miss a slot.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AppointmentFeatures() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-3 sm:py-5">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[90%] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 rounded-2xl border border-slate-100 bg-white p-2 sm:p-7 shadow-lg"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -2, transition: { duration: 0.2 } }
              }
              className="flex items-center gap-2 sm:gap-3 bg-linear-to-br from-[#ebfaf5] via-[#f2fdf9] to-[#e6f7f2] rounded-lg p-3"
            >
              <span className="flex size-10 sm:size-13 shrink-0 items-center justify-center rounded-full bg-[#b3e3d0] text-[#06836b]">
                <Icon className="text-xl sm:text-2xl" />
              </span>
              <div className="min-w-0">
                <p className="text-sm sm:text-[14px] font-bold text-slate-900">
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 leading-snug">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
