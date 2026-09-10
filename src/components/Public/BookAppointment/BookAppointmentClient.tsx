/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import { TbHome2Filled } from "react-icons/tb";

import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";

import DoctorSummaryCard from "./DoctorSummaryCard";
import ConsultationModeSelector from "./ConsultationModeSelector";
import DateTimeSlotPicker, { CalendarDateItem } from "./DateTimeSlotPicker";
import PatientInfoForm from "./PatientInfoForm";
import PaymentMethodSection from "./PaymentMethodSection";
import BookingSummary from "./BookingSummary";
import DoctorPickerModal from "./DoctorPickerModal";
import AppointmentSuccessReceipt from "./AppointmentSuccessReceipt";

export default function BookAppointmentClient() {
  const searchParams = useSearchParams();

  // Extract query parameters
  const doctorParam =
    searchParams.get("doctor") ||
    searchParams.get("slug") ||
    searchParams.get("id") ||
    "";

  // Initial doctor resolution based on URL params
  const initialDoctor = useMemo(() => {
    if (!doctorParam) return doctors[0];

    const cleanParam = doctorParam.trim().toLowerCase();

    // 1. Match by slug
    const bySlug = doctors.find(
      (d) => slugify(d.name).toLowerCase() === cleanParam,
    );
    if (bySlug) return bySlug;

    // 2. Match by exact or partial name
    const byName = doctors.find(
      (d) =>
        d.name.toLowerCase() === cleanParam ||
        d.name.toLowerCase().includes(cleanParam),
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
  const [consultationType, setConsultationType] = useState<
    "Online" | "In-Person"
  >(() => {
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
  const calendarDates = useMemo<CalendarDateItem[]>(() => {
    const dates: CalendarDateItem[] = [];
    const today = new Date();
    let dayOffset = 0;

    // Scan ahead until we collect up to 14 available dates
    while (dates.length < 14 && dayOffset < 60) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const isAvailableDay =
        !Array.isArray(selectedDoctor.availableDays) ||
        selectedDoctor.availableDays.length === 0 ||
        selectedDoctor.availableDays.includes(dayName);

      if (isAvailableDay) {
        const shortDay = date.toLocaleDateString("en-US", { weekday: "short" });
        const dayNumber = date.getDate();
        const monthShort = date.toLocaleDateString("en-US", { month: "short" });
        const formattedIso = date.toISOString().split("T")[0];

        dates.push({
          fullDate: date,
          dayName,
          shortDay,
          dayNumber,
          monthShort,
          formattedIso,
          isToday: dayOffset === 0,
          isAvailableDay: true,
        });
      }
      dayOffset++;
    }
    return dates;
  }, [selectedDoctor]);

  // Selected date state
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const curDayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (
        !Array.isArray(initialDoctor.availableDays) ||
        initialDoctor.availableDays.length === 0 ||
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
  const handleSelectDoctor = (doc: (typeof doctors)[0]) => {
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
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (
        !Array.isArray(doc.availableDays) ||
        doc.availableDays.length === 0 ||
        doc.availableDays.includes(dName)
      ) {
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
        d.location?.toLowerCase().includes(q),
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
  const platformFee = 0;
  const totalAmount = Math.max(0, fee + platformFee - appliedDiscount);

  // Form submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `MED-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000,
    )}`;

    const selectedDateObj = calendarDates.find(
      (d) => d.formattedIso === selectedDate,
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
      <AppointmentSuccessReceipt
        data={bookingSuccessData}
        onBookAnother={() => {
          setBookingSuccessData(null);
          setFullName("");
          setSymptoms("");
          setUploadedFiles([]);
        }}
      />
    );
  }

  const selectedDateObj = calendarDates.find(
    (d) => d.formattedIso === selectedDate,
  );
  const selectedDateLabel = selectedDateObj?.dayName || selectedDate;

  return (
    <div className="doctors-bottom-section min-h-screen pb-16">
      {/* Breadcrumb Header */}
      <div className="doctorsHeroBg py-3">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[85%] xl:px-0">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "11px", sm: "14px" },
              py: { xs: 2, sm: 3 },
              color: "var(--doctors-breadcrumb-text)",
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
                color: "var(--text-subtle)",
                opacity: 0.8,
              },
              "& .MuiBreadcrumbs-ol": {
                alignItems: "center",
              },
              "& p, & span, & a": {
                fontSize: "inherit",
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
              className="doctors-breadcrumb-item transition-colors font-semibold"
            >
              Find Care
            </Link>
            <Link
              href={`/find-care/doctors/${slugify(selectedDoctor.name)}`}
              className="doctors-breadcrumb-active font-semibold"
            >
              {selectedDoctor.name}
            </Link>
            <p className="doctors-breadcrumb-item font-semibold">
              Book Appointment
            </p>
          </Breadcrumbs>
        </div>
      </div>

      {/* Page Title & Intro */}
      <div className="mx-auto max-w-[95%] xl:max-w-[85%] pt-6 sm:pt-8 px-4 xl:px-0">
        <div>
          <h1 className="doctors-heading-text text-xl sm:text-3xl font-bold">
            Book Doctor Appointment
          </h1>
          <p className="doctors-info-text text-[13px] sm:text-sm mt-1">
            Select your preferred date, time slot, and consultation mode to
            confirm instant booking.
          </p>
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
            <DoctorSummaryCard
              doctor={selectedDoctor}
              onChangeDoctorClick={() => setIsDoctorPickerOpen(true)}
            />

            {/* 2. Step 1: Consultation Type */}
            <ConsultationModeSelector
              consultationType={consultationType}
              onConsultationTypeChange={setConsultationType}
              doctorLocation={selectedDoctor.location}
            />

            {/* 3. Step 2: Date & Time Selection */}
            <DateTimeSlotPicker
              calendarDates={calendarDates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              timeSlots={timeSlots}
              selectedSlot={selectedSlot}
              onSlotSelect={setSelectedSlot}
            />

            {/* 4. Step 3: Patient Information Form */}
            <PatientInfoForm
              bookingFor={bookingFor}
              setBookingFor={setBookingFor}
              fullName={fullName}
              setFullName={setFullName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              bloodGroup={bloodGroup}
              setBloodGroup={setBloodGroup}
              isFirstVisit={isFirstVisit}
              setIsFirstVisit={setIsFirstVisit}
              symptoms={symptoms}
              setSymptoms={setSymptoms}
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
            />

            {/* 5. Step 4: Payment Methods */}
            <PaymentMethodSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              consultationType={consultationType}
              reminderSms={reminderSms}
              onReminderSmsChange={setReminderSms}
              reminderWhatsapp={reminderWhatsapp}
              onReminderWhatsappChange={setReminderWhatsapp}
            />
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary */}
          <BookingSummary
            doctor={selectedDoctor}
            consultationType={consultationType}
            selectedDate={selectedDate}
            selectedDateLabel={selectedDateLabel}
            selectedSlot={selectedSlot}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onApplyPromo={handleApplyPromo}
            promoMessage={promoMessage}
            appliedDiscount={appliedDiscount}
            totalAmount={totalAmount}
            isSubmitting={isSubmitting}
          />
        </form>
      </main>

      {/* DOCTOR PICKER MODAL */}
      <DoctorPickerModal
        isOpen={isDoctorPickerOpen}
        onClose={() => setIsDoctorPickerOpen(false)}
        doctors={filteredDoctorsForPicker}
        selectedDoctorId={selectedDoctor.id}
        onSelectDoctor={handleSelectDoctor}
        searchQuery={doctorSearchQuery}
        onSearchQueryChange={setDoctorSearchQuery}
      />
    </div>
  );
}
