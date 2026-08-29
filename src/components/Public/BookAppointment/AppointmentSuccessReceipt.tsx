import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaPrint, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";

interface BookingSuccessData {
  bookingId: string;
  doctor: {
    name: string;
    image: string;
    speciality: string;
    degree?: string;
    location?: string;
  };
  consultationType: "Online" | "In-Person";
  date: string;
  timeSlot: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  totalAmount: number;
}

interface AppointmentSuccessReceiptProps {
  data: BookingSuccessData;
  onBookAnother: () => void;
}

export default function AppointmentSuccessReceipt({
  data,
  onBookAnother,
}: AppointmentSuccessReceiptProps) {
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
                {data.email}
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
              {data.bookingId}
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
                  src={data.doctor.image || "/images/doctors/doctor-1.png"}
                  alt={data.doctor.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    {data.doctor.name}
                  </h3>
                  <FaCheckCircle className="text-[#06836b] text-sm shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-[#06836b] font-semibold">
                  {data.doctor.speciality}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {data.doctor.degree} • {data.doctor.location}
                </p>
              </div>
            </div>

            {/* Booking Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block">Date & Time:</span>
                <span className="font-bold text-slate-800">{data.date}</span>
                <span className="block font-semibold text-[#06836b] mt-0.5">
                  {data.timeSlot}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">Consultation Type:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  {data.consultationType === "Online" ? (
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
                  {data.patientName}
                </span>
                <span className="block text-slate-500 text-xs mt-0.5">
                  Phone: {data.phoneNumber}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">Payment Summary:</span>
                <span className="font-bold text-[#06836b] text-base">
                  ৳{data.totalAmount}
                </span>
                <span className="block text-slate-500 text-xs mt-0.5 uppercase font-medium">
                  Method: {data.paymentMethod} (Confirmed)
                </span>
              </div>
            </div>

            {/* Video or In-person guidance */}
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
              <FaShieldAlt className="text-[#06836b] text-sm shrink-0 mt-0.5" />
              <div>
                {data.consultationType === "Online" ? (
                  <p>
                    <strong>Video Link Details:</strong> Your HD Video Room link
                    has been generated and sent to your email and SMS. Please join
                    5 minutes prior to the scheduled time.
                  </p>
                ) : (
                  <p>
                    <strong>Hospital Visit Note:</strong> Please present your
                    Booking Reference ID (<strong>{data.bookingId}</strong>)
                    at the reception desk upon your arrival at {data.doctor.location}.
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
                `Doctor Appointment with ${data.doctor.name}`
              )}&details=${encodeURIComponent(
                `Medicare Appointment: ${data.consultationType} consultation.\nReference ID: ${data.bookingId}\nDoctor: ${data.doctor.name} (${data.doctor.speciality})`
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
              onClick={onBookAnother}
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
