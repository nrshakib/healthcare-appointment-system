/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Badge, Card, CardContent, Pagination } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";
import { FaBookMedical, FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";

dayjs.extend(customParseFormat);

interface DoctorSearchResultsProps {
  doctor?: string;
  location?: string;
  date?: string;
  specialities?: string[];
  gender?: string;
  consultationType?: string;
  experience?: string;
  priceRange?: [number, number];
  sortBy?: "recommended" | "rating" | "fee-low" | "fee-high" | "experience";
}

export default function DoctorSearchResults({
  doctor = "",
  location = "",
  date = "",
  specialities = [],
  gender = "",
  consultationType = "",
  experience = "",
  priceRange,
  sortBy = "recommended",
}: DoctorSearchResultsProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const validDate = useMemo(() => {
    if (!date) return null;
    let parsed = dayjs(date, "YYYY-MM-DD", true);
    if (!parsed.isValid()) {
      parsed = dayjs(date, "DD/MM/YYYY", true);
    }
    if (!parsed.isValid()) {
      parsed = dayjs(date);
    }
    return parsed.isValid() ? parsed : null;
  }, [date]);

  const targetWeekday = validDate ? validDate.format("dddd") : null;
  const formattedDateStr = validDate
    ? validDate.format("dddd, MMM D, YYYY")
    : null;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const tomorrowName = tomorrow.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const filteredDoctors = useMemo(() => {
    const q = doctor.trim().toLowerCase();
    const loc = location.trim().toLowerCase();

    const result = doctors.filter((doc) => {
      // 1. Doctor / Speciality / Services text query
      if (q) {
        const nameMatch = doc.name?.toLowerCase().includes(q);
        const specMatch = doc.speciality?.toLowerCase().includes(q);
        const degreeMatch = doc.degree?.toLowerCase().includes(q);
        const servicesMatch = doc.services?.some((s: string) =>
          s.toLowerCase().includes(q),
        );
        const aboutMatch = doc.about?.toLowerCase().includes(q);
        if (
          !nameMatch &&
          !specMatch &&
          !degreeMatch &&
          !servicesMatch &&
          !aboutMatch
        ) {
          return false;
        }
      }

      // 2. Location match
      if (loc) {
        const docLoc = ((doc as any).location || "").toLowerCase();
        if (!docLoc.includes(loc)) {
          return false;
        }
      }

      // 3. Date availability match (weekday)
      if (targetWeekday) {
        if (!doc.availableDays || !doc.availableDays.includes(targetWeekday)) {
          return false;
        }
      }

      // 4. Specialities filter
      if (specialities.length > 0 && !specialities.includes(doc.speciality)) {
        return false;
      }

      // 5. Gender filter
      if (
        gender &&
        gender !== "All" &&
        (doc as any).gender &&
        (doc as any).gender !== gender
      ) {
        return false;
      }

      // 6. Consultation type
      if (consultationType && consultationType !== "All") {
        const type = doc.consultationType?.toLowerCase() ?? "";
        if (
          consultationType === "Video Consultation" &&
          !type.includes("online")
        ) {
          return false;
        }
        if (consultationType === "In Person" && !type.includes("person")) {
          return false;
        }
      }

      // 7. Experience filter
      if (experience) {
        const exp = doc.experience;
        const ranges: Record<string, [number, number]> = {
          "0-5 years": [0, 5],
          "5-10 years": [5, 10],
          "10-15 years": [10, 15],
          "15+ years": [15, Infinity],
        };
        const [min, max] = ranges[experience] ?? [0, Infinity];
        if (exp < min || exp > max) return false;
      }

      // 8. Price range filter
      if (priceRange) {
        if (
          doc.consultationFee < priceRange[0] ||
          doc.consultationFee > priceRange[1]
        ) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "fee-low") {
      result.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sortBy === "fee-high") {
      result.sort((a, b) => b.consultationFee - a.consultationFee);
    } else if (sortBy === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    return result;
  }, [
    doctor,
    location,
    targetWeekday,
    specialities,
    gender,
    consultationType,
    experience,
    priceRange,
    sortBy,
  ]);

  // Reset pagination when search parameters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [
    doctor,
    location,
    date,
    specialities,
    gender,
    consultationType,
    experience,
    priceRange,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (filteredDoctors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 text-2xl">
          <FaBookMedical />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No doctors match your search
        </h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
          {formattedDateStr
            ? `We couldn't find any doctors matching "${[doctor, location].filter(Boolean).join(", ")}" available on ${formattedDateStr}.`
            : `We couldn't find any doctors matching your search criteria. Try using broader keywords or clearing filters.`}
        </p>
        <Link
          href="/find-care/doctors"
          className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-500/20"
        >
          Browse All Available Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <p className="text-sm font-medium text-gray-600 text-center sm:text-start">
          Showing{" "}
          <span className="text-emerald-600 font-bold">
            {filteredDoctors.length}
          </span>{" "}
          doctor
          {filteredDoctors.length !== 1 ? "s" : ""}
          {formattedDateStr && (
            <span>
              {" "}
              available on <br />{" "}
              <span className="font-semibold text-gray-800">
                {formattedDateStr}
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paginatedDoctors.map((doc) => {
          const isAvailableToday = doc.availableDays.includes(todayName);
          const isAvailableTomorrow = doc.availableDays.includes(tomorrowName);
          const isAvailableOnTargetDate =
            targetWeekday && doc.availableDays.includes(targetWeekday);

          return (
            <Card
              key={doc.id}
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #f1f5f9",
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
                <div className="h-48 sm:h-52 w-40 sm:w-44 shrink-0 rounded-xl overflow-hidden relative">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-contain"
                  />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link
                      href={`/find-care/doctors/${slugify(doc.name)}`}
                      className="font-bold text-gray-900 text-lg sm:text-xl hover:text-emerald-600 transition-colors"
                    >
                      {doc.name}
                    </Link>
                  </div>

                  <div className="text-sm">
                    <p className="flex flex-wrap gap-x-2 text-sm font-medium">
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-semibold">
                        {doc.speciality}
                      </span>
                      <span className="text-gray-500 py-0.5">
                        • {doc.experience} Years Experience
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-gray-600 mt-2">
                      <FaBookMedical className="text-base font-medium text-emerald-600 shrink-0" />
                      <span className="truncate">{doc.degree}</span>
                    </p>

                    {(doc as any).location && (
                      <p className="flex items-center gap-2 text-gray-600 mt-1.5">
                        <FaMapMarkerAlt className="text-base text-rose-500 shrink-0" />
                        <span className="truncate">
                          {(doc as any).location}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Rating & Availability */}
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mt-3">
                    <div className="flex items-center gap-1">
                      <AiFillStar className="text-amber-400" size={16} />
                      <span className="font-semibold text-sm text-gray-800">
                        {doc.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({doc.reviewCount} reviews)
                      </span>
                    </div>

                    {targetWeekday ? (
                      <div
                        className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                          isAvailableOnTargetDate
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <FaCalendarCheck size={13} />
                        {isAvailableOnTargetDate
                          ? `Available on ${validDate?.format("ddd, MMM D")}`
                          : `Not scheduled on ${validDate?.format("ddd, MMM D")}`}
                      </div>
                    ) : (
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          isAvailableToday
                            ? "text-emerald-600"
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
                            : `Available ${doc.availableDays.slice(0, 2).join(", ")}`}
                      </div>
                    )}
                  </div>

                  {/* Consultation Type Badges */}
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    {doc.consultationType?.toLowerCase().includes("online") && (
                      <Badge className="inline-flex items-center gap-1.5 rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                        <HiOutlineVideoCamera className="text-sm" />
                        Video Consultation
                      </Badge>
                    )}
                    {doc.consultationType?.toLowerCase().includes("person") && (
                      <Badge className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        <FiUserCheck className="text-sm" />
                        In-person
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price + Profile CTA */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex sm:flex-col items-baseline sm:items-end gap-1 sm:gap-0">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      ৳{doc.consultationFee}
                    </p>
                    <p className="text-xs text-gray-400 sm:-mt-1">
                      / Consultation
                    </p>
                  </div>
                  <Link
                    href={`/find-care/doctors/${slugify(doc.name)}`}
                    className="bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
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
        <div className="flex justify-center pt-6 pb-2">
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
