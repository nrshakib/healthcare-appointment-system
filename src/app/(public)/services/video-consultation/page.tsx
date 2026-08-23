import VideoHero from "@/components/Public/Services/VideoConsultation/VideoHero";
import VideoHowItWorks from "@/components/Public/Services/VideoConsultation/VideoHowItWorks";
import VideoFeatures from "@/components/Public/Services/VideoConsultation/VideotFeatures";

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
