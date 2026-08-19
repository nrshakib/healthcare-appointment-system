"use client";

import { FaSearch } from "react-icons/fa";
import { Breadcrumbs, Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { TbHome2Filled } from "react-icons/tb";

type SpecialitiesHeroProps = {
  searchSpecialities: string;
  onSearchSpecialitiesChange: (value: string) => void;
};

export default function SpecialitiesHero({
  searchSpecialities,
  onSearchSpecialitiesChange,
}: SpecialitiesHeroProps) {
  const handleSearch = () => {
    document
      .getElementById("specialities-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#e8f9f0]">
      <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-8 sm:pt-5 xl:pt-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 overflow-hidden">
        {/* left section */}
        <div className="w-full lg:w-1/2 xl:pl-4 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-3 sm:gap-4 items-center lg:items-start">
            <Breadcrumbs
              separator=">"
              aria-label="breadcrumb"
              sx={{
                fontSize: { xs: "11px", sm: "14px" },
                py: { xs: 1, sm: 2, lg: 3 },
                "& .MuiBreadcrumbs-separator": {
                  mx: { xs: 0.5, sm: 1 },
                },
                "& p": {
                  fontSize: "inherit",
                },
              }}
            >
              <Link
                href="/"
                className="text-primary hover:text-emerald-600 transition-colors"
              >
                <TbHome2Filled className="text-lg" />
              </Link>
              <p>Find Care</p>
              <p className="text-primary font-medium">Specialities</p>
            </Breadcrumbs>
          </div>
          <div className="space-y-3 2xl:mb-3">
            <p className="text-xl sm:text-3xl lg:text-4xl font-bold">
              Browse Specialities
            </p>
            <p className="text-xs sm:text-sm lg:text-base w-full lg:w-3/4 text-gray-700">
              Find the right care for your health. Choose from our wide range of
              medical specialities.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-2/3 lg:w-full 2xl:w-2/3 mx-auto md:mx-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-2xl shadow-sm p-2 pl-3 mt-2 w-full">
              <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 min-w-0">
                <FaSearch className="text-[#10B981] text-base lg:text-lg shrink-0" />
                <TextField
                  placeholder="Enter the specialty to search"
                  variant="standard"
                  value={searchSpecialities}
                  onChange={(e) => onSearchSpecialitiesChange(e.target.value)}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "14px", sm: "14px", xl: "16px" },
                    },
                  }}
                  fullWidth
                />
              </div>

              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  minWidth: "64px",
                  boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)",
                  transition: "all 0.3s ease",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <FaSearch className="text-white text-xl mx-auto" />
              </Button>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="relative w-full lg:w-1/2 min-h-32 sm:min-h-48 lg:min-h-60 max-w-70 sm:max-w-105 xl:max-w-125 shrink-0 flex items-center justify-center mx-auto">
          {/* Background blob - right */}
          <div
            className="pointer-events-none absolute -right-24 sm:-right-32 md:-right-50 top-1/2 size-16 sm:size-24 md:size-36 xl:size-72 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85% )",
            }}
          />
          {/* top-left */}
          <div
            className="pointer-events-none absolute left-0 top-16 sm:top-24 lg:top-2 h-16 sm:h-24 lg:h-30 xl:h-45 w-16 sm:w-24 lg:w-30 xl:w-45 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
            }}
          />
          {/* bottom-center */}
          <div
            className="pointer-events-none absolute left-8 sm:left-16 xl:left-20 top-3/4 size-20 sm:size-30 md:size-40 xl:size-50 -translate-y-1/2 rounded-full blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
            }}
          />

          <div className="relative w-full h-48 sm:h-64 lg:h-64 xl:h-80">
            {/* Doctor image - shifted right on mobile to clear the card on the left, centered from sm up */}
            <div className="absolute bottom-0 left-[68%] sm:left-3/4 -translate-x-1/2 lg:left-1/2 h-48 sm:h-72 lg:h-64 xl:h-80 w-36 sm:w-64 xl:w-80 overflow-hidden">
              <Image
                src="/images/HeroDoctor.png"
                alt="Doctor with arms crossed, wearing a white coat and stethoscope"
                width={360}
                height={480}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Badge card - left on mobile, right from sm up */}
            <div className="absolute top-2 left-0 sm:-left-10 lg:left-auto sm:right-2 lg:-right-10 xl:-right-10 sm:top-6 bg-white p-2.5 sm:p-3 rounded-lg shadow-md flex flex-col items-start gap-1 z-10 max-w-100 sm:max-w-48">
              <p className="text-xs sm:text-base font-medium text-gray-600 leading-tight">
                Get Treated For
              </p>
              <p className="text-xs sm:text-base xl:text-lg font-semibold text-slate-900 leading-tight">
                <span className="text-primary text-base sm:text-xl xl:text-2xl">
                  30+
                </span>{" "}
                Specialities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
