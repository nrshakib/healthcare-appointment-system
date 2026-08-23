import AppointmentHero from "@/components/Public/Services/Appointment/AppointmentHero";
import AppointmentFeatures from "@/components/Public/Services/Appointment/AppointmentFeatures";
import AppointmentHowItWorks from "@/components/Public/Services/Appointment/AppointmentHowItWorks";

export const metadata = {
  title: "Book Doctor Appointment | HealthCare",
  description:
    "Book, manage, and reschedule appointments with top doctors in just a few clicks. Quality healthcare made simple and accessible.",
};

export default function Appointment() {
  return (
    <div>
      {/* hero section */}
      <AppointmentHero />
      {/* feature cards */}
      <AppointmentFeatures />
      {/* how it works */}
      <AppointmentHowItWorks />
    </div>
  );
}
