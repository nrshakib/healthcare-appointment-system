import { Metadata } from "next";
import HealthArticlesContent from "./HealthArticlesContent";

export const metadata: Metadata = {
  title: "Health Articles & Wellness Guides | Medicare",
  description:
    "Explore medically-reviewed health articles, wellness tips, diet advice, and clinical guides written by Medicare's certified specialists.",
};

export default function HealthArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HealthArticlesContent />
      </div>
    </div>
  );
}
