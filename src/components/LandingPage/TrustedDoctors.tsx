// "use client";

// import { useRef } from "react";
// import Link from "next/link";

// import Slider from "react-slick";
// import doctors from "@/utils/doctors";
// import Image from "next/image";

// import { FaArrowRight, FaStar, FaRegCalendarAlt } from "react-icons/fa";
// import { FiUsers } from "react-icons/fi";
// import { FaUserDoctor } from "react-icons/fa6";
// import { MdOutlineHealthAndSafety } from "react-icons/md";
// import { RxDividerVertical } from "react-icons/rx";

// export default function TrustedDoctors() {
//   const sliderRef = useRef<Slider>(null);

//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     speed: 600,
//     autoplaySpeed: 2400,
//     pauseOnHover: true,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: { slidesToShow: 4, slidesToScroll: 1, infinite: true },
//       },
//       {
//         breakpoint: 770,
//         settings: { slidesToShow: 3, slidesToScroll: 1 },
//       },
//       {
//         breakpoint: 520,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           centerMode: true,
//           centerPadding: "24px",
//         },
//       },
//     ],
//   };

//   return (
//     <div className="py-10 sm:py-14 lg:py-16 max-w-7xl mx-auto px-4">
//       <div className="flex items-center justify-between mb-6">
//         <p className="text-xl sm:text-2xl font-semibold text-slate-900">
//           Meet Our Trusted Doctors
//         </p>
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-primary font-medium hover:underline"
//         >
//           <p>View All Doctors</p>
//           <FaArrowRight />
//         </Link>
//       </div>

//       <div className="relative mb-3">
//         <Slider ref={sliderRef} {...settings}>
//           {doctors.map((doctor, index) => (
//             <div key={index} className="px-2 py-2">
//               <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
//                 <div className="relative h-48 w-full bg-slate-100">
//                   <Image
//                     src={doctor.image}
//                     alt={doctor.name}
//                     fill
//                     className="object-fit"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 p-4">
//                   <div>
//                     <p className="text-base font-semibold text-slate-900">
//                       {doctor.name}
//                     </p>
//                     <p className="text-sm font-medium text-primary/70">
//                       {doctor.speciality}
//                     </p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-1 text-sm">
//                       <FaStar className="text-yellow-500" />
//                       <span className="font-semibold text-yellow-600">
//                         {doctor.rating}
//                       </span>
//                       <span className="text-slate-400">
//                         ({doctor.reviewCount})
//                       </span>
//                     </div>
//                     <p className="text-sm text-slate-500">
//                       {doctor.experience}+ Yesrs Exp.
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold text-primary">
//                     ${doctor.consultationFee} / Consultation
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <div className="flex items-center justify-between bg-linear-to-r from-[#0b7761] to-[#19ac67] rounded-lg px-10 py-5 text-white">
//         <div className="flex items-center gap-3">
//           <FiUsers className="text-4xl" />
//           <div>
//             <p className="text-xl font-bold">200+</p>
//             <p>Happy Patients</p>
//           </div>
//         </div>
//         <RxDividerVertical />
//         <div className="flex items-center gap-3">
//           <FaUserDoctor className="text-4xl" />
//           <div>
//             <p className="text-xl font-bold">40+</p>
//             <p>Expert Doctors</p>
//           </div>
//         </div>{" "}
//         <RxDividerVertical />
//         <div className="flex items-center gap-3">
//           <FaRegCalendarAlt className="text-4xl" />
//           <div>
//             <p className="text-xl font-bold">50+</p>
//             <p>Appointments Daily</p>
//           </div>
//         </div>{" "}
//         <RxDividerVertical />
//         <div className="flex items-center gap-3">
//           <MdOutlineHealthAndSafety className="text-4xl" />
//           <div>
//             <p className="text-xl font-bold">99%</p>
//             <p className="">Patient Satisfaction</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
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
        settings: { slidesToShow: 4, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "32px",
        },
      },
    ],
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

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
          Meet Our Trusted Doctors
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm sm:text-base text-primary font-medium hover:underline"
        >
          <p>View All Doctors</p>
          <FaArrowRight />
        </Link>
      </div>

      <div className="relative mb-4 sm:mb-6 lg:mb-5">
        <Slider ref={sliderRef} {...settings}>
          {doctors.map((doctor, index) => (
            <div key={index} className="px-1.5 sm:px-2 py-2">
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <div className="relative h-44 sm:h-48 lg:h-56 w-full bg-slate-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-fit"
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-6 bg-linear-to-r from-[#0b7761] to-[#19ac67] rounded-lg px-5 sm:px-8 lg:px-10 py-6 sm:py-5 text-white">
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
  );
}
