import AppointmentHero from "@/components/Public/Services/Appointment/AppointmentHero";
import AppointmentFeatures from "@/components/Public/Services/Appointment/AppointmentFeatures";
import AppointmentHowItWorks from "@/components/Public/Services/Appointment/AppointmentHowItWorks";

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
