"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// React Icons
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowLeft,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

interface SignInFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormInputs) => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Sign-In submitted:", data);
      setAuthSuccess("Sign in successful! Redirecting...");
    } catch (err) {
      setAuthError("Failed to sign in. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Top back link */}
      {/* <div className="max-w-5xl mx-auto w-full mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <HiArrowLeft size={16} />
          Back to Home
        </Link>
      </div> */}

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
              Welcome to MediCare
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Sign in to manage your appointments, view medical records, and connect with top healthcare specialists.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-full aspect-[4/3] max-w-sm mx-auto my-4 flex items-center justify-center">
            <Image
              src="/images/authImages/sign-in.png"
              alt="Medicare Healthcare Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-contain drop-shadow-md"
            />
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 text-center lg:text-left mt-4">
            © {new Date().getFullYear()} MediCare Inc. Safe & encrypted authentication.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">
                Sign In to Your Account
              </h2>
              <p className="text-sm text-gray-500">
                Please enter your registered email and password.
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                      id="signin-email-input"
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
                              <HiEnvelope className="text-[#06836B]" size={20} />
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

              {/* Password Field */}
              <div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="signin-password-input"
                      label="Password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <HiLockClosed className="text-[#06836B]" size={20} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                aria-label="toggle password visibility"
                                size="small"
                              >
                                {showPassword ? (
                                  <HiEyeSlash size={20} className="text-[#06836B]" />
                                ) : (
                                  <HiEye size={20} className="text-[#06836B]" />
                                )}
                              </IconButton>
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          id="signin-remember-me-checkbox"
                          checked={field.value}
                          size="small"
                          sx={{
                            color: "#06836B",
                            "&.Mui-checked": {
                              color: "#06836B",
                            },
                          }}
                        />
                      }
                      label={
                        <span className="text-xs sm:text-sm text-gray-500">
                          Remember me
                        </span>
                      }
                    />
                  )}
                />

                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm font-semibold text-[#06836B] hover:text-[#056d59] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                id="signin-submit-btn"
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
                  background: "linear-gradient(135deg, #06836B 0%, #0db996 100%)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(6, 131, 107, 0.45)",
                    opacity: 0.95,
                  },
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <CircularProgress size={20} color="inherit" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Social Login Divider */}
            <div className="my-6">
              <Divider sx={{ "&::before, &::after": { borderColor: "var(--navbar-border)" } }}>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium px-2">
                  Or continue with
                </span>
              </Divider>
            </div>

            {/* Google Sign In Button */}
            <Button
              id="signin-google-btn"
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle size={20} />}
              sx={{
                py: 1.2,
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "none",
                color: "var(--navbar-text)",
                borderColor: "rgba(0,0,0,0.15)",
                "&:hover": {
                  borderColor: "rgba(37,99,235,0.4)",
                  backgroundColor: "rgba(37, 99, 235, 0.04)",
                },
              }}
              onClick={() => alert("Google Sign-In will be implemented soon")}
            >
              Sign in with Google
            </Button>

            {/* Register Footer Link */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#06836B] hover:text-[#056d59] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
