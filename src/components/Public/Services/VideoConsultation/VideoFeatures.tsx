"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { FaRegClock, FaStethoscope, FaVideo } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";

import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: FaStethoscope,
    title: "Secure & Private",
    description: "Your conversations are 100% confidential",
  },
  {
    icon: FaVideo,
    title: "High Quality Video",
    description: "Clear video and audio quatily based on network",
  },
  {
    icon: BiNotepad,
    title: "Online Prescription",
    description: "Digital prescription sent to your email.",
  },
  {
    icon: FaRegClock,
    title: "Available 24/7",
    description: "Consult doctors on your convenience",
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

export default function VideoFeatures() {
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
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -2, transition: { duration: 0.2 } }
              }
              className="flex items-center gap-2 sm:gap-3 bg-linear-to-br from-[#d0e3dc] via-[#f2fdf9] to-[#c6e6dc] rounded-lg p-3 lg:p-5"
            >
              <span className="flex size-10 sm:size-13 shrink-0 items-center justify-center rounded-full bg-[#b3e3d0] text-[#06836b]">
                <Icon className="text-lg sm:text-2xl" />
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
