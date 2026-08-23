"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { FaUniversalAccess } from "react-icons/fa6";
import { FaShareAlt, FaNotesMedical } from "react-icons/fa";
import { TbShieldHeart } from "react-icons/tb";

import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  title: string;
};

const features: Feature[] = [
  {
    icon: TbShieldHeart,
    title: "Secure & Private",
  },
  {
    icon: FaUniversalAccess,
    title: "Easy Access",
  },
  {
    icon: FaNotesMedical,
    title: "Organized Records",
  },
  {
    icon: FaShareAlt,
    title: "Share with Doctor",
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

export default function RecordsFeatures() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-3 sm:py-5 lg:py-10">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[90%] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 lg:p-6 shadow-lg"
        >
          {features.map(({ icon: Icon, title }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -2, transition: { duration: 0.2 } }
              }
              className="flex items-center gap-2 sm:gap-3 bg-linear-to-br from-[#d0e3dc] via-[#e8f9f3] to-[#c6e6dc] rounded-lg p-3 lg:p-5"
            >
              <span className="flex size-10 sm:size-13 shrink-0 items-center justify-center rounded-full bg-[#b3e3d0] text-[#06836b]">
                <Icon className="text-lg sm:text-2xl" />
              </span>
              <div className="min-w-0">
                <p className="text-sm sm:text-[14px] font-bold text-slate-900">
                  {title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
