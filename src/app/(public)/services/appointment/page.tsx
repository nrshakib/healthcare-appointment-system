import AppointmentHero from "@/components/Public/Appointment/AppointmentHero";
import AppointmentFeatures from "@/components/Public/Appointment/AppointmentFeatures";
import AppointmentHowItWorks from "@/components/Public/Appointment/AppointmentHowItWorks";

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
