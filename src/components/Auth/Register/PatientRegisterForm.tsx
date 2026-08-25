/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Icons
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { countryCodes } from "@/utils/countryCodes";
import { textFieldSx, submitButtonSx, checkboxSx } from "./textFieldSx";

const datePickerTheme = createTheme({
  palette: {
    primary: {
      main: "#06836B",
      light: "#0db996",
      dark: "#056d59",
      contrastText: "#ffffff",
    },
  },
});

interface PatientFormInputs {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  dateOfBirth: Dayjs | null;
  gender: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function PatientRegisterForm() {
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
  } = useForm<PatientFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+1",
      phoneNumber: "",
      dateOfBirth: null,
      gender: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const passwordValue = watch("password");
  const agreeTerms = watch("agreeTerms");

  const onSubmit = async (data: PatientFormInputs) => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const payload = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? dayjs(data.dateOfBirth).format("YYYY-MM-DD")
          : "",
      };
      console.log("Patient registration submitted:", payload);
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
    <div className="space-y-4">
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Full Name */}
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: "Full name is required",
            minLength: { value: 2, message: "At least 2 characters required" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="patient-fullname-input"
              label="Full Name"
              placeholder="John Doe"
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
              id="patient-email-input"
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
              sx={textFieldSx}
            />
          )}
        />

        {/* Phone */}
        <div className="flex gap-1 sm:gap-2">
          <div className="w-1/4">
            <Controller
              name="countryCode"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined" sx={textFieldSx}>
                  <InputLabel id="patient-country-code-label">Code</InputLabel>
                  <Select
                    {...field}
                    labelId="patient-country-code-label"
                    id="patient-country-code-select"
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
                            className="w-4 sm:w-5 h-3 sm:h-3.5 object-cover rounded-xs"
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
                  id="patient-phone-input"
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

        {/* Date of Birth & Gender side by side */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{
                required: "Date of birth is required",
                validate: (val) =>
                  (val && dayjs(val).isValid()) || "Please select a valid date",
              }}
              render={({ field }) => (
                <ThemeProvider theme={datePickerTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={field.value}
                      onChange={(newVal) => field.onChange(newVal)}
                      disableFuture
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          id: "patient-dob-input",
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth?.message,
                          sx: textFieldSx,
                        },
                        desktopPaper: {
                          sx: {
                            borderRadius: "16px",
                            boxShadow:
                              "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                          },
                        },
                        mobilePaper: {
                          sx: { borderRadius: "16px" },
                        },
                        actionBar: {
                          actions: ["cancel", "accept"],
                          sx: {
                            px: 2,
                            pb: 1,
                            gap: 1,
                            "& .MuiButton-root": {
                              border: "1.5px solid",
                              borderColor: "primary.main",
                              borderRadius: "8px",
                              textTransform: "none",
                              fontWeight: 600,
                              color: "primary.main",
                              px: 2,
                              "&:hover": {
                                backgroundColor: "primary.main",
                                color: "#fff",
                                borderColor: "primary.main",
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              )}
            />
          </div>
          <div className="w-full sm:w-1/2">
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
                  <InputLabel id="patient-gender-label">Gender</InputLabel>
                  <Select
                    {...field}
                    labelId="patient-gender-label"
                    id="patient-gender-select"
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
        </div>

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
              id="patient-password-input"
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
                          <HiEyeSlash size={20} className="text-[#06836B]" />
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
              id="patient-confirm-password-input"
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
                          <HiEyeSlash size={20} className="text-[#06836B]" />
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
                    id="patient-agree-terms-checkbox"
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
          id="patient-register-submit-btn"
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
            "Create Patient Account"
          )}
        </Button>
      </form>
    </div>
  );
}
