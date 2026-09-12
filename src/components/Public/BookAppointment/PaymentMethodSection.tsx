import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { Button, Checkbox, Divider, FormControlLabel } from "@mui/material";
import { FaCheck } from "react-icons/fa6";

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
          <span className="consultation-step-badge size-7 rounded-full text-xs font-bold flex items-center justify-center">
            4
          </span>
          <h3 className="doctors-heading-text text-base sm:text-lg font-bold">
            Payment Method
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* bKash / Nagad */}
        <Button
          type="button"
          onClick={() => onPaymentMethodChange("bkash")}
          disableRipple
          className={`consultation-mode-btn ${paymentMethod === "bkash" ? "active" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                ৳
              </div>
              <div>
                <p className="doctors-heading-text font-bold text-xs sm:text-sm">
                  bKash / Nagad / Rocket
                </p>
                <p className="doctors-card-muted text-[11px]">
                  Instant Mobile Banking
                </p>
              </div>
            </div>
            {paymentMethod === "bkash" && (
              <span className="consultation-check-badge size-5 rounded-full flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
        </Button>

        {/* Credit / Debit Card */}
        <button
          type="button"
          onClick={() => onPaymentMethodChange("card")}
          className={`consultation-mode-btn ${paymentMethod === "card" ? "active" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-sky-100 text-blue-600 flex items-center justify-center text-base">
                <FaCreditCard />
              </div>
              <div>
                <p className="doctors-heading-text font-bold text-xs sm:text-sm">
                  Credit / Debit Card
                </p>
                <p className="text-[11px] doctors-card-muted">
                  Visa, Mastercard, AMEX
                </p>
              </div>
            </div>
            {paymentMethod === "card" && (
              <span className="consultation-check-badge size-5 rounded-full flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
        </button>

        {/* Pay at Clinic (If in-person) */}
        {consultationType === "In-Person" && (
          <button
            type="button"
            onClick={() => onPaymentMethodChange("cash")}
            className={`consultation-mode-btn ${paymentMethod === "cash" ? "active" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-emerald-100 text-[#06836b] flex items-center justify-center text-base">
                  <FaMoneyBillWave />
                </div>
                <div>
                  <p className="doctors-heading-text font-bold text-xs sm:text-sm">
                    Pay Cash at Hospital
                  </p>
                  <p className="text-[11px] doctors-card-muted">
                    Pay during appointment check-in
                  </p>
                </div>
              </div>
              {paymentMethod === "cash" && (
                <span className="consultation-check-badge size-5 rounded-full flex items-center justify-center text-xs">
                  <FaCheck />
                </span>
              )}
            </div>
          </button>
        )}
      </div>

      <Divider
        sx={{
          my: 2,
          borderColor: "var(--accent-deep)",
        }}
      />

      {/* Notification Preferences */}
      <div className="flex items-left flex-col space-y-1 w-fit">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={reminderSms}
              onChange={(e) => onReminderSmsChange(e.target.checked)}
              sx={{
                color: "var(--border-default)",
                "&.Mui-checked": { color: "var(--accent)" },
                padding: "6px 8px",
              }}
            />
          }
          label={
            <span className="notification-pref-label  text-[11px] sm:text-xs">
              Send SMS appointment reminder &amp; meeting links
            </span>
          }
          sx={{
            margin: 0,
            alignItems: {
              xxs: "start",
              sm: "center",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={reminderWhatsapp}
              onChange={(e) => onReminderWhatsappChange(e.target.checked)}
              sx={{
                color: "var(--border-default)",
                "&.Mui-checked": { color: "var(--accent)" },
                padding: "6px 8px",
              }}
            />
          }
          label={
            <span className="notification-pref-label text-[11px] sm:text-xs flex items-start gap-1.5 w-fit">
              <BsWhatsapp className="text-(--accent) text-sm" />
              Receive appointment updates on WhatsApp
            </span>
          }
          sx={{
            margin: 0,
            alignItems: {
              xxs: "start",
              sm: "center",
            },
          }}
        />
      </div>
    </section>
  );
}
