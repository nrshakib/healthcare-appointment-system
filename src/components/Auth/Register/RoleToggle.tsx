"use client";

import React from "react";
import { HiUserCircle } from "react-icons/hi2";
import { LuStethoscope } from "react-icons/lu";

interface RoleToggleProps {
  role: "patient" | "doctor";
  onChange: (role: "patient" | "doctor") => void;
}

export default function RoleToggle({ role, onChange }: RoleToggleProps) {
  return (
    <div className="flex items-center w-full rounded-xl bg-gray-100 p-1 gap-1">
      <button
        type="button"
        id="role-toggle-patient"
        onClick={() => onChange("patient")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-sm font-semibold transition-all duration-200 cursor-pointer ${
          role === "patient"
            ? "bg-white text-[#06836B] shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <HiUserCircle size={18} />
        <span>Patient</span>
      </button>

      <button
        type="button"
        id="role-toggle-doctor"
        onClick={() => onChange("doctor")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-sm font-semibold transition-all duration-200 cursor-pointer ${
          role === "doctor"
            ? "bg-white text-[#06836B] shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <LuStethoscope size={17} />
        <span>Doctor</span>
      </button>
    </div>
  );
}
