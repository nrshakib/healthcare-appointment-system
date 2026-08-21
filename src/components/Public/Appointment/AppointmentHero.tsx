"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";
import { Breadcrumbs } from "@mui/material";
import { TbHome2Filled } from "react-icons/tb";

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

export default function AppointmentHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-linear-to-br from-[#ebfaf5] via-[#f2fdf9] to-[#e6f7f2] pt-4 pb-10 sm:pt-6 sm:pb-12 lg:py-8">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[95%] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 sm:mb-6"
        >
          <Breadcrumbs
            separator={<LuChevronRight className="text-xs text-slate-400" />}
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 0.75 },
              },
              "& p, & a, & span": {
                fontSize: "inherit",
              },
            }}
          >
            <Link
              href="/"
              className="text-primary hover:text-emerald-600 transition-colors"
            >
              <TbHome2Filled className="text-lg" />
            </Link>

            <span className="text-slate-600 font-normal">Services</span>
            <span className="text-[#06836b] font-medium">Appointments</span>
          </Breadcrumbs>
        </motion.nav>

        {/* Main 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-4 lg:gap-10">
          {/* Left Text Column */}
          <motion.div
            className="order-2 md:order-1 flex flex-col justify-center text-center md:col-span-5 lg:col-span-6 md:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.12]"
            >
              Appointments Made <br className="hidden sm:inline" />
              <span className="text-primary">Simple</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mx-auto md:mx-0 mt-4 lg:mt-5 max-w-md text-xs sm:text-sm text-slate-600 leading-relaxed"
            >
              Book, manage, and reschedule appointments with top doctors in just
              a few clicks.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-6 lg:mt-8 flex flex-col min-[375px]:flex-row items-center justify-center md:justify-start gap-3 w-full sm:w-auto"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="w-full min-[480px]:w-auto"
              >
                <Link
                  href="/find-care/doctors"
                  className="block w-full min-w-32.5 lg:min-w-35 rounded-lg bg-[#06836b] px-5 lg:px-6 py-2.5 sm:py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#056e5a]"
                >
                  Find a Doctor
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="w-full min-[480px]:w-auto"
              >
                <Link
                  href="/resources/how-it-works"
                  className="block w-full min-w-32.5 lg:min-w-35 rounded-lg border border-[#06836b] bg-white px-5 lg:px-6 py-2.5 sm:py-3 text-center text-sm font-semibold text-[#06836b] transition-all hover:bg-[#e6f7f2]"
                >
                  How It Works
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual / Illustration Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="order-1 md:order-2 md:col-span-7 lg:col-span-6 flex items-center justify-center md:pl-2 lg:pl-0 w-full"
          >
            <div className="relative w-48 min-[400px]:w-52 md:w-60 lg:w-64 xl:w-80 aspect-4/5">
              <Image
                src="/images/services/appointments-hero.png"
                alt="Doctor booking appointments"
                fill
                priority
                sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 768px) 208px, (min-width: 400px) 208px, 176px"
                className="select-none object-contain object-bottom"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
