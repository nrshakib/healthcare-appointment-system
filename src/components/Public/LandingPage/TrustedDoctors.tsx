"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Slider from "react-slick";
import doctors from "@/utils/doctors";
import Image from "next/image";

import { FaArrowRight, FaStar, FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineHealthAndSafety } from "react-icons/md";

export default function TrustedDoctors() {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSlidesToShow(4);
      else if (width >= 1024) setSlidesToShow(3);
      else if (width >= 400) setSlidesToShow(2);
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
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
  };

  const stats = [
    { icon: FiUsers, value: "200+", label: "Happy Patients" },
    { icon: FaUserDoctor, value: "40+", label: "Expert Doctors" },
    { icon: FaRegCalendarAlt, value: "50+", label: "Appointments Daily" },
    {
      icon: MdOutlineHealthAndSafety,
      value: "99%",
      label: "Patient Satisfaction",
    },
  ];

  const SkeletonDoctor = () => (
    <div className="h-full w-full px-1.5 py-2 sm:px-2">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="h-60 sm:h-72 lg:h-64 2xl:h-96 w-full bg-slate-100 animate-pulse" />
        <div className="flex flex-col gap-3 p-3 sm:p-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="h-4 w-24 rounded bg-slate-100 animate-pulse mt-auto" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 min-[370px]:px-10 min-[420px]:px-2 sm:px-6 lg:px-8 xl:max-w-[80%]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
            Meet Our Trusted Doctors
          </p>
          <Link
            href="/find-care/doctors"
            className="flex items-center gap-2 text-sm sm:text-base text-primary font-medium hover:underline"
          >
            <p>View All Doctors</p>
            <FaArrowRight />
          </Link>
        </div>

        <div className="relative mb-4 sm:mb-6 lg:mb-5">
          <Slider
            key={slidesToShow}
            ref={sliderRef}
            {...settings}
            className="trusted-doctors-slider"
          >
            {loading
              ? Array.from({ length: slidesToShow }).map((_, i) => (
                  <SkeletonDoctor key={i} />
                ))
              : doctors.map((doctor, index) => (
                  <div key={index} className="h-full px-1.5 py-2 sm:px-2">
                    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                      <div className="relative h-60 sm:h-72 lg:h-64 2xl:h-96 w-full bg-slate-100">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          className="object-fill"
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4">
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                            {doctor.name}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-primary/70 truncate">
                            {doctor.speciality}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <FaStar className="text-yellow-500" />
                            <span className="font-semibold text-yellow-600">
                              {doctor.rating}
                            </span>
                            <span className="text-slate-400">
                              ({doctor.reviewCount})
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500">
                            {doctor.experience}+ Years Exp.
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-primary">
                          ${doctor.consultationFee} / Consultation
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-4 rounded-lg bg-linear-to-r from-[#0b7761] to-[#19ac67] px-5 py-6 text-white sm:gap-6 sm:px-8 sm:py-5 lg:grid-cols-4 lg:px-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 justify-start lg:justify-start lg:border-l lg:first:border-l-0 lg:pl-6 lg:first:pl-0"
              >
                <Icon className="text-xl sm:text-3xl lg:text-4xl shrink-0" />
                <div>
                  <p className="text-base sm:text-xl font-bold leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-sm leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .trusted-doctors-slider .slick-list {
          overflow: hidden;
        }
        .trusted-doctors-slider .slick-track {
          display: flex !important;
        }
        .trusted-doctors-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .trusted-doctors-slider .slick-slide > div {
          display: flex;
          width: 100%;
          min-width: 0;
        }
      `}</style>
    </div>
  );
}
