"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaArrowRight,
} from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { slugify } from "@/utils/slugify";
import { Badge } from "@mui/material";

export interface DoctorCardItem {
  id: string | number;
  name: string;
  image: string;
  speciality: string;
  degree?: string;
  rating: number;
  reviewCount: number;
  experience: number;
  consultationType: string;
  consultationFee: number;
  location?: string;
  availableDays?: string[];
  timeslots?: string[];
}

interface AvailableTodayDoctorCardProps {
  doctor: DoctorCardItem;
  onBookAppointment: (doctor: DoctorCardItem, slot?: string) => void;
  currencySymbol?: string;
}

export default function AvailableTodayDoctorCard({
  doctor,
  onBookAppointment,
  currencySymbol = "$",
}: AvailableTodayDoctorCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showAllSlots, setShowAllSlots] = useState(false);

  // Generate slots for today
  const defaultSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
  ];

  // Derive slots from doctor.timeslots or default fallback slots
  const allSlots =
    doctor.timeslots && doctor.timeslots.length > 0
      ? doctor.timeslots.map((slot) => {
          // Format "09:00 AM - 10:00 AM" to "09:00 AM" if needed
          return slot.split(" - ")[0] || slot;
        })
      : defaultSlots;

  const initialSlotsCount = 3;
  const visibleSlots = showAllSlots
    ? allSlots
    : allSlots.slice(0, initialSlotsCount);
  const remainingCount = Math.max(0, allSlots.length - initialSlotsCount);

  // Normalize consultation fee display for dollar / taka
  const displayFee =
    doctor.consultationFee > 150
      ? Math.round(doctor.consultationFee / 25)
      : doctor.consultationFee;

  const hasOnline = doctor.consultationType?.toLowerCase().includes("online");
  const hasInPerson =
    doctor.consultationType?.toLowerCase().includes("person") ||
    !doctor.consultationType;

  const locationText = doctor.location || "City Medical Center, Dhaka";

  return (
    <div className="group bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-100/90 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:items-center justify-between gap-4 sm:gap-5 lg:gap-6">
        {/* Left & Center: Doctor Info */}
        <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className="size-28 sm:size-24 md:size-28 lg:size-36 rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/70">
              <Image
                src={doctor.image || "/images/doctors/doctor-1.png"}
                alt={doctor.name}
                width={144}
                height={144}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
            {/* Doctor Name & Verified Badge */}
            <div className="flex items-center flex-wrap gap-1.5">
              <Link
                href={`/find-care/doctors/${slugify(doctor.name)}`}
                className="font-bold text-slate-900 text-sm sm:text-base md:text-lg hover:text-[#06836b] transition-colors line-clamp-1"
              >
                {doctor.name}
              </Link>
            </div>

            {/* Speciality */}
            <p className="text-xs sm:text-sm font-semibold text-[#06836b] truncate">
              {doctor.speciality}
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <FaStar className="text-xs shrink-0" />
                <span>{doctor.rating.toFixed(1)}</span>
              </div>
              <span className="text-slate-400 font-normal">
                ({doctor.reviewCount} reviews)
              </span>
            </div>

            {/* Experience */}
            <p className="text-xs sm:text-sm text-slate-600">
              {doctor.experience} years experience
            </p>

            {/* Location */}
            <div className="flex items-start gap-1 lg:gap-2 text-xs text-slate-500 pt-0.5">
              <FaMapMarkerAlt className="text-slate-400 shrink-0" />
              <span className="">{locationText}</span>
            </div>

            {/* Tags: Online / In-Person */}
            <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
              {doctor.consultationType?.toLowerCase().includes("online") && (
                <Badge className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 sm:text-sm">
                  <HiOutlineVideoCamera />
                  Video Consultation
                </Badge>
              )}
              {doctor.consultationType?.toLowerCase().includes("person") && (
                <Badge className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 sm:text-sm">
                  <FiUserCheck />
                  In-person
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right: Booking Box & Actions */}
        <div className="flex flex-col justify-between items-start lg:items-end gap-3 lg:w-72 xl:w-80 shrink-0 pt-3.5 sm:pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Top row: Available Today Badge & Heart Favorite */}
          <div className="flex items-center justify-between w-full">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#06836b] border border-emerald-100">
              Available Today
            </span>

            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
              className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
            >
              {isFavorite ? (
                <FaHeart className="text-rose-500 text-base" />
              ) : (
                <FaRegHeart className="text-slate-400 hover:text-rose-500 text-base" />
              )}
            </button>
          </div>

          {/* Next Available Slots */}
          <div className="w-full space-y-1.5">
            <p className="text-xs font-medium text-slate-500">
              Next available slots
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {visibleSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      const next = isSelected ? null : slot;
                      setSelectedSlot(next);
                      if (next) {
                        onBookAppointment(doctor, next);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#06836b] text-white border-[#06836b] shadow-xs"
                        : "bg-emerald-50/50 hover:bg-emerald-50 text-[#06836b] border-emerald-100/80"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}

              {!showAllSlots && remainingCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllSlots(true)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                >
                  +{remainingCount} More
                </button>
              )}
            </div>
          </div>

          {/* Fee & Action Buttons */}
          <div className="w-full space-y-2.5 pt-0.5">
            {/* Consultation Fee */}
            <div className="flex items-baseline justify-between sm:justify-start gap-1.5 w-full">
              <span className="text-xs text-slate-500 font-medium">
                Consultation Fee:
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#06836b]">
                {currencySymbol}
                {displayFee}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-2 w-full">
              <button
                type="button"
                onClick={() =>
                  onBookAppointment(doctor, selectedSlot || visibleSlots[0])
                }
                className="w-full py-2.5 px-3 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-semibold text-xs xl:text-sm text-center shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Book Appointment
              </button>

              <Link
                href={`/find-care/doctors/${slugify(doctor.name)}`}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Profile</span>
                <FaArrowRight className="text-xs text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
