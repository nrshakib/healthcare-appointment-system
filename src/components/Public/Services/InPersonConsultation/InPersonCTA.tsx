"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuMapPin } from "react-icons/lu";

export default function InPersonCTA() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[95%] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] min-h-[220px]"
        >
          {/* ── Left: Text + Button ── */}
          <div className="relative z-10 flex flex-col justify-center gap-4 bg-gradient-to-br from-[#06836b] via-[#07957a] to-[#068f75] px-7 py-10 sm:px-10 sm:py-12">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 size-32 rounded-full bg-black/10 blur-2xl" />

            {/* Badge */}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-100">
              <LuMapPin className="text-xs" />
              Near You
            </span>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                Find the Nearest Care,{" "}
                <span className="text-emerald-200">Close to You</span>
              </h2>
              <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed max-w-xs">
                Quality healthcare is always within reach. Clinics open 7 days
                a week — visit us today.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-fit">
              <Link
                href="/find-care/doctors"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#06836b] shadow-md hover:bg-emerald-50 transition-all"
              >
                <LuMapPin className="text-base" />
                Find Nearby Locations
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Map Visual ── */}
          <div className="relative hidden md:block min-h-[220px]">
            {/* Frosted edge blend */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#068f75] to-transparent" />

            <iframe
              title="Nearby clinic locations"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14605.032539867707!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              className="w-full h-full border-0 object-cover grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Pin overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center justify-center size-12 rounded-full bg-[#06836b] shadow-lg shadow-emerald-900/30">
                  <LuMapPin className="text-2xl text-white" />
                </div>
                <div className="mt-1 size-2 rounded-full bg-[#06836b]/40 blur-sm" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
