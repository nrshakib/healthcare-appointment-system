import VideoHero from "@/components/Public/VideoConsultation/VideoHero";
import VideoHowItWorks from "@/components/Public/VideoConsultation/VideoHowItWorks";
import VideoFeatures from "@/components/Public/VideoConsultation/VideotFeatures";

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
