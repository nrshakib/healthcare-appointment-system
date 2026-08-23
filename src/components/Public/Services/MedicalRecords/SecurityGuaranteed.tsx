"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsFillShieldLockFill } from "react-icons/bs";

const checklist = [
  "End-to-end encryption",
  "HIPAA compliant",
  "You control who sees your data",
];

export default function SecurityGuaranteed() {
  return (
    <section className="w-full rounded-2xl bg-[#ccf6e0] px-6 sm:px-8 py-8 sm:py-10 max-w-[95%] xl:max-w-7xl mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-6">
        {/* Left: heading + copy */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg sm:text-xl text-[#101828] mb-2">
            Your Health. Your Data. Your Control.
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-[#667085] max-w-md mx-auto md:mx-0">
            We use industry-standard encryption to keep your health information
            safe and confidential.
          </p>
        </div>

        {/* Center: shield icon */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#16A672] justify-self-center shrink-0"
        >
          <BsFillShieldLockFill size={38} color="#FFFFFF" />
        </motion.div>

        {/* Right: checklist */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          {checklist.map((text, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <IoCheckmarkCircle
                size={18}
                color="#16A672"
                className="shrink-0"
              />
              <span className="text-sm lg:text-base text-[#344054] font-semibold">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
