"use client";

import Slider from "react-slick";
import * as LuIcons from "react-icons/lu";
import specialities from "@/utils/specialities";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import Link from "next/link";

const icons = LuIcons as unknown as Record<string, IconType>;

export default function Specialities() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2400,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "24px",
        },
      },
    ],
  };

  const colorMap: Record<string, { bg: string; text: string }> = {
    "red-500": { bg: "bg-red-100", text: "text-red-500" },
    "blue-500": { bg: "bg-blue-100", text: "text-blue-500" },
    "purple-500": { bg: "bg-purple-100", text: "text-purple-500" },
    "pink-500": { bg: "bg-pink-100", text: "text-pink-500" },
    "teal-500": { bg: "bg-teal-100", text: "text-teal-500" },
    "green-500": { bg: "bg-green-100", text: "text-green-500" },
    "indigo-500": { bg: "bg-indigo-100", text: "text-indigo-500" },
    "orange-500": { bg: "bg-orange-100", text: "text-orange-500" },
  };

  const getColorClasses = (color: string) => {
    return colorMap[color] || { bg: "bg-primary", text: "text-primary" };
  };

  const getIcon = (iconName: string, color = "primary") => {
    const IconComponent = icons[iconName];
    if (!IconComponent) return null;
    const { text } = getColorClasses(color);
    return (
      <IconComponent className={`text-xl sm:text-3xl lg:text-4xl ${text}`} />
    );
  };

  return (
    <section className="w-full bg-white-50 py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[90%] flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* top texts */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-primary uppercase text-sm sm:text-base font-semibold tracking-wide">
            Specialities
          </p>
          <p className="max-w-2xl text-xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900">
            Find care in our top{" "}
            <span className="text-primary">specialities</span>
          </p>
        </div>

        {/* slider */}
        <div className="slider-container mt-6 sm:mt-8 w-full">
          <Slider {...settings}>
            {specialities.map((speciality, index) => (
              <div key={index} className="px-2 py-4 sm:px-3 sm:py-5">
                <div className="group flex min-h-56 sm:min-h-64 lg:min-h-70 flex-col items-center justify-between rounded-2xl border border-emerald-100/70 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-6">
                  <div className="flex flex-col items-center">
                    <p
                      className={`mb-4 flex size-10 sm:size-12 lg:size-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20 ${getColorClasses(speciality.color).bg}`}
                    >
                      {getIcon(speciality.icon, speciality.color)}
                    </p>
                    <h3 className="lg:mb-2 text-lg sm:text-xl font-semibold text-slate-900">
                      {speciality.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {speciality.details}
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="group flex items-center gap-2 text-primary font-semibold px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors duration-300"
                  >
                    <p>Find Doctors</p>
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Link */}
        <Link
          href="/"
          className="mt-4 sm:mt-6 flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2.5 text-sm sm:text-base font-semibold text-primary transition-colors duration-200 hover:bg-primary/15"
        >
          <p>View All Specialities</p>
          <IoIosArrowForward />
        </Link>
      </div>
    </section>
  );
}
