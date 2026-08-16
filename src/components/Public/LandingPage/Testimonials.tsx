"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const testimonials = [
  {
    quote:
      "MediCare made it so easy to find the right doctor and book an appointment. Highly recommended!",
    rating: 5,
    name: "Abrar Rahman",
    location: "Dhaka, Bangladesh",
    image: "/images/users/user-avatar-1.png",
  },
  {
    quote:
      "The doctors are very professional and the platform is super user-friendly.",
    rating: 5,
    name: "Nusrat Jahan",
    location: "Chattogram, Bangladesh",
    image: "/images/users/user-avatar-2.png",
  },
  {
    quote:
      "Video consultation feature is a lifesaver! I can consult from home without any hassle.",
    rating: 5,
    name: "Tanvir Hasan",
    location: "Sylhet, Bangladesh",
    image: "/images/users/user-avatar-3.png",
  },
  {
    quote:
      "Booking a follow-up used to take forever. Now it's three taps and I'm done. Genuinely saves me hours every month.",
    rating: 4,
    name: "Shirin Akter",

    location: "Rajshahi, Bangladesh",
    image: "/images/users/user-avatar-4.png",
  },
  {
    quote:
      "I was nervous about my first online consultation, but the doctor was patient and thorough. It felt just like an in-person visit.",
    name: "Farhan Kabir",
    rating: 5,
    location: "Khulna, Bangladesh",
    image: "/images/users/user-avatar-5.png",
  },
];

export default function Testimonials() {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidesToShow(3);
      else if (width >= 640) setSlidesToShow(2);
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
    autoplaySpeed: 3200,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8">
        <ul className="testimonial-dots flex items-center justify-center gap-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <button aria-label="Go to slide" className="testimonial-dot" />
    ),
    centerMode: false,
  };

  const SkeletonTestimonial = () => (
    <div className="h-full w-full px-2 sm:px-3 py-2">
      <div className="h-full w-full rounded-lg border border-slate-100 bg-white shadow-sm">
        <div className="flex h-full flex-col justify-between p-3">
          <div className="flex flex-col gap-3">
            <div className="h-8 w-8 rounded bg-slate-100 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-slate-100 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-sm bg-slate-100 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-11 w-11 rounded-full bg-slate-100 animate-pulse" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" />
              <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[75%]">
        <div className="text-center mb-4 sm:mb-6 lg:mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-[0.15em] text-emerald-600 uppercase mb-2">
            Patients Love Us
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            What our <span className="text-emerald-600">patients say</span>
          </h2>
        </div>

        <div className="relative min-w-0">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-0 top-1/2 z-10 hidden sm:flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:bg-emerald-600 hover:text-white cursor-pointer"
          >
            <FaChevronLeft size={13} />
          </button>

          <Slider
            key={slidesToShow}
            ref={sliderRef}
            {...settings}
            className="testimonial-slider"
          >
            {loading
              ? Array.from({ length: slidesToShow }).map((_, i) => <SkeletonTestimonial key={i} />)
              : testimonials.map((t, index) => (
                  <Box key={index} className="h-full px-2 sm:px-3 py-2">
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "grey.100",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      p: 3,
                      "&:last-child": { pb: 3 },
                    }}
                  >
                    <Box>
                      <FaQuoteLeft className="text-2xl text-emerald-500 mb-4" />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          lineHeight: 1.6,
                          minHeight: { sm: "4.8em" },
                        }}
                      >
                        {t.quote}
                      </Typography>
                      <div className="flex items-center gap-0.5 mt-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <FaStar key={i} className="text-amber-400 text-sm" />
                        ))}
                      </div>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Avatar sx={{ width: 44, height: 44 }}>
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            lineHeight: 1.3,
                          }}
                        >
                          {t.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {t.location}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-0 top-1/2 z-10 hidden sm:flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:bg-emerald-600 hover:text-white cursor-pointer"
          >
            <FaChevronRight size={13} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-slider .slick-track {
          display: flex !important;
        }
        .testimonial-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .testimonial-slider .slick-slide > div {
          display: flex;
          width: 100%;
          min-width: 0;
        }

        .testimonial-dots li button:before {
          display: none !important;
          content: none !important;
        }
        .testimonial-dots li {
          width: auto;
          height: auto;
          margin: 0;
        }
        .testimonial-dot {
          display: block !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 9999px !important;
          background-color: #cbd5e1 !important; /* slate-300 */
          transition: all 0.3s ease;
          border: none !important;
          padding: 0 !important;
          opacity: 1 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          cursor: pointer;
        }
        .testimonial-dots li.slick-active .testimonial-dot {
          width: 10px !important;
          height: 10px !important;
          background-color: #16a34a !important; /* green-600 */
        }
      `}</style>
    </div>
  );
}
