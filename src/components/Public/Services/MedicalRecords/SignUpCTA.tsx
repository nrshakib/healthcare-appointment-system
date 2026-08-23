"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function SignUpCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl bg-[#def5e7] px-6 sm:px-8 py-8 sm:py-10 max-w-[95%] xl:max-w-7xl mx-auto my-8"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5 sm:gap-6">
        {/* Left: heading + copy */}
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg text-[#0F6B41] mb-1">
            Don&apos;t have an account yet?
          </h3>
          <p className="text-sm text-[#667085]">
            Sign up today and take control of your health records.
          </p>
        </div>

        {/* Right: CTA link */}
        <MotionLink
          href="/signup"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="shrink-0 whitespace-nowrap bg-[#0F6B41] hover:bg-[#0C5836] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors text-center"
        >
          Sign Up Now
        </MotionLink>
      </div>
    </motion.section>
  );
}
