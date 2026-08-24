import { Metadata } from "next";
import HealthArticlesContent from "../../../../components/Public/Resources/HealthArticles/HealthArticlesContent";

export const metadata: Metadata = {
  title: "Health Articles & Wellness Guides | Medicare",
  description:
    "Explore medically-reviewed health articles, wellness tips, diet advice, and clinical guides written by Medicare's certified specialists.",
};

export default function HealthArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-5 sm:py-10 lg:py-12">
      <div className="mx-auto w-full xl:max-w-[90%]">
        <HealthArticlesContent />
      </div>
    </div>
  );
}
