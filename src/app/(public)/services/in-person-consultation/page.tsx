import InPersonCTA from "@/components/Public/Services/InPersonConsultation/InPersonCTA";
import InPersonFeatures from "@/components/Public/Services/InPersonConsultation/InPersonFeatures";
import InPersonHero from "@/components/Public/Services/InPersonConsultation/InPersonHero";
import InPersonSpecialities from "@/components/Public/Services/InPersonConsultation/InPersonSpecialities";

export const metadata = {
  title: "In-Person Consultation | HealthCare",
  description:
    "Visit experienced doctors face-to-face at clinics near you. Book your in-person consultation today.",
};

export default function InPersonConsultation() {
  return (
    <div>
      {/* Hero + feature highlights */}
      <InPersonHero />
      <InPersonFeatures />

      {/* Browse available specialities */}
      <InPersonSpecialities />

      {/* Bottom CTA */}
      <InPersonCTA />
    </div>
  );
}
