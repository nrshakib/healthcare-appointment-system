"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { IoMdCheckmark } from "react-icons/io";
import { LuCalendarDays, LuClock } from "react-icons/lu";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AvailableTodayHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-x-clip overflow-y-hidden border-b border-emerald-100/60 bg-linear-to-br from-[#ebfaf5] via-[#f2fdf9] to-[#e6f7f2] py-6 sm:py-8 lg:py-10">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-64 sm:size-80 lg:size-96 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(6,131,107,0.05) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 size-56 sm:size-72 lg:size-80 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(72,172,152,0.3) 0%, rgba(16,185,129,0.08) 60%, transparent 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[95%] xl:max-w-[85%] grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 px-3 sm:px-6 lg:px-8">
        {/* Text */}
        <motion.div
          className="flex flex-col justify-center text-center lg:col-span-7 lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight sm:leading-tight lg:leading-[1.15] tracking-tight text-slate-900"
          >
            Doctors Available <span className="text-[#06836b]">Today</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-2 sm:mt-3 text-balance text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto lg:mx-0"
          >
            Find a trusted doctor with an appointment available today. Book
            online in minutes.
          </motion.p>
        </motion.div>

        {/* Illustration */}
        <div className="relative mx-auto flex aspect-square w-44 sm:w-56 lg:w-64 items-center justify-center lg:col-span-5">
          {/* Sketch card behind image */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute inset-2 sm:inset-3 rounded-2xl border border-white/80 bg-white/60 shadow-md backdrop-blur-md"
          />

          {/* Calendar badge */}
          <motion.div
            className="absolute -top-1 left-1 z-10 flex items-center justify-center rounded-xl border border-emerald-100 bg-white/95 p-1.5 sm:p-2.5 shadow-[0_6px_16px_rgba(6,131,107,0.12)] sm:left-3"
            variants={popIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            {...(!shouldReduceMotion && {
              animate: {
                ...popIn.visible,
                y: [0, -10, 0],
              },
            })}
            style={!shouldReduceMotion ? { transition: "none" } : undefined}
          >
            <LuCalendarDays className="text-base text-[#06836b] sm:text-xl" />
          </motion.div>

          {/* Verified check badge */}
          <motion.div
            className="absolute top-1/3 -left-1 sm:-left-2 z-10 flex size-7 sm:size-9 items-center justify-center rounded-full border-2 border-white bg-[#06836b] text-white shadow-md"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: shouldReduceMotion ? 1 : [1, 1.12, 1],
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.45 },
              scale: shouldReduceMotion
                ? { duration: 0.4, delay: 0.45 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <IoMdCheckmark className="text-sm sm:text-lg" />
          </motion.div>

          {/* Clock badge */}
          <motion.div
            className="absolute bottom-3 sm:bottom-4 right-0 sm:right-1 z-10 flex items-center justify-center rounded-xl border border-emerald-100 bg-white/95 p-2 sm:p-2.5 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: shouldReduceMotion ? 0 : [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.55 },
              y: shouldReduceMotion
                ? { duration: 0.4, delay: 0.55 }
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.55,
                  },
            }}
          >
            <LuClock className="text-lg text-[#06836b]/80 sm:text-2xl" />
          </motion.div>

          {/* Doctor image */}
          <motion.div
            className="relative z-0 flex h-full w-full items-end justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <Image
              src="/images/HeroDoctor.png"
              alt="Doctor Available Today"
              width={280}
              height={320}
              priority
              className="h-full w-auto max-h-48 sm:max-h-56 lg:max-h-64 select-none object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
