/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

// Icons
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiIdentification,
  HiAcademicCap,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuStethoscope, LuClipboardList, LuTimer } from "react-icons/lu";

import { countryCodes } from "@/utils/countryCodes";
import { textFieldSx, submitButtonSx, checkboxSx } from "./textFieldSx";

// Medical specialties list
const medicalSpecialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Practice",
  "Gynecology & Obstetrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology (ENT)",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Surgery (General)",
  "Urology",
  "Vascular Surgery",
  "Other",
];

interface DoctorFormInputs {
  // Step 1 – Personal Info
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  gender: string;
  // Step 2 – Professional Info
  specialty: string;
  licenseNumber: string;
  yearsOfExperience: string;
  qualifications: string;
  // Step 3 – Account Security
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const STEP_FIELDS: Record<number, (keyof DoctorFormInputs)[]> = {
  1: ["fullName", "email", "countryCode", "phoneNumber", "gender"],
  2: ["specialty", "licenseNumber", "yearsOfExperience", "qualifications"],
  3: ["password", "confirmPassword", "agreeTerms"],
};

const steps = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Professional Info" },
  { number: 3, label: "Account Security" },
];

export default function DoctorRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
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
    trigger,
    formState: { errors },
  } = useForm<DoctorFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+1",
      phoneNumber: "",
      gender: "",
      specialty: "",
      licenseNumber: "",
      yearsOfExperience: "",
      qualifications: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const agreeTerms = watch("agreeTerms");

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[currentStep]);
    if (valid) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const onSubmit = async (data: DoctorFormInputs) => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      console.log("Doctor registration submitted:", data);
      setAuthSuccess("Account created successfully! Redirecting to sign in...");
      router.push("/sign-in");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAuthError(
        "Failed to create account. Please check your information and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          return (
            <React.Fragment key={step.number}>
              {/* Step bubble + label */}
              <div className="flex flex-col items-center gap-1 min-w-0">
                <div
                  className={`flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all duration-200 shrink-0 ${
                    isCompleted
                      ? "bg-[#06836B] text-white"
                      : isActive
                        ? "bg-[#06836B] text-white ring-4 ring-[#06836B]/20"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold whitespace-nowrap ${
                    isActive ? "text-[#06836B]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line (between steps) */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? "bg-[#06836B]" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {authError && (
        <Alert severity="error" className="rounded-xl">
          {authError}
        </Alert>
      )}
      {authSuccess && (
        <Alert severity="success" className="rounded-xl">
          {authSuccess}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ── STEP 1: Personal Info ── */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "At least 2 characters required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="doctor-fullname-input"
                  label="Full Name"
                  placeholder="Dr. Jane Smith"
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

            {/* Email */}
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
                  id="doctor-email-input"
                  label="Email Address"
                  placeholder="doctor@hospital.com"
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
                  sx={textFieldSx}
                />
              )}
            />

            {/* Phone */}
            <div className="flex gap-2">
              <div className="w-1/4">
                <Controller
                  name="countryCode"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined" sx={textFieldSx}>
                      <InputLabel id="doctor-country-code-label">
                        Code
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="doctor-country-code-label"
                        id="doctor-country-code-select"
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
                      id="doctor-phone-input"
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

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.gender}
                  sx={textFieldSx}
                >
                  <InputLabel id="doctor-gender-label">Gender</InputLabel>
                  <Select
                    {...field}
                    labelId="doctor-gender-label"
                    id="doctor-gender-select"
                    label="Gender"
                    startAdornment={
                      <InputAdornment position="start">
                        <HiOutlineUserCircle
                          className="text-[#06836B]"
                          size={20}
                        />
                      </InputAdornment>
                    }
                    sx={{ borderRadius: "0.75rem" }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer_not_to_say">
                      Prefer not to say
                    </MenuItem>
                  </Select>
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
        )}

        {/* ── STEP 2: Professional Info ── */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            {/* Medical Specialty */}
            <Controller
              name="specialty"
              control={control}
              rules={{ required: "Medical specialty is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.specialty}
                  sx={textFieldSx}
                >
                  <InputLabel id="doctor-specialty-label">
                    Medical Specialty
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="doctor-specialty-label"
                    id="doctor-specialty-select"
                    label="Medical Specialty"
                    startAdornment={
                      <InputAdornment position="start">
                        <LuStethoscope className="text-[#06836B]" size={18} />
                      </InputAdornment>
                    }
                    sx={{ borderRadius: "0.75rem" }}
                    MenuProps={{ slotProps: { paper: { style: { maxHeight: 260 } } } }}
                  >
                    {medicalSpecialties.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.specialty && (
                    <FormHelperText>{errors.specialty.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Medical License Number */}
            <Controller
              name="licenseNumber"
              control={control}
              rules={{ required: "Medical License Number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="doctor-license-input"
                  label="Medical License Number"
                  placeholder="e.g. MD-12345678"
                  fullWidth
                  variant="outlined"
                  error={!!errors.licenseNumber}
                  helperText={errors.licenseNumber?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <HiIdentification
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

            {/* Years of Experience */}
            <Controller
              name="yearsOfExperience"
              control={control}
              rules={{
                required: "Years of experience is required",
                min: { value: 0, message: "Must be 0 or more" },
                max: { value: 60, message: "Please enter a valid value" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="doctor-experience-input"
                  label="Years of Experience"
                  placeholder="e.g. 5"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.yearsOfExperience}
                  helperText={errors.yearsOfExperience?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LuTimer className="text-[#06836B]" size={18} />
                        </InputAdornment>
                      ),
                      inputProps: { min: 0, max: 60 },
                    },
                  }}
                  sx={textFieldSx}
                />
              )}
            />

            {/* Qualifications / Degree */}
            <Controller
              name="qualifications"
              control={control}
              rules={{ required: "Qualifications are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="doctor-qualifications-input"
                  label="Qualifications / Degree"
                  placeholder="e.g. MBBS, MD, FACC"
                  fullWidth
                  variant="outlined"
                  error={!!errors.qualifications}
                  helperText={errors.qualifications?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <HiAcademicCap className="text-[#06836B]" size={20} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                />
              )}
            />
          </div>
        )}

        {/* ── STEP 3: Account Security ── */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4">
            {/* Password */}
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
                  id="doctor-password-input"
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
                            onClick={() => setShowPassword((p) => !p)}
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

            {/* Confirm Password */}
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
                  id="doctor-confirm-password-input"
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
                          <HiLockClosed className="text-[#06836B]" size={20} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword((p) => !p)}
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

            {/* Terms Checkbox */}
            <Controller
              name="agreeTerms"
              control={control}
              rules={{ required: "You must agree to the Terms of Service" }}
              render={({ field }) => (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        id="doctor-agree-terms-checkbox"
                        checked={field.value}
                        size="small"
                        sx={checkboxSx}
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

            {/* Submit */}
            <Button
              type="submit"
              id="doctor-register-submit-btn"
              fullWidth
              disabled={isSubmitting || !agreeTerms}
              variant="contained"
              sx={submitButtonSx}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={20} color="inherit" />
                  Creating Account...
                </span>
              ) : (
                "Create Doctor Account"
              )}
            </Button>
          </div>
        )}

        {/* ── Navigation Buttons ── */}
        <div
          className={`flex gap-3 mt-5 ${currentStep === 1 ? "justify-end" : "justify-between"}`}
        >
          {currentStep > 1 && (
            <Button
              type="button"
              id="doctor-back-btn"
              variant="outlined"
              onClick={handleBack}
              startIcon={<HiChevronLeft size={18} />}
              sx={{
                borderRadius: "0.75rem",
                textTransform: "none",
                fontWeight: 600,
                borderColor: "rgba(6,131,107,0.4)",
                color: "#06836B",
                "&:hover": {
                  borderColor: "#06836B",
                  backgroundColor: "rgba(6,131,107,0.04)",
                },
              }}
            >
              Back
            </Button>
          )}

          {currentStep < 3 && (
            <Button
              type="button"
              id="doctor-next-btn"
              variant="contained"
              onClick={handleNext}
              endIcon={<HiChevronRight size={18} />}
              sx={{
                ...submitButtonSx,
                px: 3,
                py: 1.2,
                fontSize: "0.875rem",
              }}
            >
              Next Step
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
