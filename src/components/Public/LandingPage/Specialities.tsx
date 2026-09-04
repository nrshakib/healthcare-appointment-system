"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import specialities from "@/utils/specialities";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import Link from "next/link";

export default function Specialities() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1600) setSlidesToShow(6);
      else if (width >= 1500) setSlidesToShow(5);
      else if (width >= 1024) setSlidesToShow(4);
      else if (width >= 770) setSlidesToShow(3);
      else if (width >= 520) setSlidesToShow(2);
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
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2400,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
  };

  const SkeletonSpeciality = () => (
    <div className="h-full w-full px-2 py-4 sm:px-3 sm:py-5">
      <div className="spec-card flex h-full min-h-56 flex-col items-center justify-between rounded-lg p-5 sm:min-h-64 sm:p-6 lg:min-h-72">
        <div className="flex flex-col items-center gap-4">
          <div className="spec-skeleton size-10 sm:size-12 lg:size-16 rounded-full animate-pulse" />
          <div className="flex flex-col items-center gap-2">
            <div className="spec-skeleton h-5 w-32 rounded animate-pulse" />
            <div className="spec-skeleton h-4 w-48 rounded animate-pulse" />
          </div>
        </div>
        <div className="spec-skeleton h-9 w-28 rounded-full animate-pulse" />
      </div>
    </div>
  );

  return (
    <section className="darker-bg w-full py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 xl:max-w-[85%]">
        {/* top texts */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="hero-heading-accent uppercase text-sm sm:text-base font-semibold tracking-wide">
            Specialities
          </p>
          <p className="text-heading max-w-2xl text-xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Find care in our top{" "}
            <span className="hero-heading-accent">specialities</span>
          </p>
        </div>

        {/* slider */}
        <div className="specialities-slider-container mt-6 sm:mt-8 w-full min-w-0">
          <Slider
            key={slidesToShow}
            {...settings}
            className="specialities-slider"
          >
            {loading
              ? Array.from({ length: slidesToShow }).map((_, i) => (
                  <SkeletonSpeciality key={i} />
                ))
              : specialities.map((speciality, index) => {
                  const Icon = speciality.Icon;

                  return (
                    <div
                      key={index}
                      className="h-full px-2 py-4 sm:px-3 sm:py-5"
                    >
                      <div className="spec-card group flex h-full min-h-56 flex-col items-center justify-between rounded-lg p-5 text-center sm:min-h-64 sm:p-6 lg:min-h-72 hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                          <p
                            className={`mb-4 flex size-10 sm:size-12 lg:size-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20 ${speciality.color.bgClass}`}
                          >
                            <Icon
                              className={`text-xl sm:text-3xl lg:text-4xl ${speciality.color.textClass}`}
                            />
                          </p>
                          <h3 className="text-heading lg:mb-2 text-lg sm:text-xl font-semibold">
                            {speciality.name}
                          </h3>
                          <p className="spec-detail text-sm leading-relaxed">
                            {speciality.details}
                          </p>
                        </div>
                        <Link
                          href={`/find-care/specialities/${speciality.slug}`}
                          className="spec-card-link group flex items-center gap-2 font-semibold px-3 py-1.5 rounded-full transition-colors duration-300"
                        >
                          <p>Find Doctors</p>
                          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
          </Slider>
        </div>

        {/* Link */}
        <Link
          href="/find-care/specialities"
          className="spec-view-all mt-4 sm:mt-6 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm sm:text-base font-semibold"
        >
          <p>View All Specialities</p>
          <IoIosArrowForward />
        </Link>
      </div>
      <style jsx global>{`
        .specialities-slider .slick-list {
          overflow: hidden;
        }
        .specialities-slider .slick-track {
          display: flex !important;
        }
        .specialities-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .specialities-slider .slick-slide > div {
          display: flex;
          width: 100%;
          min-width: 0;
        }
      `}</style>
    </section>
  );
}
