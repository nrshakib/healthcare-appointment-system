import { Button, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarCheck,
  FaLock,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";

interface BookingSummarySidebarProps {
  doctor: {
    name: string;
    image: string;
    speciality: string;
    location?: string;
    consultationFee: number;
  };
  consultationType: "Online" | "In-Person";
  selectedDate: string;
  selectedDateLabel: string;
  selectedSlot: string;
  promoCode: string;
  onPromoCodeChange: (val: string) => void;
  onApplyPromo: (e: React.FormEvent) => void;
  promoMessage: { text: string; isError: boolean } | null;
  appliedDiscount: number;
  totalAmount: number;
  isSubmitting: boolean;
}

export default function BookingSummary({
  doctor,
  consultationType,
  selectedDateLabel,
  selectedDate,
  selectedSlot,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  promoMessage,
  appliedDiscount,
  totalAmount,
  isSubmitting,
}: BookingSummarySidebarProps) {
  const fee = doctor.consultationFee;

  return (
    <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-4">
      <div className="doctors-card rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xl space-y-5">
        <div>
          <h3 className="doctors-heading-text font-bold text-lg sm:text-xl">
            Booking Summary
          </h3>

          <Divider
            sx={{
              my: 2,
              borderColor: "var(--accent-deep)",
            }}
          />
        </div>

        {/* Doctor Quick Snapshot */}
        <div className="doctors-bottom-section flex items-center gap-3 p-3 rounded-2xl border border-(--border-default)">
          <div className="size-12 rounded-xl overflow-hidden bg-white shrink-0">
            <Image
              src={doctor.image || "/images/doctors/doctor-1.png"}
              alt={doctor.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="doctors-heading-text font-bold text-xs sm:text-sm truncate">
              {doctor.name}
            </p>
            <p className="doctors-speciality-text text-[11px] font-semibold truncate">
              {doctor.speciality}
            </p>
            <p className="doctors-info-text text-[10px] truncate">
              {doctor.location}
            </p>
          </div>
        </div>

        {/* Appointment Key Details */}
        <div className="doctors-bottom-section space-y-2.5 text-xs p-3.5 rounded-2xl border border-(--border-default)">
          <div className="flex justify-between">
            <span className="doctors-search-label">Consultation:</span>
            <span className="font-bold doctors-heading-text">
              {consultationType === "Online"
                ? "Online Video Call"
                : "In-Person Visit"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="doctors-search-label">Selected Date:</span>
            <span className="font-bold doctors-heading-text">
              {selectedDateLabel}, {selectedDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="doctors-search-label">Time Slot:</span>
            <span className="font-bold doctors-speciality-text">
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
              onChange={(e) => onPromoCodeChange(e.target.value)}
              className="doctors-search-box doctors-heading-text w-full pl-3 pr-4 py-2.5 rounded-xl text-xs sm:text-sm"
            />
            <Button
              variant="contained"
              onClick={onApplyPromo}
              className="promoCodeButton"
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "12px",
                minWidth: 0,
              }}
            >
              Apply
            </Button>
          </div>
          {promoMessage && (
            <p
              className={`text-[11px] font-semibold ${
                promoMessage.isError ? "text-rose-400" : "text-emerald-600"
              }`}
            >
              {promoMessage.text}
            </p>
          )}
        </div>

        <Divider
          sx={{
            my: 2,
            borderColor: "var(--accent-deep)",
          }}
        />

        {/* Price Calculation */}
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between doctors-search-label">
            <span>Consultation Fee</span>
            <span className="doctors-info-text">৳{fee}</span>
          </div>

          <div className="flex justify-between doctors-search-label">
            <span>Service & Booking Fee</span>
            <span className="doctors-speciality-text font-semibold">FREE</span>
          </div>

          <Divider
            sx={{
              my: 2,
              borderColor: "var(--accent-deep)",
            }}
          />

          {appliedDiscount > 0 && (
            <div className="doctors-speciality-text flex justify-between font-semibold">
              <span>Promo Discount</span>
              <span>-৳{appliedDiscount}</span>
            </div>
          )}

          <div className="doctors-info-text flex justify-between items-baseline font-bold text-base sm:text-lg">
            <span>Total Payable:</span>
            <span className="doctors-speciality-text text-xl sm:text-2xl">
              ৳{totalAmount}
            </span>
          </div>
        </div>

        {/* Terms Acceptance Note */}
        <p className="doctors-search-label text-[11px] leading-relaxed text-center">
          By clicking confirm, you agree to Medicare&apos;s Terms of Service and
          Cancellation Policy. Free rescheduling up to 2 hours before.
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
          <p className="flex items-center gap-1">
            <FaLock className="text-primary" />
            <span className="doctors-info-text"> 256-Bit SSL</span>
          </p>
          <span>•</span>
          <p className="flex items-center gap-1">
            <FaShieldAlt className="text-primary" />
            <span className="doctors-info-text">Instant Booking</span>
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="text-center">
        <Link
          href="/find-care/doctors"
          className="doctors-info-text inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
        >
          <FaArrowLeft className="text-[10px]" /> Back to All Doctors
        </Link>
      </div>
    </div>
  );
}
