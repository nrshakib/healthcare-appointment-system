/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { FormControl, MenuItem, Pagination, Select } from "@mui/material";
import { FaFilter, FaTimes } from "react-icons/fa";

import doctors from "@/utils/doctors";
import AvailableTodayHero from "@/components/Public/AvailableToday/AvailableTodayHero";
import AvailableTodayFilters, {
  Filters,
} from "@/components/Public/AvailableToday/AvailableTodayFilters";
import AvailableTodayDoctorCard, {
  DoctorCardItem,
} from "@/components/Public/AvailableToday/AvailableTodayDoctorCard";
import AvailableTodayFeatures from "@/components/Public/AvailableToday/AvailableTodayFeatures";
import AppointmentModal from "@/components/Public/AvailableToday/AppointmentModal";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailableTodayPage() {
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick Appointment Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorCardItem | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const today = new Date();
  const todayName = dayNames[today.getDay()];

  // Doctors available today
  const availableTodayDoctors = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        Array.isArray(doctor.availableDays) &&
        doctor.availableDays.includes(todayName),
    );
  }, [todayName]);

  const specialityOptions = useMemo(() => {
    return Array.from(
      new Set(doctors.map((doctor) => doctor.speciality)),
    ).sort();
  }, []);

  const { minFee, maxFee } = useMemo(() => {
    const fees = availableTodayDoctors.map((d) => d.consultationFee);
    return {
      minFee: fees.length ? Math.min(...fees, 0) : 0,
      maxFee: fees.length ? Math.max(...fees, 100) : 100,
    };
  }, [availableTodayDoctors]);

  const [filters, setFilters] = useState<Filters>({
    specialities: [],
    experience: "",
    gender: "",
    consultationType: "",
    availability: "Available Today",
    priceRange: [0, 5000],
  });

  const filteredDoctors = useMemo(() => {
    return availableTodayDoctors
      .filter((doctor) => {
        // Specialities (multi-select)
        if (
          filters.specialities.length > 0 &&
          !filters.specialities.includes(doctor.speciality)
        ) {
          return false;
        }

        // Gender
        if (
          filters.gender &&
          filters.gender !== "All" &&
          (doctor as any).gender &&
          (doctor as any).gender !== filters.gender
        ) {
          return false;
        }

        // Consultation type
        if (filters.consultationType && filters.consultationType !== "All") {
          const type = doctor.consultationType?.toLowerCase() ?? "";
          if (
            filters.consultationType === "Video Consultation" &&
            !type.includes("online")
          ) {
            return false;
          }
          if (
            filters.consultationType === "In Person" &&
            !type.includes("person")
          ) {
            return false;
          }
        }

        // Price range
        if (
          doctor.consultationFee < filters.priceRange[0] ||
          doctor.consultationFee > filters.priceRange[1]
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "fee-low") return a.consultationFee - b.consultationFee;
        if (sortBy === "fee-high") return b.consultationFee - a.consultationFee;
        if (sortBy === "experience") return b.experience - a.experience;
        return 0;
      });
  }, [availableTodayDoctors, filters, sortBy]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage) || 1;
  const paginatedDoctors = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, page, itemsPerPage]);

  const activeFiltersCount = useMemo(() => {
    let count = filters.specialities.length;
    if (filters.gender && filters.gender !== "All") count += 1;
    if (filters.consultationType && filters.consultationType !== "All")
      count += 1;
    if (filters.priceRange[0] > minFee || filters.priceRange[1] < maxFee)
      count += 1;
    return count;
  }, [filters, minFee, maxFee]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const resultsElement = document.getElementById("doctor-results-top");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearAll = () => {
    setFilters({
      specialities: [],
      experience: "",
      gender: "",
      consultationType: "",
      availability: "Available Today",
      priceRange: [minFee, maxFee],
    });
    setPage(1);
  };

  const handleOpenBooking = (doctor: DoctorCardItem, slot?: string) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(slot || null);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Hero Section */}
      <AvailableTodayHero />

      {/* Main Container */}
      <main
        id="doctor-results-top"
        className="mx-auto w-full sm:max-w-[95%] lg:max-w-full xl:max-w-[90%] px-3 xl:px-8 py-6 sm:py-8 lg:py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column: Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 xl:col-span-3 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto bg-white p-5 rounded-2xl border border-slate-100/90 shadow-lg">
            <AvailableTodayFilters
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
              onClearAll={handleClearAll}
              minFee={minFee}
              maxFee={maxFee}
              specialityOptions={specialityOptions}
            />
          </aside>

          {/* Right Column: Results Header + Doctors List */}
          <section className="lg:col-span-3 xl:col-span-9 space-y-4 sm:space-y-5">
            {/* Header: Count & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-1">
              <div className="flex items-center justify-between gap-2.5">
                <h2 className="text-base min-[400px]:text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-tight">
                  <span className="text-[#06836b]">
                    {filteredDoctors.length}
                  </span>{" "}
                  doctors available today
                </h2>

                {/* Mobile Filters trigger button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer shrink-0"
                >
                  <FaFilter className="text-[#06836b] text-xs" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="size-4 rounded-full bg-[#06836b] text-white text-[10px] flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-0 bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border border-gray-200/80 sm:border-none shadow-sm sm:shadow-none">
                <p className="text-sm font-semibold text-gray-700">Sort by:</p>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    sx={{
                      fontSize: "0.85rem",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e2e8f0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10B981",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10B981",
                      },
                    }}
                  >
                    <MenuItem value="recommended">Recommended</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="fee-low">Fee: Low to High</MenuItem>
                    <MenuItem value="fee-high">Fee: High to Low</MenuItem>
                    <MenuItem value="experience">Most Experienced</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Doctor Cards Grid */}
            {paginatedDoctors.length > 0 ? (
              <div className="space-y-3.5 sm:space-y-4">
                {paginatedDoctors.map((doctor) => (
                  <AvailableTodayDoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={handleOpenBooking}
                    currencySymbol="৳"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center border border-slate-100 shadow-xs space-y-3">
                <div className="size-14 sm:size-16 rounded-full bg-emerald-50 text-[#06836b] flex items-center justify-center mx-auto text-xl sm:text-2xl">
                  🔍
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  No doctors match your selected filters
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Try clearing some filter options or adjusting your search.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-6 sm:pt-8 pb-4">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  size="medium"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontWeight: 600,
                      borderRadius: "10px",
                      color: "#475569",
                      minWidth: { xs: "28px", sm: "36px" },
                      height: { xs: "28px", sm: "36px" },
                      fontSize: { xs: "12px", sm: "14px" },
                      margin: { xs: "1px", sm: "3px" },
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#06836b",
                      color: "#ffffff",
                      "&:hover": { backgroundColor: "#056f5a" },
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "rgba(6, 131, 107, 0.08)",
                    },
                  }}
                />
              </div>
            )}
          </section>
        </div>

        {/* Bottom Feature / Value Proposition Bar */}
        <AvailableTodayFeatures />
      </main>

      {/* Mobile Filter Slide-over Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex top-16">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between px-5 pt-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#06836b] text-xs font-semibold border border-emerald-100">
                    {activeFiltersCount} active filters
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
              <AvailableTodayFilters
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                  setPage(1);
                }}
                onClearAll={handleClearAll}
                minFee={minFee}
                maxFee={maxFee}
                specialityOptions={specialityOptions}
              />
            </div>

            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-[#06836b] hover:bg-[#056f5a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                Show Results ({filteredDoctors.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quick Appointment Booking Modal */}
      <AppointmentModal
        doctor={selectedDoctor}
        selectedSlot={selectedSlot}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        currencySymbol="৳"
      />
    </div>
  );
}
