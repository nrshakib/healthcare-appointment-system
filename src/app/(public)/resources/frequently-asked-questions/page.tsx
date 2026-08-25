import { Metadata } from "next";
import FaqPageClient from "@/components/Public/Resources/FAQs/FaqPageClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Medicare",
  description:
    "Find answers to frequently asked questions about booking doctor appointments, telemedicine video visits, insurance coverage, billing, e-prescriptions, and account security at Medicare.",
};

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 lg:py-12">
      <div className="mx-auto w-full xl:max-w-[90%] px-4 sm:px-6 lg:px-8">
        <FaqPageClient />
      </div>
    </div>
  );
}
