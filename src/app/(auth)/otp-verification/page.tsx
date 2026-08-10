"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// MUI Components
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// React Icons
import {
  HiShieldCheck,
  HiEnvelope,
  HiArrowLeft,
  HiArrowPath,
  HiPencilSquare,
} from "react-icons/hi2";
import { FaInfoCircle } from "react-icons/fa";

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "user@example.com";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Timer state for Resend OTP (60 seconds countdown)
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    // Only accept numeric inputs
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    const digit = value.substring(value.length - 1);
    newOtp[index] = digit;
    setOtp(newOtp);

    if (authError) setAuthError(null);

    // Auto-focus next input field
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Keyboard Navigation & Backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Pasting Full 6-digit OTP code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedText.length > 0) {
      const newOtp = [...otp];
      pastedText.split("").forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);

      const targetIdx = Math.min(pastedText.length, 5);
      inputRefs.current[targetIdx]?.focus();

      if (authError) setAuthError(null);
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Simulate API Call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAuthSuccess("A new 6-digit OTP code has been sent to your email!");
      setTimer(60);
      setCanResend(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAuthError("Failed to resend code. Please try again in a moment.");
    } finally {
      setIsResending(false);
    }
  };

  // Submit OTP Verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join("");

    if (fullCode.length < 6) {
      setAuthError("Please enter all 6 digits of your OTP verification code.");
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAuthSuccess("OTP verified successfully! Redirecting...");
      router.push("/reset-password");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAuthError("Invalid verification code. Please check and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Main Card Container */}
      <div className="max-w-5xl mx-auto w-full rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Branding & Hero Illustration */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200/80">
          <div>
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/images/medicare-logo2.png"
                alt="Medicare Logo"
                width={160}
                height={50}
                priority
                className="h-auto w-auto max-h-12 object-contain"
              />
            </Link>

            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
              Verify Your Account
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Enter the 6-digit code sent to your registered email to complete
              verification and secure your account.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-full aspect-4/3 max-w-sm mx-auto my-4 flex items-center justify-center">
            <Image
              src="/images/authImages/otp-verification.png"
              alt="Medicare OTP Verification Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-contain drop-shadow-md"
            />
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 text-center lg:text-left mt-4">
            © {new Date().getFullYear()} MediCare Inc. Safe & encrypted
            authentication.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06836B]/10 text-[#06836B] text-xs font-semibold mb-3">
                <HiShieldCheck size={16} />
                <span>Two-Step Verification</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Enter OTP Verification Code
              </h2>
              <p className="text-sm text-gray-500">
                We sent a 6-digit verification code to:
              </p>

              {/* Target Email Badge */}
              <div className="mt-2.5 inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-200/80 dark:border-slate-700 w-full">
                <div className="flex items-center gap-2 truncate">
                  <HiEnvelope className="text-[#04d0a7] shrink-0" size={18} />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {emailParam}
                  </span>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#04d0a7] hover:underline font-medium shrink-0 flex items-center gap-1"
                >
                  <HiPencilSquare size={14} />
                  Change
                </Link>
              </div>
            </div>

            {authError && (
              <Alert severity="error" className="mb-6 rounded-xl">
                {authError}
              </Alert>
            )}

            {authSuccess && (
              <Alert severity="success" className="mb-6 rounded-xl">
                {authSuccess}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* 6-Digit OTP Inputs */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Verification Code
                </label>
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      id={`otp-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-full h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#06836B] focus:border-[#06836B] transition-all shadow-sm"
                      aria-label={`Digit ${index + 1} of verification code`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                id="otp-verify-submit-btn"
                fullWidth
                disabled={isSubmitting || otp.join("").length < 6}
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "0.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(6, 131, 107, 0.35)",
                  background:
                    "linear-gradient(135deg, #06836B 0%, #0db996 100%)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(6, 131, 107, 0.45)",
                    opacity: 0.95,
                  },
                  "&:disabled": {
                    background: "#cbd5e1",
                    boxShadow: "none",
                  },
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <CircularProgress size={20} color="inherit" />
                    Verifying OTP...
                  </span>
                ) : (
                  "Verify & Proceed"
                )}
              </Button>
            </form>

            {/* Resend OTP Section */}
            <div className="mt-6 text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#06836B] hover:text-[#056d59] hover:underline transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <HiArrowPath
                    size={16}
                    className={isResending ? "animate-spin" : ""}
                  />
                  <span>Resend OTP Code</span>
                </button>
              ) : (
                <p className="text-sm text-slate-500">
                  Didn&apos;t receive code? Resend in{" "}
                  <span className="font-bold text-[#06836B]">
                    {formatTimer(timer)}
                  </span>
                </p>
              )}
            </div>

            {/* Info Hint Card */}
            <div className="text-xs text-white flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-400 border border-[#06836B]/20 mt-6">
              <FaInfoCircle
                className="text-[#06836B] shrink-0 mt-0.5"
                size={16}
              />
              <p>
                If you don&apos;t see the email in your inbox, please check your
                spam or junk folder, or make sure your email address is correct.
              </p>
            </div>

            {/* Back to Sign In Link */}
            <div className="mt-6 text-left">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#06836B] hover:text-[#056d59] transition-colors"
              >
                <HiArrowLeft size={16} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OtpVerification() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <CircularProgress sx={{ color: "#06836B" }} />
        </div>
      }
    >
      <OtpVerificationForm />
    </Suspense>
  );
}
