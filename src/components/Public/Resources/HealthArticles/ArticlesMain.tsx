"use client";

import Image from "next/image";
import Link from "next/link";
import { Chip } from "@mui/material";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { LuClock, LuSearchX } from "react-icons/lu";
import ArticlesHero from "./ArticlesHero";
import FeaturedArticle from "./FeaturedArticle";
import LatestArticles from "./LatestArticles";
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

interface ArticlesMainProps {
  selectedCategory?: string;
  onClearFilters?: () => void;
  filteredArticles?: ArticleItem[];
}

export default function ArticlesMain({
  selectedCategory = "",
  onClearFilters,
  filteredArticles,
}: ArticlesMainProps) {
  const displayArticles =
    filteredArticles ||
    healthArticles.filter((article) => {
      if (!selectedCategory) return true;
      return article.category.toLowerCase() === selectedCategory.toLowerCase();
    });

  const isFiltering = Boolean(selectedCategory);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <ArticlesHero />

      {/* Main Content Area */}
      {isFiltering ? (
        <div className="space-y-6">
          {/* Active Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Category Filter:
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                {selectedCategory}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({displayArticles.length}{" "}
                {displayArticles.length === 1 ? "article" : "articles"} found)
              </span>
            </div>

            {onClearFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer self-start sm:self-auto"
              >
                <FaTimes className="text-[10px]" />
                <span>Show All Articles</span>
              </button>
            )}
          </div>

          {/* Filtered Grid or Empty State */}
          {displayArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {displayArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/resources/health-articles/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:shadow-lg hover:border-emerald-200"
                >
                  {/* Article Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#047857",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                          borderRadius: "4px",
                          height: "22px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-slate-400 text-[10px]" />
                        {article.date}
                      </span>
                      <span className="size-1 rounded-full bg-slate-300" />
                      <span className="flex items-center gap-1">
                        <LuClock className="text-slate-400 text-[10px]" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-emerald-600 line-clamp-2 mb-2">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {article.summary}
                    </p>

                    {/* Author */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2.5">
                      <div className="relative size-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate">
                        {article.author.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                <LuSearchX className="text-2xl" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                No articles in this category
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                No articles are currently listed under &quot;{selectedCategory}
                &quot;. Please check back soon or browse other categories.
              </p>
              {onClearFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  View All Articles
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Featured Article Section */}
          <FeaturedArticle article={healthArticles[0]} />

          {/* Latest Articles Slider Section */}
          <LatestArticles
            articles={healthArticles.slice(1)}
            title="More Health Articles"
            subtitle="Explore comprehensive clinical perspectives and healthy lifestyle tips"
          />
        </div>
      )}
    </div>
  );
}
