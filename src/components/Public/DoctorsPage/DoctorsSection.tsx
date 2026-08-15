"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Pagination } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";
import { FaBookMedical } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/utils/slugify";

interface Doctor {
  id: string | number;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  availableDays: string[];
  rating: number;
  reviewCount: number;
  experience: number;
  consultationType: string;
  consultationFee: number;
}

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to page 1 whenever the filtered list changes (new search/filter)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [doctors]);

  const totalPages = Math.ceil(doctors.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDoctors = doctors.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const tomorrowName = tomorrow.toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <p className="text-lg font-semibold text-gray-700">
          No doctors match your filters
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Try adjusting your search or clearing some filters.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <p className="text-sm text-gray-500 mb-3 font-medium">
        <span className="text-primary">{doctors.length}</span> doctor
        {doctors.length !== 1 ? "s" : ""} found
      </p>

      <div className="grid grid-cols-1 gap-4">
        {paginatedDoctors.map((doctor) => {
          const isAvailableToday = doctor.availableDays.includes(todayName);
          const isAvailableTomorrow =
            doctor.availableDays.includes(tomorrowName);

          return (
            <Card
              key={doctor.id}
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: { xs: "16px", sm: "24px" },
                  padding: "16px",
                }}
              >
                {/* Doctor image */}
                <div className="h-64 w-auto mx-auto sm:mx-0 shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={0}
                    height={0}
                    sizes="160px"
                    className="h-full w-auto object-cover"
                  />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-lg sm:text-xl mb-1 sm:mb-2">
                    {doctor.name}
                  </p>

                  <div className="text-sm lg:text-base">
                    <p className="flex flex-wrap gap-x-1">
                      <span className="text-blue-700 font-medium">
                        {doctor.speciality}
                      </span>
                      <span className="text-gray-600">
                        • {doctor.experience} Years Exp.
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-gray-500 mt-1">
                      <FaBookMedical className="text-lg font-medium text-primary shrink-0" />
                      <span className="truncate">{doctor.degree}</span>
                    </p>
                  </div>

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 sm:mt-3">
                    <div className="flex items-center gap-1">
                      <AiFillStar className="text-amber-400" size={16} />
                      <span className="font-semibold text-sm text-gray-800">
                        {doctor.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({doctor.reviewCount} reviews)
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        isAvailableToday
                          ? "text-primary"
                          : isAvailableTomorrow
                            ? "text-amber-600"
                            : "text-gray-400"
                      }`}
                    >
                      <IoMdCheckmarkCircle size={16} />
                      {isAvailableToday
                        ? "Available Today"
                        : isAvailableTomorrow
                          ? "Available Tomorrow"
                          : "Not Available"}
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 sm:mt-3 text-sm text-gray-600">
                    {doctor.consultationType
                      ?.toLowerCase()
                      .includes("online") && (
                      <div className="flex items-center gap-2">
                        <HiOutlineVideoCamera className="text-primary font-semibold text-lg" />
                        Video Consultation
                      </div>
                    )}
                    {doctor.consultationType
                      ?.toLowerCase()
                      .includes("person") && (
                      <div className="flex items-center gap-2">
                        <FiUserCheck className="text-primary font-semibold text-lg" />
                        In-person
                      </div>
                    )}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex sm:flex-col items-baseline sm:items-end gap-1 sm:gap-0">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      ৳{doctor.consultationFee}
                    </p>
                    <p className="text-xs text-gray-400 sm:-mt-1">
                      / Consultation
                    </p>
                  </div>
                  <Link
                    href={`/find-care/doctors/${slugify(doctor.name)}`}
                    className="bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-5 py-2 rounded-xl sm:mt-2 transition-colors whitespace-nowrap"
                  >
                    View Profile
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 500,
                borderRadius: "8px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#10B981",
                color: "white",
                "&:hover": { backgroundColor: "#059669" },
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(16, 185, 129, 0.1)",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
