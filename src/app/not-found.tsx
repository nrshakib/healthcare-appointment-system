import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";

export const metadata: Metadata = {
  title: "Page Not Found | Medicare",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-16 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #06836b 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #48ac98 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Animated icon */}
        <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 shadow-lg">
          <MdOutlineHealthAndSafety className="text-5xl text-primary animate-pulse" />
        </div>

        {/* 404 number */}
        <div className="relative mb-2 select-none">
          <span
            className="text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #06836b 0%, #48ac98 50%, #a7f3d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
          {/* Floating heartbeat icon */}
          <FaHeartbeat
            aria-hidden="true"
            className="absolute -top-3 -right-6 text-3xl text-emerald-300 animate-bounce"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/"
            id="not-found-go-home"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            style={{
              background: "linear-gradient(135deg, #06836b 0%, #48ac98 100%)",
            }}
          >
            Go Back Home
          </Link>
          <Link
            href="/find-care/doctors"
            id="not-found-find-doctors"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md active:scale-95"
          >
            Find Doctors
          </Link>
        </div>

        {/* Logo */}
        <div className="mt-14">
          <Image
            src="/images/medicare-logo2.png"
            alt="Medicare Logo"
            width={120}
            height={64}
            className="opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
