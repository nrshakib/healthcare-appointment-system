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
      <div className="testimonial-skeleton h-full w-full rounded-lg border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex h-full flex-col justify-between p-3">
          <div className="flex flex-col gap-3">
            <div className="h-8 w-8 rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-sm bg-slate-100 dark:bg-slate-700 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-11 w-11 rounded-full bg-slate-100 dark:bg-slate-700 animate-pulse" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-24 rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-700 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="testimonials py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[75%]">
        <div className="text-center mb-4 sm:mb-6 lg:mb-12">
          <p className="testimonial-subtitle text-xs sm:text-sm font-bold tracking-[0.15em] uppercase mb-2">
            Patients Love Us
          </p>
          <h2 className="testimonial-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
            What our{" "}
            <span className="testimonial-heading-accent">patients say</span>
          </h2>
        </div>

        <div className="relative min-w-0">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => sliderRef.current?.slickPrev()}
            className="testimonial-arrow testimonial-arrow-prev"
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
              ? Array.from({ length: slidesToShow }).map((_, i) => (
                  <SkeletonTestimonial key={i} />
                ))
              : testimonials.map((t, index) => (
                  <Box key={index} className="h-full px-2 sm:px-3 py-2">
                    <Card elevation={0} className="testimonial-card">
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
                          <FaQuoteLeft className="testimonial-quote-icon text-2xl mb-4" />
                          <Typography
                            variant="body2"
                            className="testimonial-quote-text"
                            sx={{
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                              lineHeight: 1.6,
                              minHeight: { sm: "4.8em" },
                              fontStyle: "italic",
                            }}
                          >
                            {t.quote}
                          </Typography>
                          <div className="flex items-center gap-0.5 mt-4">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <FaStar
                                key={i}
                                className="testimonial-star text-sm"
                              />
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
                              className="testimonial-name-text"
                              sx={{
                                fontWeight: 600,
                                lineHeight: 1.3,
                              }}
                            >
                              {t.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              className="testimonial-location-text"
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
            className="testimonial-arrow testimonial-arrow-next"
          >
            <FaChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
