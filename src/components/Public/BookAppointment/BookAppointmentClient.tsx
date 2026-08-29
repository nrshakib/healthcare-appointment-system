/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaRegClock,
  FaStar,
  FaUser,
  FaUserFriends,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaArrowLeft,
  FaPrint,
  FaSearch,
  FaTimes,
  FaExchangeAlt,
  FaCheck,
  FaLock,
  FaFileMedical,
  FaTrash,
} from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";
import { TbHome2Filled } from "react-icons/tb";
import { BsWhatsapp } from "react-icons/bs";

import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";

export default function BookAppointmentClient() {
  const searchParams = useSearchParams();

  // Extract query parameters
  const doctorParam =
    searchParams.get("doctor") ||
    searchParams.get("slug") ||
    searchParams.get("id") ||
    "";

  // Doctor resolution based on URL params
  const initialDoctor = useMemo(() => {
    if (!doctorParam) return doctors[0];

    const cleanParam = doctorParam.trim().toLowerCase();

    // 1. Match by slug
    const bySlug = doctors.find(
      (d) => slugify(d.name).toLowerCase() === cleanParam
    );
    if (bySlug) return bySlug;

    // 2. Match by exact or partial name
    const byName = doctors.find(
      (d) =>
        d.name.toLowerCase() === cleanParam ||
        d.name.toLowerCase().includes(cleanParam)
    );
    if (byName) return byName;

    // 3. Match by ID
    const byId = doctors.find((d) => String(d.id) === cleanParam);
    if (byId) return byId;

    return doctors[0];
  }, [doctorParam]);

  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);
  const [isDoctorPickerOpen, setIsDoctorPickerOpen] = useState(false);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");

  // Consultation Type
  const [consultationType, setConsultationType] = useState<"Online" | "In-Person">(() => {
    const isOnlineSupported = initialDoctor.consultationType
      ?.toLowerCase()
      .includes("online");
    const isInPersonSupported = initialDoctor.consultationType
      ?.toLowerCase()
      .includes("person");
    if (!isOnlineSupported && isInPersonSupported) return "In-Person";
    return "Online";
  });

  // Generate next 14 calendar dates
  const calendarDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const shortDay = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate();
      const monthShort = date.toLocaleDateString("en-US", { month: "short" });
      const formattedIso = date.toISOString().split("T")[0];

      const isAvailableDay =
        Array.isArray(selectedDoctor.availableDays) &&
        selectedDoctor.availableDays.includes(dayName);

      dates.push({
        fullDate: date,
        dayName,
        shortDay,
        dayNumber,
        monthShort,
        formattedIso,
        isToday: i === 0,
        isAvailableDay,
      });
    }
    return dates;
  }, [selectedDoctor]);

  // Selected date state
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    const isTodayAvail =
      Array.isArray(initialDoctor.availableDays) &&
      initialDoctor.availableDays.includes(dayName);

    if (isTodayAvail) return today.toISOString().split("T")[0];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const curDayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (
        Array.isArray(initialDoctor.availableDays) &&
        initialDoctor.availableDays.includes(curDayName)
      ) {
        return date.toISOString().split("T")[0];
      }
    }
    return today.toISOString().split("T")[0];
  });

  // Slot generation based on doctor timeslots
  const timeSlots = useMemo(() => {
    if (selectedDoctor.timeslots && selectedDoctor.timeslots.length > 0) {
      return selectedDoctor.timeslots;
    }
    return [
      "09:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "04:00 PM - 05:00 PM",
      "07:00 PM - 08:00 PM",
    ];
  }, [selectedDoctor]);

  // Selected time slot
  const [selectedSlot, setSelectedSlot] = useState<string>(() => {
    return initialDoctor.timeslots?.[0] || "10:00 AM - 11:00 AM";
  });

  // Switch doctor handler
  const handleSelectDoctor = (doc: typeof doctors[0]) => {
    setSelectedDoctor(doc);
    setIsDoctorPickerOpen(false);

    // Ensure consultation type is compatible
    const isOnline = doc.consultationType?.toLowerCase().includes("online");
    const isInPerson = doc.consultationType?.toLowerCase().includes("person");
    if (!isOnline && isInPerson) {
      setConsultationType("In-Person");
    } else if (isOnline && !isInPerson) {
      setConsultationType("Online");
    }

    // Pick first available date for the newly selected doctor
    const today = new Date();
    let foundDate = today.toISOString().split("T")[0];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (Array.isArray(doc.availableDays) && doc.availableDays.includes(dName)) {
        foundDate = date.toISOString().split("T")[0];
        break;
      }
    }
    setSelectedDate(foundDate);

    // Pick first slot
    if (doc.timeslots && doc.timeslots.length > 0) {
      setSelectedSlot(doc.timeslots[0]);
    }
  };

  // Patient Info Form State
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [bloodGroup, setBloodGroup] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [reminderSms, setReminderSms] = useState(true);
  const [reminderWhatsapp, setReminderWhatsapp] = useState(true);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<
    "bkash" | "nagad" | "card" | "cash"
  >("bkash");

  // Promo Code
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Submission & Success state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);

  // Filtered doctors list for doctor picker modal
  const filteredDoctorsForPicker = useMemo(() => {
    if (!doctorSearchQuery.trim()) return doctors;
    const q = doctorSearchQuery.toLowerCase();
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.speciality.toLowerCase().includes(q) ||
        d.location?.toLowerCase().includes(q)
    );
  }, [doctorSearchQuery]);

  // Handle promo code application
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "MEDICARE10" || code === "HEALTH10") {
      const discount = Math.round(selectedDoctor.consultationFee * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage({
        text: `10% discount (৳${discount}) applied successfully!`,
        isError: false,
      });
    } else if (code === "MEDICARE50" || code === "SAVE50") {
      setAppliedDiscount(50);
      setPromoMessage({
        text: "৳50 instant discount applied!",
        isError: false,
      });
    } else if (code === "FIRSTFREE" || code === "CARE100") {
      const discount = Math.min(selectedDoctor.consultationFee, 100);
      setAppliedDiscount(discount);
      setPromoMessage({
        text: `৳${discount} promotional discount applied!`,
        isError: false,
      });
    } else {
      setAppliedDiscount(0);
      setPromoMessage({
        text: "Invalid promo code. Try MEDICARE10 or SAVE50",
        isError: true,
      });
    }
  };

  // File upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const fee = selectedDoctor.consultationFee;
  const platformFee = 0; // free platform fee promo
  const totalAmount = Math.max(0, fee + platformFee - appliedDiscount);

  // Form submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `MED-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const selectedDateObj = calendarDates.find(
      (d) => d.formattedIso === selectedDate
    );
    const dateFormatted = selectedDateObj
      ? `${selectedDateObj.dayName}, ${selectedDateObj.monthShort} ${selectedDateObj.dayNumber}, ${selectedDateObj.fullDate.getFullYear()}`
      : selectedDate;

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccessData({
        bookingId,
        doctor: selectedDoctor,
        consultationType,
        date: dateFormatted,
        timeSlot: selectedSlot,
        patientName: fullName || "Guest Patient",
        phoneNumber: phoneNumber || "+880 1700-000000",
        email: email || "patient@example.com",
        bookingFor,
        paymentMethod,
        totalAmount,
        symptoms,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  // SUCCESS CONFIRMATION VIEW
  if (bookingSuccessData) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl text-center space-y-5">
            <div className="size-20 rounded-full bg-emerald-50 text-[#06836b] flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
              <FaCheckCircle />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100/70 text-[#06836b] text-xs sm:text-sm font-bold">
                Appointment Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Your Appointment is Scheduled!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
                We have sent an instant SMS and email confirmation with all
                the appointment instructions to{" "}
                <span className="font-semibold text-slate-800">
                  {bookingSuccessData.email}
                </span>
                .
              </p>
            </div>

            {/* Reference ID Card */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[#f0fdf9] border border-emerald-200/80 rounded-2xl px-6 py-3.5">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">
                Appointment Reference ID:
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-[#06836b] tracking-wider">
                {bookingSuccessData.bookingId}
              </span>
            </div>

            {/* Appointment Details Printable Receipt */}
            <div
              id="appointment-receipt"
              className="bg-slate-50/90 rounded-2xl p-5 sm:p-7 border border-slate-200/70 text-left space-y-5 text-sm"
            >
              {/* Doctor Row */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="size-16 sm:size-20 rounded-2xl overflow-hidden bg-white shadow-xs shrink-0">
                  <Image
                    src={
                      bookingSuccessData.doctor.image ||
                      "/images/doctors/doctor-1.png"
                    }
                    alt={bookingSuccessData.doctor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      {bookingSuccessData.doctor.name}
                    </h3>
                    <FaCheckCircle className="text-[#06836b] text-sm shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#06836b] font-semibold">
                    {bookingSuccessData.doctor.speciality}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {bookingSuccessData.doctor.degree} •{" "}
                    {bookingSuccessData.doctor.location}
                  </p>
                </div>
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span className="font-bold text-slate-800">
                    {bookingSuccessData.date}
                  </span>
                  <span className="block font-semibold text-[#06836b] mt-0.5">
                    {bookingSuccessData.timeSlot}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Consultation Type:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    {bookingSuccessData.consultationType === "Online" ? (
                      <>
                        <HiOutlineVideoCamera className="text-sky-600 text-base" />
                        Online Video Consultation
                      </>
                    ) : (
                      <>
                        <FiUserCheck className="text-indigo-600 text-base" />
                        In-Person Hospital Visit
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Patient Name:</span>
                  <span className="font-bold text-slate-800">
                    {bookingSuccessData.patientName}
                  </span>
                  <span className="block text-slate-500 text-xs mt-0.5">
                    Phone: {bookingSuccessData.phoneNumber}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Payment Summary:</span>
                  <span className="font-bold text-[#06836b] text-base">
                    ৳{bookingSuccessData.totalAmount}
                  </span>
                  <span className="block text-slate-500 text-xs mt-0.5 uppercase font-medium">
                    Method: {bookingSuccessData.paymentMethod} (Confirmed)
                  </span>
                </div>
              </div>

              {/* Video or In-person guidance */}
              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
                <FaShieldAlt className="text-[#06836b] text-sm shrink-0 mt-0.5" />
                <div>
                  {bookingSuccessData.consultationType === "Online" ? (
                    <p>
                      <strong>Video Link Details:</strong> Your HD Video Room link
                      has been generated and sent to your email and SMS. Please join
                      5 minutes prior to the scheduled time.
                    </p>
                  ) : (
                    <p>
                      <strong>Hospital Visit Note:</strong> Please present your
                      Booking Reference ID (<strong>{bookingSuccessData.bookingId}</strong>)
                      at the reception desk upon your arrival at {bookingSuccessData.doctor.location}.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
              >
                <FaPrint />
                Print / Save Receipt
              </button>

              <Link
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  `Doctor Appointment with ${bookingSuccessData.doctor.name}`
                )}&details=${encodeURIComponent(
                  `Medicare Appointment: ${bookingSuccessData.consultationType} consultation.\nReference ID: ${bookingSuccessData.bookingId}\nDoctor: ${bookingSuccessData.doctor.name} (${bookingSuccessData.doctor.speciality})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-sm transition-colors cursor-pointer shadow-xs"
              >
                <FaCalendarAlt className="text-[#06836b]" />
                Add to Google Calendar
              </Link>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccessData(null);
                  setFullName("");
                  setSymptoms("");
                  setUploadedFiles([]);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafcfb] pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-[#eaf6f4] py-3 border-b border-emerald-100/50">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[85%] xl:px-0">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              py: { xs: 1, sm: 2 },
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
              },
            }}
          >
            <Link
              href="/"
              className="text-primary hover:text-emerald-700 transition-colors"
            >
              <TbHome2Filled className="text-lg" />
            </Link>
            <Link
              href="/find-care/doctors"
              className="text-slate-600 hover:text-primary transition-colors"
            >
              Find Care
            </Link>
            <Link
              href={`/find-care/doctors/${slugify(selectedDoctor.name)}`}
              className="text-slate-600 hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-none"
            >
              {selectedDoctor.name}
            </Link>
            <p className="text-primary font-semibold">Book Appointment</p>
          </Breadcrumbs>
        </div>
      </div>

      {/* Page Title & Intro */}
      <div className="mx-auto max-w-[95%] xl:max-w-[85%] pt-6 sm:pt-8 px-4 xl:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Book Doctor Appointment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select your preferred date, time slot, and consultation mode to
              confirm instant booking.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#06836b] bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl w-fit">
            <FaShieldAlt className="text-sm" />
            <span>Verified Doctors • 100% Secure & HIPAA Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left (col-span-8) + Summary Right (col-span-4) */}
      <main className="mx-auto max-w-[95%] xl:max-w-[85%] pt-8 px-4 xl:px-0">
        <form
          onSubmit={handleSubmitBooking}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* LEFT COLUMN: Booking Steps */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Doctor Profile Highlight Card */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Doctor Avatar */}
                  <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={selectedDoctor.image || "/images/doctors/doctor-1.png"}
                      alt={selectedDoctor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {selectedDoctor.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#06836b] bg-emerald-50 px-2 py-0.5 rounded-md">
                        <FaCheckCircle className="text-xs" /> Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#06836b]">
                      {selectedDoctor.speciality}
                    </p>

                    <p className="text-xs text-slate-500 truncate">
                      {selectedDoctor.degree}
                    </p>

                    <div className="flex items-center flex-wrap gap-3 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-amber-500">
                        <FaStar className="text-xs" />
                        {selectedDoctor.rating} ({selectedDoctor.reviewCount} reviews)
                      </span>
                      <span>•</span>
                      <span>{selectedDoctor.experience} Years Exp.</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 pt-1">
                      <FaMapMarkerAlt className="text-primary shrink-0" />
                      <span className="truncate">{selectedDoctor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Switch Doctor Button */}
                <div className="sm:self-center shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsDoctorPickerOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    <FaExchangeAlt className="text-[#06836b]" />
                    Change Doctor
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Step 1: Consultation Type */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Select Consultation Mode
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Video Consultation */}
                <button
                  type="button"
                  onClick={() => setConsultationType("Online")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    consultationType === "Online"
                      ? "border-[#06836b] bg-[#f0fdf9] shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="size-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl">
                      <HiOutlineVideoCamera />
                    </div>
                    {consultationType === "Online" && (
                      <span className="size-5 rounded-full bg-[#06836b] text-white flex items-center justify-center text-xs">
                        <FaCheck />
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      Video Consultation
                    </p>
                    <p className="text-xs text-slate-500">
                      Join from phone or computer. Instant digital prescription
                      included.
                    </p>
                  </div>
                </button>

                {/* In-Person Visit */}
                <button
                  type="button"
                  onClick={() => setConsultationType("In-Person")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    consultationType === "In-Person"
                      ? "border-[#06836b] bg-[#f0fdf9] shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="size-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl">
                      <FiUserCheck />
                    </div>
                    {consultationType === "In-Person" && (
                      <span className="size-5 rounded-full bg-[#06836b] text-white flex items-center justify-center text-xs">
                        <FaCheck />
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      In-Person Chamber Visit
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      At {selectedDoctor.location || "Hospital Chamber"}. Physical examination.
                    </p>
                  </div>
                </button>
              </div>
            </section>

            {/* 3. Step 2: Date & Time Selection */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Choose Date & Available Slot
                  </h3>
                </div>
              </div>

              {/* Date Horizontal Carousel */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Appointment Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {calendarDates.map((item) => {
                    const isSelected = selectedDate === item.formattedIso;
                    return (
                      <button
                        key={item.formattedIso}
                        type="button"
                        onClick={() => setSelectedDate(item.formattedIso)}
                        className={`shrink-0 w-20 sm:w-22 py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? "bg-[#06836b] text-white border-[#06836b] shadow-md scale-102"
                            : item.isAvailableDay
                            ? "bg-slate-50 hover:bg-emerald-50/50 border-slate-200 text-slate-700"
                            : "bg-slate-50/60 border-slate-100 text-slate-400 opacity-70"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-semibold ${
                            isSelected ? "text-emerald-100" : "text-slate-500"
                          }`}
                        >
                          {item.shortDay}
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold leading-none">
                          {item.dayNumber}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-tight ${
                            isSelected ? "text-emerald-100" : "text-slate-400"
                          }`}
                        >
                          {item.monthShort}
                        </span>
                        {item.isAvailableDay ? (
                          <span
                            className={`text-[9px] font-medium px-1 rounded ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-emerald-100 text-[#06836b]"
                            }`}
                          >
                            Open
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-400">Off</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Time Slot
                  </label>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <FaRegClock className="text-[#06836b]" />
                    30 mins per session
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-[#06836b] text-white border-[#06836b] shadow-xs"
                            : "bg-slate-50 hover:bg-emerald-50/60 text-slate-700 border-slate-200"
                        }`}
                      >
                        <FaRegClock
                          className={`text-xs ${
                            isSelected ? "text-white" : "text-primary"
                          }`}
                        />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 4. Step 3: Patient Information Form */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Patient Details
                  </h3>
                </div>
              </div>

              {/* Booking For Switcher */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Who is this appointment for?
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setBookingFor("self")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      bookingFor === "self"
                        ? "bg-[#06836b] text-white border-[#06836b]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <FaUser />
                    For Myself
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingFor("other")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      bookingFor === "other"
                        ? "bg-[#06836b] text-white border-[#06836b]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <FaUserFriends />
                    Someone Else
                  </button>
                </div>
              </div>

              {/* Patient Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 text-xs sm:text-sm">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700-000000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-3 text-xs sm:text-sm py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 text-xs sm:text-sm">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="patient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 text-xs sm:text-sm py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    placeholder="e.g. 28"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Male", "Female", "Other"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          gender === g
                            ? "bg-[#06836b] text-white border-[#06836b]"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Blood Group (Optional)
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* First Visit Radio */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Have you visited this doctor before?
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="firstVisit"
                        checked={isFirstVisit}
                        onChange={() => setIsFirstVisit(true)}
                        className="accent-[#06836b]"
                      />
                      First Visit
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="firstVisit"
                        checked={!isFirstVisit}
                        onChange={() => setIsFirstVisit(false)}
                        className="accent-[#06836b]"
                      />
                      Follow-up Visit
                    </label>
                  </div>
                </div>

                {/* Reason for Visit / Symptoms */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Reason for Visit & Health Symptoms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms or medical concern to help the doctor prepare..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
                  />
                </div>

                {/* Medical Reports Upload */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Attach Previous Prescriptions / Lab Reports (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-[#06836b] rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
                    <input
                      type="file"
                      id="report-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="report-upload"
                      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                      <FaFileMedical className="text-2xl text-[#06836b]" />
                      <span className="text-xs font-bold text-slate-700">
                        Click to upload files
                      </span>
                      <span className="text-[11px] text-slate-400">
                        PDF, PNG, JPG up to 10MB each
                      </span>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {uploadedFiles.map((file, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-[#06836b] text-xs font-medium border border-emerald-100"
                        >
                          <FaFileMedical />
                          <span className="max-w-[140px] truncate">{file}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="hover:text-rose-500 text-slate-400 ml-1 cursor-pointer"
                          >
                            <FaTrash className="text-[10px]" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 5. Step 4: Payment Methods */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Payment Method
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* bKash / Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-[#06836b] bg-[#f0fdf9] shadow-xs"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm">
                      ৳
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">
                        bKash / Nagad / Rocket
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Instant Mobile Banking
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "bkash" && (
                    <FaCheckCircle className="text-[#06836b]" />
                  )}
                </button>

                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#06836b] bg-[#f0fdf9] shadow-xs"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                      <FaCreditCard />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">
                        Credit / Debit Card
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Visa, Mastercard, AMEX
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <FaCheckCircle className="text-[#06836b]" />
                  )}
                </button>

                {/* Pay at Clinic (If in-person) */}
                {consultationType === "In-Person" && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-[#06836b] bg-[#f0fdf9] shadow-xs"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-emerald-50 text-[#06836b] flex items-center justify-center text-base">
                        <FaMoneyBillWave />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">
                          Pay Cash at Hospital
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Pay during appointment check-in
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "cash" && (
                      <FaCheckCircle className="text-[#06836b]" />
                    )}
                  </button>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reminderSms}
                    onChange={(e) => setReminderSms(e.target.checked)}
                    className="accent-[#06836b] size-4 rounded"
                  />
                  <span>Send SMS appointment reminder & meeting links</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reminderWhatsapp}
                    onChange={(e) => setReminderWhatsapp(e.target.checked)}
                    className="accent-[#06836b] size-4 rounded"
                  />
                  <span className="flex items-center gap-1">
                    <BsWhatsapp className="text-emerald-600" />
                    Receive appointment updates on WhatsApp
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xl space-y-5">
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl pb-3 border-b border-slate-100">
                Booking Summary
              </h3>

              {/* Doctor Quick Snapshot */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="size-12 rounded-xl overflow-hidden bg-white shrink-0">
                  <Image
                    src={selectedDoctor.image || "/images/doctors/doctor-1.png"}
                    alt={selectedDoctor.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {selectedDoctor.name}
                  </p>
                  <p className="text-[11px] font-semibold text-[#06836b] truncate">
                    {selectedDoctor.speciality}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {selectedDoctor.location}
                  </p>
                </div>
              </div>

              {/* Appointment Key Details */}
              <div className="space-y-2.5 text-xs text-slate-700 bg-[#fbfdfc] p-3.5 rounded-2xl border border-emerald-50">
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation:</span>
                  <span className="font-bold text-slate-800">
                    {consultationType === "Online"
                      ? "Online Video Call"
                      : "In-Person Visit"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Date:</span>
                  <span className="font-bold text-slate-800">
                    {calendarDates.find((d) => d.formattedIso === selectedDate)
                      ?.dayName || selectedDate}
                    , {selectedDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Time Slot:</span>
                  <span className="font-bold text-[#06836b]">
                    {selectedSlot}
                  </span>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. MEDICARE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 uppercase text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-semibold ${
                      promoMessage.isError ? "text-rose-500" : "text-emerald-600"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs sm:text-sm pt-3 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Consultation Fee</span>
                  <span>৳{fee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Service & Booking Fee</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promo Discount</span>
                    <span>-৳{appliedDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900 font-extrabold text-base sm:text-lg">
                  <span>Total Payable:</span>
                  <span className="text-[#06836b] text-xl sm:text-2xl">
                    ৳{totalAmount}
                  </span>
                </div>
              </div>

              {/* Terms Acceptance Note */}
              <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                By clicking confirm, you agree to Medicare&apos;s Terms of Service
                and Cancellation Policy. Free rescheduling up to 2 hours before.
              </p>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-linear-to-br from-[#047857] to-[#10B981] hover:from-[#059669] hover:to-[#047857] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Securing Appointment...</span>
                ) : (
                  <>
                    <FaCalendarCheck />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <FaLock className="text-[#06836b]" /> 256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaShieldAlt className="text-[#06836b]" /> Instant Booking
                </span>
              </div>
            </div>

            {/* Back link */}
            <div className="text-center">
              <Link
                href="/find-care/doctors"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                <FaArrowLeft className="text-[10px]" /> Back to All Doctors
              </Link>
            </div>
          </div>
        </form>
      </main>

      {/* DOCTOR PICKER MODAL */}
      {isDoctorPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <FaExchangeAlt className="text-[#06836b]" />
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Select a Doctor
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDoctorPickerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 sm:p-5 border-b border-slate-100 shrink-0 bg-[#fafcfb]">
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search doctor by name, speciality, or hospital..."
                  value={doctorSearchQuery}
                  onChange={(e) => setDoctorSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-white text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Doctors List */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-2">
              {filteredDoctorsForPicker.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 hover:bg-emerald-50/50 transition-colors cursor-pointer ${
                    selectedDoctor.id === doc.id
                      ? "bg-emerald-50 border border-emerald-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={doc.image || "/images/doctors/doctor-1.png"}
                        alt={doc.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-[#06836b] font-medium truncate">
                        {doc.speciality}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {doc.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#06836b] text-sm">
                      ৳{doc.consultationFee}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      / Session
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
