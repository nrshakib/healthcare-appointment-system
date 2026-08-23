import VideoHero from "@/components/Public/Services/VideoConsultation/VideoHero";
import VideoHowItWorks from "@/components/Public/Services/VideoConsultation/VideoHowItWorks";
import VideoFeatures from "@/components/Public/Services/VideoConsultation/VideoFeatures";

export const metadata = {
  title: "Online Video Consultation | HealthCare",
  description:
    "Consult top verified doctors online via secure video call from the comfort of your home. Fast, private, and convenient healthcare.",
};

export default function VideoConsultation() {
  return (
    <div>
      {/* hero section */}
      <VideoHero />
      {/* feature cards */}
      <VideoFeatures />
      {/* how it works */}
      <VideoHowItWorks />
    </div>
  );
}
