import Accessibles from "@/components/Public/Services/MedicalRecords/Accessibles";
import RecordsFeatures from "@/components/Public/Services/MedicalRecords/RecordsFeatures";
import RecordsHero from "@/components/Public/Services/MedicalRecords/RecordsHero";
import SecurityGuaranteed from "@/components/Public/Services/MedicalRecords/SecurityGuaranteed";
import SignUpCTA from "@/components/Public/Services/MedicalRecords/SignUpCTA";

export default function MedicalReports() {
  return (
    <div>
      <RecordsHero />
      <RecordsFeatures />
      <SecurityGuaranteed />
      <Accessibles />
      <SignUpCTA />
    </div>
  );
}
