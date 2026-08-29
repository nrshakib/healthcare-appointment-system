import Image from "next/image";
import Link from "next/link";
import { FaCalendarCheck, FaLock, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

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
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xl space-y-5">
        <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl pb-3 border-b border-slate-100">
          Booking Summary
        </h3>

        {/* Doctor Quick Snapshot */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
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
            <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
              {doctor.name}
            </p>
            <p className="text-[11px] font-semibold text-[#06836b] truncate">
              {doctor.speciality}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {doctor.location}
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
              {selectedDateLabel}, {selectedDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Time Slot:</span>
            <span className="font-bold text-[#06836b]">{selectedSlot}</span>
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
              className="flex-1 uppercase text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b]"
            />
            <button
              type="button"
              onClick={onApplyPromo}
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
  );
}
