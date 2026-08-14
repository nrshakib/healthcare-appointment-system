import HeroSection from "@/components/LandingPage/HeroSection";
import Specialities from "@/components/LandingPage/Specialities";
import TrustedDoctors from "@/components/LandingPage/TrustedDoctors";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Testimonials from "@/components/LandingPage/Testimonials";
import HealthArticles from "@/components/LandingPage/HealthArticles";
import GetStarted from "@/components/LandingPage/GetStarted";

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
