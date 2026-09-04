"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import healthArticles from "@/utils/healthArticles";
import SkeletonArticle from "@/components/Shared/SkeletonArticle";

export default function HealthArticles() {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlidesToShow(4);
      else if (width >= 1280) setSlidesToShow(3);
      else if (width >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
      clearTimeout(timer);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8 px-2 ">
        <ul className="articles-dots hidden sm:flex flex-wrap items-center justify-center gap-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <button aria-label="Go to slide" className="articles-dot" />
    ),
    centerMode: false,
  };

  return (
    <div className="darker-bg py-10 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[80%]">
        <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left sm:gap-4 sm:mb-8 lg:mb-12">
          <div className="flex min-w-0 flex-col items-center sm:items-start">
            <p className="articles-green-text text-xs sm:text-sm font-bold tracking-[0.15em] uppercase mb-1.5">
              Health Articles
            </p>
            <h2 className="text-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Latest{" "}
              <span className="articles-green-text">health insights</span>
            </h2>
          </div>
          <Link
            href="/resources/health-articles"
            className="articles-green-text flex items-center gap-2 text-sm sm:text-base font-medium hover:underline shrink-0"
          >
            <span>View All Articles</span>
            <FaArrowRight />
          </Link>
        </div>

        <div className="relative min-w-0 sm:px-8 lg:px-10">
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => sliderRef.current?.slickPrev()}
            className="articles-arrow articles-arrow-prev"
          >
            <FaChevronLeft size={13} />
          </button>

          <Slider
            key={slidesToShow}
            ref={sliderRef}
            {...settings}
            className="article-slider"
          >
            {loading
              ? Array.from({ length: slidesToShow }).map((_, i) => (
                  <SkeletonArticle key={i} />
                ))
              : healthArticles.map((article, index) => (
                  <Box
                    key={index}
                    className="h-full px-1 py-2 min-[380px]:px-2 sm:px-3"
                  >
                    <Link
                      href={`/resources/health-articles/${article.slug}`}
                      className="group block h-full"
                    >
                      <Card elevation={0} className="articles-card">
                        <Box
                          sx={{
                            position: "relative",
                            aspectRatio: {
                              xs: "16 / 12",
                              sm: "4 / 3",
                              lg: "16 / 11",
                            },
                            minHeight: { xs: 190, sm: 190 },
                            maxHeight: { xs: 260, lg: 250 },
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </Box>

                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            px: { xs: 2, sm: 2.5 },
                            pt: { xs: 2, sm: 2.25 },
                            pb: { xs: 2.25, sm: 2.5 },
                            "&:last-child": { pb: { xs: 2.25, sm: 2.5 } },
                          }}
                        >
                          <Chip
                            label={article.category}
                            size="small"
                            sx={{
                              alignSelf: "flex-start",
                              mb: 1,
                              px: 1,
                              bgcolor: "#ecfdf5",
                              color: "#047857",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              lineHeight: 1.4,
                              fontSize: { xs: "0.9375rem", sm: "14px" },
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                            className="text-heading truncate"
                          >
                            {article.title}
                          </Typography>

                          <Box
                            sx={{
                              mt: "auto",
                              pt: 2,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                              color: "text.secondary",
                              fontSize: { xs: "0.75rem", sm: "0.8rem" },
                              flexWrap: "wrap",
                              lineHeight: 1.4,
                            }}
                          >
                            <span className="articles-heading-accent">
                              {article.date}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300 shrink-0" />
                            <span className="articles-heading-accent">
                              {article.readTime}
                            </span>
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
            className="articles-arrow articles-arrow-next"
          >
            <FaChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
