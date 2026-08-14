"use client";

import { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const articles = [
  {
    category: "Nutrition",
    title: "10 Superfoods That Boost Your Immune System",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "/images/articles/superfoods.png",
  },
  {
    category: "Wellness",
    title: "Simple Ways to Reduce Stress and Improve Mental Health",
    date: "May 10, 2026",
    readTime: "4 min read",
    image: "/images/articles/meditation.png",
  },
  {
    category: "Health Tips",
    title: "When Should You See a Doctor? 7 Warning Signs",
    date: "May 8, 2026",
    readTime: "6 min read",
    image: "/images/articles/doctor-visit.png",
  },
  {
    category: "Fitness",
    title: "A Beginner's Guide to Building a Sustainable Workout Routine",
    date: "May 6, 2026",
    readTime: "7 min read",
    image: "/images/articles/workout.png",
  },
  {
    category: "Sleep",
    title: "Why Quality Sleep Matters More Than You Think",
    date: "May 4, 2026",
    readTime: "5 min read",
    image: "/images/articles/sleep.png",
  },
  {
    category: "Nutrition",
    title: "Hydration 101: How Much Water Do You Really Need?",
    date: "May 2, 2026",
    readTime: "3 min read",
    image: "/images/articles/hydration.png",
  },
  {
    category: "Parenting",
    title: "Keeping Kids Healthy During Flu Season",
    date: "April 29, 2026",
    readTime: "6 min read",
    image: "/images/articles/kids-health.png",
  },
  {
    category: "Wellness",
    title: "The Link Between Gut Health and Mental Wellbeing",
    date: "April 26, 2026",
    readTime: "5 min read",
    image: "/images/articles/gut-health.png",
  },
];

export default function HealthArticles() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8">
        <ul className="article-dots flex items-center justify-center gap-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <button aria-label="Go to slide" className="article-dot" />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 xl:max-w-[80%] mx-auto px-1 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row sm:items-end sm:justify-between sm:text-left sm:gap-4 sm:mb-8 lg:mb-12">
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xs sm:text-sm font-bold tracking-[0.15em] text-emerald-600 uppercase mb-1.5">
            Health Articles
          </p>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Latest <span className="text-emerald-600">health insights</span>
          </h2>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm sm:text-base font-medium text-emerald-600 hover:underline shrink-0"
        >
          <p>View All Articles</p>
          <FaArrowRight />
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous articles"
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 z-10 hidden sm:flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:bg-emerald-600 hover:text-white cursor-pointer"
        >
          <FaChevronLeft size={13} />
        </button>

        <Slider ref={sliderRef} {...settings} className="article-slider">
          {articles.map((article, index) => (
            <Box key={index} className="h-full px-2 sm:px-3 py-2">
              <Link href="/" className="group block h-full">
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "grey.100",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 250,
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-fill transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Box>

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      px: 2.5,
                      pb: 2.5,
                      mt: 2,
                      "&:last-child": { pb: 2.5 },
                    }}
                  >
                    <Chip
                      label={article.category}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        mb: 1,
                        p: 1,
                        bgcolor: "#ecfdf5",
                        color: "#047857",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        border: "4px solid white",
                      }}
                    />

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        lineHeight: 1.4,
                        fontSize: { xs: "1rem", sm: "16px" },
                      }}
                    >
                      {article.title}
                    </Typography>

                    <Box
                      sx={{
                        mt: "auto",

                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                        fontSize: "0.8rem",
                      }}
                    >
                      <span>{article.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{article.readTime}</span>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Slider>

        <button
          type="button"
          aria-label="Next articles"
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 z-10 hidden sm:flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:bg-emerald-600 hover:text-white cursor-pointer"
        >
          <FaChevronRight size={13} />
        </button>
      </div>

      <style jsx global>{`
        .article-slider .slick-track {
          display: flex !important;
        }
        .article-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .article-slider .slick-slide > div {
          display: flex;
          width: 100%;
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
          width: 8px !important;
          height: 8px !important;
          border-radius: 9999px !important;
          background-color: #cbd5e1 !important;
          transition: all 0.3s ease;
          border: none !important;
          padding: 0 !important;
          opacity: 1 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          cursor: pointer;
        }
        .article-dots li.slick-active .article-dot {
          width: 10px !important;
          height: 10px !important;
          background-color: #16a34a !important;
        }
      `}</style>
    </div>
  );
}
