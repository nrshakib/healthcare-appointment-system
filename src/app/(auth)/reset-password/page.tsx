"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// React Icons
import { HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface ResetPasswordFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      password: "",
      confirmPassword: "",
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
      setAuthSuccess("Password reset successful! Redirecting...");
      router.push("/sign-in");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAuthError("Failed to reset password. Please try again.");
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
              Reset Your Password
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Set your new password to regain access to your account.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-full aspect-4/3 max-w-sm mx-auto my-4 flex items-center justify-center">
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
            © {new Date().getFullYear()} MediCare Inc. Safe & encrypted
            authentication.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">Reset Password</h2>
              <p className="text-sm text-gray-500">
                Please enter your new password and confirm it.
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
                              <HiLockClosed
                                className="text-[#06836B]"
                                size={20}
                              />
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
                                  <HiEyeSlash
                                    size={20}
                                    className="text-[#06836B]"
                                  />
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
              <div>
                <Controller
                  name="confirmPassword"
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
                      label="Confirm Password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant="outlined"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <HiLockClosed
                                className="text-[#06836B]"
                                size={20}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword((prev) => !prev)
                                }
                                edge="end"
                                aria-label="toggle password visibility"
                                size="small"
                              >
                                {showConfirmPassword ? (
                                  <HiEyeSlash
                                    size={20}
                                    className="text-[#06836B]"
                                  />
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
                    Changing Password...
                  </span>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
