"use client";

import Image from "next/image";
import Link from "next/link";
import { Chip } from "@mui/material";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { LuClock, LuFlame } from "react-icons/lu";
import healthArticles from "@/utils/healthArticles";

interface ArticleItem {
  id: number;
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    slug: string;
  };
  tags: string[];
}

interface FeaturedArticleProps {
  article?: ArticleItem;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  // Use the latest article if not specified
  const featured = article || healthArticles[0];

  if (!featured) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold tracking-wide uppercase">
          <LuFlame className="text-amber-500 text-sm" />
          <span>Featured Article</span>
        </div>
      </div>

      <div className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-200">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Image container */}
          <div className="relative md:col-span-6 h-64 sm:h-72 md:h-full min-h-[260px] w-full overflow-hidden bg-slate-100">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 z-10">
              <Chip
                label={featured.category}
                size="small"
                sx={{
                  bgcolor: "#ffffff",
                  color: "#047857",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  borderRadius: "6px",
                  height: "26px",
                }}
              />
            </div>
          </div>

          {/* Details Content */}
          <div className="md:col-span-6 p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-full">
            <div>
              {/* Meta row: Date and Read Time */}
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-slate-400 text-xs" />
                  {featured.date}
                </span>
                <span className="size-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">
                  <LuClock className="text-slate-400 text-xs" />
                  {featured.readTime}
                </span>
              </div>

              {/* Title */}
              <Link
                href={`/resources/health-articles/${featured.slug}`}
                className="block"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-emerald-600 line-clamp-2">
                  {featured.title}
                </h2>
              </Link>

              {/* Summary Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featured.summary}
              </p>
            </div>

            {/* Author info & Read more action */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/find-care/doctors/${featured.author.slug}`}
                className="group/author flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <div className="relative size-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                  <Image
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover/author:text-emerald-700 transition-colors truncate">
                    {featured.author.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {featured.author.role}
                  </p>
                </div>
              </Link>

              <Link
                href={`/resources/health-articles/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:gap-2.5 active:scale-95"
              >
                <span>Read Article</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
