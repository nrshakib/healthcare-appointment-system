"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Chip } from "@mui/material";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import healthArticles from "@/utils/healthArticles";

interface ArticleItem {
  id: number;
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  summary?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface LatestArticlesProps {
  articles?: ArticleItem[];
  title?: string;
  subtitle?: string;
}

export default function LatestArticles({
  articles = healthArticles,
  title = "Latest Health Articles",
  subtitle = "Stay updated with our newest clinical insights, healthy habits, and wellness guides",
}: LatestArticlesProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: articles.length > 2,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-6">
        <ul className="article-dots flex items-center justify-center gap-1.5">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <button aria-label="Go to slide" className="article-dot" />
    ),
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">No articles found</p>
        <p className="mt-1 text-xs text-slate-500">
          Try clearing your filters or searching with different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Header section */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        {articles.length > 2 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous article"
              onClick={() => sliderRef.current?.slickPrev()}
              className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-pointer"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next article"
              onClick={() => sliderRef.current?.slickNext()}
              className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-pointer"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings} className="latest-articles-slider">
          {articles.map((article) => (
            <div key={article.id} className="h-full px-2 py-1">
              <Link
                href={`/resources/health-articles/${article.slug}`}
                className="group flex flex-col h-full overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:shadow-lg hover:border-emerald-200"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                {/* Content */}
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
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-emerald-600 line-clamp-2 mb-3">
                    {article.title}
                  </h3>

                  {/* Author footer */}
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
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .latest-articles-slider .slick-list {
          overflow: hidden;
          margin: 0 -8px;
        }
        .latest-articles-slider .slick-track {
          display: flex !important;
        }
        .latest-articles-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .latest-articles-slider .slick-slide > div {
          display: flex;
          width: 100%;
          min-width: 0;
        }
        .article-dots li button:before {
          display: none !important;
          content: none !important;
        }
        .article-dots li {
          width: auto;
          height: auto;
          margin: 0;
        }
        .article-dot {
          display: block !important;
          width: 7px !important;
          height: 7px !important;
          border-radius: 9999px !important;
          background-color: #cbd5e1 !important;
          transition: all 0.3s ease;
          border: none !important;
          padding: 0 !important;
          cursor: pointer;
        }
        .article-dots li.slick-active .article-dot {
          width: 20px !important;
          background-color: #059669 !important;
        }
      `}</style>
    </div>
  );
}
