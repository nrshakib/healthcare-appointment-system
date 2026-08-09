"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

// React Icons
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

interface RegisterFormInputs {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const countryCodes = [
  {
    code: "+1",
    iso: "us",
    name: "United States",
    flagUrl: "https://flagcdn.com/w40/us.png",
  },
  {
    code: "+880",
    iso: "bd",
    name: "Bangladesh",
    flagUrl: "https://flagcdn.com/w40/bd.png",
  },
  {
    code: "+44",
    iso: "gb",
    name: "United Kingdom",
    flagUrl: "https://flagcdn.com/w40/gb.png",
  },
  {
    code: "+91",
    iso: "in",
    name: "India",
    flagUrl: "https://flagcdn.com/w40/in.png",
  },
  {
    code: "+61",
    iso: "au",
    name: "Australia",
    flagUrl: "https://flagcdn.com/w40/au.png",
  },
  {
    code: "+49",
    iso: "de",
    name: "Germany",
    flagUrl: "https://flagcdn.com/w40/de.png",
  },
  {
    code: "+33",
    iso: "fr",
    name: "France",
    flagUrl: "https://flagcdn.com/w40/fr.png",
  },
  {
    code: "+81",
    iso: "jp",
    name: "Japan",
    flagUrl: "https://flagcdn.com/w40/jp.png",
  },
  {
    code: "+971",
    iso: "ae",
    name: "UAE",
    flagUrl: "https://flagcdn.com/w40/ae.png",
  },
  {
    code: "+65",
    iso: "sg",
    name: "Singapore",
    flagUrl: "https://flagcdn.com/w40/sg.png",
  },
  {
    code: "+966",
    iso: "sa",
    name: "Saudi Arabia",
    flagUrl: "https://flagcdn.com/w40/sa.png",
  },
  {
    code: "+92",
    iso: "pk",
    name: "Pakistan",
    flagUrl: "https://flagcdn.com/w40/pk.png",
  },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+1",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Registration submitted:", data);
      setAuthSuccess("Account created successfully! Redirecting to sign in...");
      router.push("/sign-in");
    } catch (err) {
      setAuthError(
        "Failed to create account. Please check your information and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const textFieldSx = {
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
              Create Account
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Join Medicare to get connected with doctors, book appointments and
              manage your healthcare.
            </p>
          </div>

          {/* Left Side Illustration */}
          <div className="relative w-full aspect-4/3 max-w-sm mx-auto my-4 flex items-center justify-center">
            <Image
              src="/images/authImages/register.png"
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

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Register</h2>
              <p className="text-sm text-gray-500">
                Fill in your details to create an account
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
              className="space-y-4"
              noValidate
            >
              {/* Full Name Field */}
              <div>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="register-fullname-input"
                      label="Full Name"
                      placeholder="John Doe"
                      type="text"
                      fullWidth
                      variant="outlined"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <HiUser className="text-[#06836B]" size={20} />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={textFieldSx}
                    />
                  )}
                />
              </div>

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
                      id="register-email-input"
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
                      sx={textFieldSx}
                    />
                  )}
                />
              </div>

              {/* Phone Number Field with Country Code */}
              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="w-1/4">
                  <Controller
                    name="countryCode"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={textFieldSx}
                      >
                        <InputLabel id="country-code-label">Code</InputLabel>
                        <Select
                          {...field}
                          labelId="country-code-label"
                          id="register-country-code-select"
                          label="Code"
                          sx={{ borderRadius: "0.75rem" }}
                          renderValue={(selected) => {
                            const current =
                              countryCodes.find((c) => c.code === selected) ||
                              countryCodes[0];
                            return (
                              <span className="flex items-center gap-1.5 font-medium text-sm">
                                <img
                                  src={current.flagUrl}
                                  alt={current.name}
                                  className="w-5 h-3.5 object-cover rounded-xs"
                                />
                                <span>{current.code}</span>
                              </span>
                            );
                          }}
                        >
                          {countryCodes.map((c) => (
                            <MenuItem key={c.iso} value={c.code}>
                              <span className="flex items-center gap-2 font-medium text-sm">
                                <img
                                  src={c.flagUrl}
                                  alt={c.name}
                                  className="w-5 h-3.5 object-cover rounded-xs shadow-xs"
                                />
                                <span>{c.code}</span>
                                <span className="text-xs text-gray-400 font-normal ml-auto">
                                  {c.name}
                                </span>
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>

                {/* Phone Number Input */}
                <div className="w-3/4">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9\s-]{7,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="register-phone-input"
                        label="Phone Number"
                        placeholder="123 456 7890"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <HiPhone className="text-[#06836B]" size={20} />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={textFieldSx}
                      />
                    )}
                  />
                </div>
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
                      id="register-password-input"
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
                      sx={textFieldSx}
                    />
                  )}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === passwordValue || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="register-confirm-password-input"
                      label="Confirm Password"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
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
                                aria-label="toggle confirm password visibility"
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
                      sx={textFieldSx}
                    />
                  )}
                />
              </div>

              {/* Terms Checkbox */}
              <div>
                <Controller
                  name="agreeTerms"
                  control={control}
                  rules={{
                    required: "You must agree to the Terms of Service",
                  }}
                  render={({ field }) => (
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            id="register-agree-terms-checkbox"
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
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-[#06836B] hover:underline font-medium"
                            >
                              Terms of Service
                            </Link>{" "}
                            &{" "}
                            <Link
                              href="/privacy"
                              className="text-[#06836B] hover:underline font-medium"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        }
                      />
                      {errors.agreeTerms && (
                        <FormHelperText error sx={{ ml: 2, mt: -0.5 }}>
                          {errors.agreeTerms.message}
                        </FormHelperText>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                id="register-submit-btn"
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
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Social Login Divider */}
            <div className="my-6">
              <Divider
                sx={{
                  "&::before, &::after": {
                    borderColor: "var(--navbar-border)",
                  },
                }}
              >
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium px-2">
                  Or continue with
                </span>
              </Divider>
            </div>

            {/* Google Sign Up Button */}
            <Button
              id="register-google-btn"
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
              onClick={() => alert("Google Sign-Up will be implemented soon")}
            >
              Sign up with Google
            </Button>

            {/* Sign In Footer Link */}
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[#06836B] hover:text-[#056d59] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
