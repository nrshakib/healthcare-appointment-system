"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import { FaHandHoldingHeart } from "react-icons/fa";

import specialities from "@/utils/specialities";
import SpecialitiesHero from "@/components/Public/SpecialitiesPage/SpecialitiesHero";
import { LuCalendarHeart, LuHeartHandshake } from "react-icons/lu";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const ITEMS_PER_PAGE = 8;

const services = [
  {
    icon: <LuHeartHandshake />,
    title: "Verified Specialists",
    subtitle: "All doctors are verified & experiences",
  },
  {
    icon: <LuCalendarHeart />,
    title: "Easy Booking",
    subtitle: "Book appointments in just a few clicks",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    title: "24/7 Support",
    subtitle: "We're here to help anytime",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Secure & Private",
    subtitle: "Your health data is always private",
  },
];

export default function Specialities() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(specialities.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedSpecialities = specialities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mb-10">
      <SpecialitiesHero />
      {/* specialities card */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
          {paginatedSpecialities.map((speciality, index) => {
            const Icon = speciality.Icon;
            const color = speciality.color;

            return (
              <Card
                key={startIndex + index}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "grey.100",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                    borderColor: color.border,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: { xs: 1.25, sm: 1.5 },
                    py: { xs: 2.5, sm: 3 },
                    px: { xs: 2, sm: 2.5 },
                    "&:last-child": { pb: { xs: 2.5, sm: 3 } },
                  }}
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-full transition-transform duration-300 ease-in-out hover:scale-110 sm:size-14 ${color.bgClass} ${color.textClass}`}
                  >
                    <Icon className="size-6 sm:size-7" />
                  </div>

                  <div>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.4,
                        mb: 0.5,
                      }}
                    >
                      {speciality.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        lineHeight: 1.5,
                      }}
                    >
                      {speciality.details}
                    </Typography>
                  </div>

                  <Link
                    href={`/find-care/specialities/${speciality.slug}`}
                    className={`mt-1 inline-flex min-h-10 w-full max-w-40 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-colors sm:mt-2 sm:w-auto sm:px-4 sm:text-sm ${color.borderClass} ${color.textClass} ${color.hoverBgClass}`}
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center sm:mt-10">
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

      {/* support */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-5 bg-[#e8f9f0] w-full xl:max-w-[75%] mx-auto px-4 sm:px-10 py-5 rounded-xl mb-8">
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <p className="bg-white rounded-full p-2 sm:p-4 shrink-0">
            <FaHandHoldingHeart className="text-[#288654] text-base sm:text-2xl" />
          </p>
          <div className="min-w-0">
            <p className="text-primary text-sm sm:text-lg font-medium">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Our care team is here to help you find the right specialist.
            </p>
          </div>
        </div>
        <Link
          href="/contact/support"
          className="text-primary text-sm sm:text-base font-medium border-2 border-primary rounded-lg px-3 py-2 bg-[#d8fde9] hover:bg-[#c1e9e5] transition-colors duration-300 w-1/2 sm:w-auto mx-auto sm:mx-0 text-center shrink-0"
        >
          Contact Support
        </Link>
      </div>

      {/* services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-2 border border-gray-100 rounded-lg px-4 sm:px-5 py-6 sm:py-8 xl:max-w-[75%] mx-auto">
        {services.map((service, index) => {
          return (
            <div key={index} className="flex items-center gap-3 sm:gap-2">
              <p className="text-xl sm:text-2xl text-primary bg-[#e8f9f0] p-2 rounded-full shrink-0">
                {service.icon}
              </p>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base">
                  {service.title}
                </p>
                <p className="text-xs text-gray-500">{service.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
