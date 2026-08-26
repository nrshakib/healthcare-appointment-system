/* eslint-disable @next/next/no-img-element */
"use client";

// import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// MUI Components
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// Icons
import { FcGoogle } from "react-icons/fc";

// Register components
// import RoleToggle from "@/components/Auth/Register/RoleToggle";
import PatientRegisterForm from "@/components/Auth/Register/PatientRegisterForm";
// import DoctorRegisterForm from "@/components/Auth/Register/DoctorRegisterForm";

export default function RegisterPage() {
  // const [role, setRole] = useState<"patient" | "doctor">("patient");

  // const handleRoleChange = (newRole: "patient" | "doctor") => {
  //   setRole(newRole);
  // };

  return (
    <div className="min-h-screen flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Main Card Container */}
      <div className="max-w-5xl mx-auto w-full rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Branding & Hero Illustration */}
        <div className="lg:col-span-5 p-4 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200/80">
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
            © {new Date().getFullYear()} MediCare Inc. Safe &amp; encrypted
            authentication.
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-4 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <div className="mb-5">
              <h2 className="text-2xl font-bold mb-1">Register</h2>
              <p className="text-sm text-gray-500">
                Fill in your details to create an account
              </p>
            </div>

            {/* Role Toggle */}
            {/* <div className="mb-5">
              <RoleToggle role={role} onChange={handleRoleChange} />
            </div> */}

            {/* Role-based subtitle */}
            {/* <div className="mb-4">
              {role === "patient" ? (
                <p className="text-xs text-gray-400 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                  🏥 Registering as a{" "}
                  <span className="font-semibold text-[#06836B]">Patient</span>{" "}
                  — fill in your personal details below.
                </p>
              ) : (
                <p className="text-xs text-gray-400 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                  🩺 Registering as a{" "}
                  <span className="font-semibold text-[#06836B]">Doctor</span> —
                  complete the 3 steps to set up your account.
                </p>
              )}
            </div> */}

            {/* Forms — conditionally rendered by role */}
            {/* {role === "patient" ? (
              <PatientRegisterForm />
            ) : (
              <DoctorRegisterForm />
            )} */}

            <PatientRegisterForm />

            {/* Social Login Divider */}
            <div className="my-5">
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
                color: "#1a202c",
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
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
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
