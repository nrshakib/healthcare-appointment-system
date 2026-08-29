import { Suspense } from "react";
import { Metadata } from "next";
import { CircularProgress } from "@mui/material";
import BookAppointmentClient from "@/components/Public/BookAppointment/BookAppointmentClient";

export const metadata: Metadata = {
  title: "Book Doctor Appointment | Medicare Healthcare System",
  description:
    "Schedule an instant in-person or video consultation appointment with verified specialist doctors.",
};

export default function BookAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fafcfb]">
          <CircularProgress sx={{ color: "#06836b" }} size={44} />
        </div>
      }
    >
      <BookAppointmentClient />
    </Suspense>
  );
}
