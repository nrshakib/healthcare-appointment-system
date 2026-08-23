import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Chip, Divider } from "@mui/material";
import { TbHome2Filled } from "react-icons/tb";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaTag,
  FaStar,
  FaUserMd,
} from "react-icons/fa";
import { LuChevronRight, LuClock, LuShieldCheck, LuSparkles } from "react-icons/lu";
import healthArticles from "@/utils/healthArticles";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";
import ArticleShareButtons from "@/components/Public/Resources/HealthArticles/ArticleShareButtons";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return healthArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = healthArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Medicare",
    };
  }

  return {
    title: `${article.title} | Medicare Health Articles`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = healthArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  // Find corresponding doctor from doctors.js for enriched profile info
  const doctor = doctors.find(
    (doc) =>
      slugify(doc.name) === article.author.slug ||
      doc.name === article.author.name
  );

  // Related articles
  const relatedArticles = healthArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50/60 pb-16 pt-6 sm:pt-8 sm:pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            separator={<LuChevronRight className="text-xs text-slate-400" />}
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              "& .MuiBreadcrumbs-separator": { mx: 0.75 },
            }}
          >
            <Link
              href="/"
              className="text-primary hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <TbHome2Filled className="text-base" />
            </Link>
            <span className="text-slate-500 font-normal">Resources</span>
            <Link
              href="/resources/health-articles"
              className="text-slate-600 hover:text-emerald-700 transition-colors font-medium"
            >
              Health Articles
            </Link>
            <span className="text-emerald-700 font-semibold max-w-[200px] sm:max-w-xs truncate">
              {article.category}
            </span>
          </Breadcrumbs>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/resources/health-articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <header className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs mb-8">
          {/* Category & Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Chip
              label={article.category}
              sx={{
                bgcolor: "#ecfdf5",
                color: "#047857",
                fontWeight: 700,
                fontSize: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #a7f3d0",
                height: "28px",
              }}
            />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <LuShieldCheck className="text-emerald-600 text-sm" />
              <span>Medically Reviewed</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Summary / Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
            {article.summary}
          </p>

          <Divider sx={{ my: 2.5 }} />

          {/* Author and Share Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            {/* Author Info with link to doctor details */}
            <div className="flex items-center gap-3">
              <Link
                href={`/find-care/doctors/${article.author.slug}`}
                className="relative size-12 rounded-full overflow-hidden border-2 border-emerald-500/20 bg-slate-100 shrink-0 hover:opacity-90 transition-opacity"
              >
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </Link>
              <div>
                <Link
                  href={`/find-care/doctors/${article.author.slug}`}
                  className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors inline-block"
                >
                  {article.author.name}
                </Link>
                <p className="text-xs text-slate-500">{article.author.role}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[10px]" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <LuClock className="text-[10px]" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <ArticleShareButtons title={article.title} />
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] max-h-[480px] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm mb-10 bg-slate-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>

        {/* Main Article Body */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-xs mb-10">
          {/* Lead Introduction */}
          <div className="mb-8 rounded-2xl bg-emerald-50/60 p-5 sm:p-6 border border-emerald-100">
            <p className="text-base sm:text-lg font-medium text-emerald-950 leading-relaxed">
              {article.content.introduction}
            </p>
          </div>

          {/* Structured Sections */}
          <div className="space-y-8">
            {article.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>

                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Bullet Points */}
                {section.points && section.points.length > 0 && (
                  <ul className="mt-3 space-y-2.5 rounded-xl bg-slate-50 p-4 sm:p-5 border border-slate-100">
                    {section.points.map((point, ptIdx) => (
                      <li
                        key={ptIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800"
                      >
                        <FaCheckCircle className="text-emerald-600 text-sm mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways Box */}
          {article.content.keyTakeaways &&
            article.content.keyTakeaways.length > 0 && (
              <div className="my-10 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                    <LuSparkles className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Key Clinical Takeaways
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {article.content.keyTakeaways.map((takeaway, tIdx) => (
                    <div
                      key={tIdx}
                      className="rounded-xl bg-white p-4 border border-emerald-100 shadow-2xs flex flex-col"
                    >
                      <span className="text-xs font-extrabold text-emerald-600 mb-1">
                        0{tIdx + 1}.
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Expert Quote Box */}
          {article.content.expertQuote && (
            <blockquote className="relative my-8 rounded-2xl border-l-4 border-emerald-600 bg-slate-50/80 p-6 sm:p-8 shadow-2xs">
              <FaQuoteLeft className="text-2xl text-emerald-600/30 mb-2" />
              <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed mb-3">
                &ldquo;{article.content.expertQuote.quote}&rdquo;
              </p>
              <footer className="text-xs sm:text-sm font-semibold text-emerald-800">
                — {article.content.expertQuote.author}
              </footer>
            </blockquote>
          )}

          {/* Conclusion */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              The Final Word
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {article.content.conclusion}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
              <FaTag className="text-slate-400 text-xs" />
              Tags:
            </span>
            {article.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Doctor Bio Card & Consultation CTA */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Link
              href={`/find-care/doctors/${article.author.slug}`}
              className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-slate-100 shrink-0 hover:opacity-90 transition-opacity"
            >
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                Author &amp; Specialist
              </div>
              <Link
                href={`/find-care/doctors/${article.author.slug}`}
                className="block text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors"
              >
                {article.author.name}
              </Link>
              <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-1">
                {article.author.role}
              </p>

              {doctor && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 mb-3">
                  <span className="font-medium text-slate-700">{doctor.degree}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <FaStar className="text-[11px]" />
                    {doctor.rating} ({doctor.reviewCount} reviews)
                  </span>
                  <span>•</span>
                  <span>{doctor.experience} Yrs Experience</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {doctor?.about ||
                  `${article.author.name} is a specialist in ${article.author.role} at Medicare Health, providing evidence-based patient consultations.`}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href={`/find-care/doctors/${article.author.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 hover:gap-2.5 active:scale-95"
                >
                  <FaUserMd className="text-xs" />
                  <span>View Doctor Profile</span>
                </Link>
                <Link
                  href={`/find-care/doctors/${article.author.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-95"
                >
                  <span>Book Appointment</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Related Health Articles
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Continue reading expert clinical tips and wellness guides
                </p>
              </div>
              <Link
                href="/resources/health-articles"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:underline"
              >
                <span>View All</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/resources/health-articles/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:shadow-lg hover:border-emerald-200"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Chip
                        label={rel.category}
                        size="small"
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#047857",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                          borderRadius: "4px",
                          height: "20px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-1.5">
                      <span>{rel.date}</span>
                      <span>•</span>
                      <span>{rel.readTime}</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug transition-colors group-hover:text-emerald-600 line-clamp-2 mb-3">
                      {rel.title}
                    </h3>

                    <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-2">
                      <div className="relative size-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src={rel.author.avatar}
                          alt={rel.author.name}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 truncate">
                        {rel.author.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
