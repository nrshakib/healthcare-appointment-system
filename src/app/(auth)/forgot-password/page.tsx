"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// React Icons
import { HiEnvelope } from "react-icons/hi2";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ResetPasswordFormInputs {
  email: string;
}

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Reset Password submitted:", data);
      setAuthSuccess("Password reset OTP sent! Please check your email.");
      router.push("/otp-verification");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAuthError(
        "Failed to send reset link. Please check your email and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
              Forgot Pasword?
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              No worries! Enter your registered email address below, and
              we&apos;ll send you an OTP to reset your password.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-full aspect-4/3 max-w-sm mx-auto my-4 flex items-center justify-center">
            <Image
              src="/images/authImages/forgot-password.png"
              alt="Medicare Healthcare Illustration"
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">Forgot Password</h2>
              <p className="text-sm text-gray-500">
                Please enter your registered email address.
              </p>
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Email Field */}
              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="forgot-password-email-input"
                      label="Email Address"
                      placeholder="example@domain.com"
                      type="email"
                      fullWidth
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <HiEnvelope
                                className="text-[#06836B]"
                                size={20}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& label.Mui-focused": {
                          color: "#06836B",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0.75rem",
                          "& fieldset": {
                            borderColor: "rgba(6, 131, 107, 0.4)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#06836B",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#06836B",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                id="forgot-password-submit-btn"
                fullWidth
                disabled={isSubmitting}
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
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <CircularProgress size={20} color="inherit" />
                    Sending Reset Link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
            <div className="text-sm text-gray-500 flex items-center gap-2 p-3 rounded-lg bg-[#EAF6F8] mt-6">
              <FaInfoCircle className="inline-block mr-1 text-blue-500" />
              <p>We will send you an OTP to reset your password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
