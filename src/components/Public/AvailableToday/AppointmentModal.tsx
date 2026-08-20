"use client";

import { useState } from "react";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import { IoCheckmarkCircle, IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { DoctorCardItem } from "./AvailableTodayDoctorCard";

interface AppointmentModalProps {
  doctor: DoctorCardItem | null;
  selectedSlot?: string | null;
  isOpen: boolean;
  onClose: () => void;
  currencySymbol?: string;
}

export default function AppointmentModal({
  doctor,
  selectedSlot,
  isOpen,
  onClose,
  currencySymbol = "$",
}: AppointmentModalProps) {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [consultationType, setConsultationType] = useState<"Online" | "In-Person">("Online");
  const [selectedCustomSlot, setSelectedCustomSlot] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !doctor) return null;

  const defaultSlot =
    selectedSlot ||
    (doctor.timeslots && doctor.timeslots.length > 0
      ? doctor.timeslots[0].split(" - ")[0]
      : "10:00 AM");
  const activeSlot = selectedCustomSlot || defaultSlot;

  const displayFee =
    doctor.consultationFee > 150
      ? Math.round(doctor.consultationFee / 25)
      : doctor.consultationFee;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setSymptoms("");
    setSelectedCustomSlot(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-[#f8fdfb] shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded-full bg-emerald-100 text-[#06836b] flex items-center justify-center">
              <FaCalendarAlt className="text-xs sm:text-sm" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg">
              Book Today&apos;s Appointment
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          {isSuccess ? (
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="size-14 sm:size-16 rounded-full bg-emerald-50 text-[#06836b] flex items-center justify-center mx-auto">
                <IoCheckmarkDoneCircle className="text-3xl sm:text-4xl" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Your appointment with <span className="font-semibold text-slate-800">{doctor.name}</span> has been scheduled for today at <span className="font-semibold text-[#06836b]">{activeSlot}</span> ({consultationType}).
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 text-left text-xs sm:text-sm text-slate-700 space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-medium">{patientName || "Guest Patient"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-bold text-[#06836b]">
                    {currencySymbol}
                    {displayFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Phone:</span>
                  <span className="font-medium">{patientPhone || "+880 1700-000000"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Doctor Summary Banner */}
              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#f0fdf9] border border-emerald-100">
                <div className="size-12 sm:size-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={doctor.image || "/images/doctors/doctor-1.png"}
                    alt={doctor.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {doctor.name}
                    </p>
                    <IoCheckmarkCircle className="text-[#06836b] text-xs shrink-0" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 truncate">{doctor.speciality}</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#06836b] mt-0.5">
                    Fee: {currencySymbol}
                    {displayFee}
                  </p>
                </div>
              </div>

              {/* Consultation Type Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultationType("Online")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      consultationType === "Online"
                        ? "bg-[#06836b] text-white border-[#06836b]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Online Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType("In-Person")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      consultationType === "In-Person"
                        ? "bg-[#06836b] text-white border-[#06836b]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    In-Person Visit
                  </button>
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Time Slot Today
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(doctor.timeslots && doctor.timeslots.length > 0
                    ? doctor.timeslots.map((slot) => slot.split(" - ")[0] || slot)
                    : ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
                  ).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedCustomSlot(slot)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        activeSlot === slot
                          ? "bg-[#06836b] text-white border-[#06836b]"
                          : "bg-emerald-50 text-[#06836b] border-emerald-100 hover:bg-emerald-100/60"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Contact Information */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700..."
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of symptoms..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Confirming Appointment...</span>
                ) : (
                  <span>Confirm & Book for {activeSlot}</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
