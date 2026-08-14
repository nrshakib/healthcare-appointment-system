import HeroSection from "@/components/Public/LandingPage/HeroSection";
import Specialities from "@/components/Public/LandingPage/Specialities";
import TrustedDoctors from "@/components/Public/LandingPage/TrustedDoctors";
import HowItWorks from "@/components/Public/LandingPage/HowItWorks";
import Testimonials from "@/components/Public/LandingPage/Testimonials";
import HealthArticles from "@/components/Public/LandingPage/HealthArticles";
import GetStarted from "@/components/Public/LandingPage/GetStarted";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Specialities />
      <TrustedDoctors />
      <HowItWorks />
      <Testimonials />
      <HealthArticles />
      <GetStarted />
    </>
  );
}
