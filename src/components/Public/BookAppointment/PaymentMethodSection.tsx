import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

interface PaymentMethodSectionProps {
  paymentMethod: "bkash" | "nagad" | "card" | "cash";
  onPaymentMethodChange: (method: "bkash" | "nagad" | "card" | "cash") => void;
  consultationType: "Online" | "In-Person";
  reminderSms: boolean;
  onReminderSmsChange: (val: boolean) => void;
  reminderWhatsapp: boolean;
  onReminderWhatsappChange: (val: boolean) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  onPaymentMethodChange,
  consultationType,
  reminderSms,
  onReminderSmsChange,
  reminderWhatsapp,
  onReminderWhatsappChange,
}: PaymentMethodSectionProps) {
  return (
    <section className="doctors-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-4">
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
          onClick={() => onPaymentMethodChange("bkash")}
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
          onClick={() => onPaymentMethodChange("card")}
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
            onClick={() => onPaymentMethodChange("cash")}
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
            onChange={(e) => onReminderSmsChange(e.target.checked)}
            className="accent-[#06836b] size-4 rounded"
          />
          <span>Send SMS appointment reminder & meeting links</span>
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={reminderWhatsapp}
            onChange={(e) => onReminderWhatsappChange(e.target.checked)}
            className="accent-[#06836b] size-4 rounded"
          />
          <span className="flex items-center gap-1">
            <BsWhatsapp className="text-emerald-600" />
            Receive appointment updates on WhatsApp
          </span>
        </label>
      </div>
    </section>
  );
}
