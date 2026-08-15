/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs, Button, TextField } from "@mui/material";
import { FaMapMarkerAlt, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import FilteringSection, {
  Filters,
} from "@/components/Public/DoctorsPage/FilteringSection";
import DoctorsSection from "@/components/Public/DoctorsPage/DoctorsSection";
import doctors from "@/utils/doctors";

const fees = doctors.map((d) => d.consultationFee);
const MIN_FEE = Math.min(...fees, 0);
const MAX_FEE = Math.max(...fees, 100);
const specialityOptions = Array.from(
  new Set(doctors.map((doctor) => doctor.speciality)),
).sort();

const defaultFilters: Filters = {
  specialities: [],
  experience: "",
  gender: "",
  consultationType: "",
  availability: "",
  priceRange: [MIN_FEE, MAX_FEE],
};

export default function Doctors() {
  const [doctorQuery, setDoctorQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });

  const filteredDoctors = useMemo(() => {
    const q = doctorQuery.trim().toLowerCase();
    const loc = location.trim().toLowerCase();

    return doctors.filter((doctor) => {
      // Text search: name or speciality
      if (
        q &&
        !doctor.name.toLowerCase().includes(q) &&
        !doctor.speciality.toLowerCase().includes(q)
      ) {
        return false;
      }

      // Location search (only applied if doctor has a location field)
      if (loc && (doctor as any).location) {
        if (!(doctor as any).location.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Specialities (multi-select)
      if (
        filters.specialities.length > 0 &&
        !filters.specialities.includes(doctor.speciality)
      ) {
        return false;
      }

      // Experience range
      if (filters.experience) {
        const exp = doctor.experience;
        const ranges: Record<string, [number, number]> = {
          "0-5 years": [0, 5],
          "5-10 years": [5, 10],
          "10-15 years": [10, 15],
          "15+ years": [15, Infinity],
        };
        const [min, max] = ranges[filters.experience] ?? [0, Infinity];
        if (exp < min || exp > max) return false;
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

      // Availability
      if (filters.availability === "Available Today") {
        if (!doctor.availableDays.includes(todayName)) return false;
      }
      if (filters.availability === "Available This Week") {
        if (!doctor.availableDays || doctor.availableDays.length === 0)
          return false;
      }

      // Price range
      if (
        doctor.consultationFee < filters.priceRange[0] ||
        doctor.consultationFee > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [doctorQuery, location, filters, todayName]);

  const handleClearAll = () => {
    setFilters(defaultFilters);
  };

  return (
    <div>
      {/* top section */}
      <div className="bg-[#eaf6f4] py-6">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[80%] xl:px-0">
          <p className="text-2xl sm:text-3xl font-semibold">Find Doctors</p>

          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "11px", sm: "14px" },
              py: { xs: 2, sm: 3 },
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
              },
              "& p": {
                fontSize: "inherit",
              },
            }}
          >
            <p>Home</p>
            <p>Find Care</p>
            <p className="text-primary font-medium">Doctors</p>
          </Breadcrumbs>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-2xl shadow-sm p-4 mt-4 w-full">
            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 min-w-0">
              <FaSearch className="text-[#10B981] text-base lg:text-lg shrink-0" />
              <div className="w-full min-w-0 text-left">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Search Doctor
                </p>
                <TextField
                  placeholder="Doctor, specialty, etc."
                  variant="standard"
                  value={doctorQuery}
                  onChange={(e) => setDoctorQuery(e.target.value)}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      style: { fontSize: "0.8rem" },
                    },
                  }}
                  fullWidth
                />
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 min-w-0">
              <FaMapMarkerAlt className="text-[#10B981] text-base lg:text-lg shrink-0" />
              <div className="w-full min-w-0 text-left">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Location
                </p>
                <TextField
                  placeholder="City, area, or zip code"
                  variant="standard"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      style: { fontSize: "0.8rem" },
                    },
                  }}
                  fullWidth
                />
              </div>
            </div>

            {/* Mobile: open filters drawer. Desktop: no-op search is implicit (live filtering) */}
            <div className="flex gap-2">
              <Button
                variant="contained"
                onClick={() => {}}
                sx={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: "12px",
                  padding: { xs: "10px 16px", sm: "12px 16px" },
                  minWidth: "64px",
                  fontSize: { xs: "11px", sm: "14px" },
                  boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)",
                  transition: "all 0.3s ease",
                  flex: { xs: 1, sm: "initial" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <FaSearch className="text-white text-lg shrink-0" />
                <span className="text-white text-sm font-medium sm:hidden">
                  Search
                </span>
              </Button>

              {/* Filters toggle — only visible below lg */}
              <Button
                variant="outlined"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden"
                sx={{
                  borderRadius: "12px",
                  padding: { xs: "10px 16px", sm: "12px 16px" },
                  fontSize: { xs: "11px", sm: "14px" },
                  borderColor: "#10B981",
                  color: "#10B981",
                  flex: { xs: 1, sm: "initial" },
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    borderColor: "#059669",
                    backgroundColor: "rgba(16,185,129,0.05)",
                  },
                }}
              >
                <FaFilter />
                <span className="text-sm font-medium">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className="mx-auto max-w-[95%] xl:max-w-[90%] grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-5 gap-6 py-4">
        {/* filtering section — sidebar on desktop */}
        <div className="hidden lg:block col-span-1 md:col-span-2 xl:col-span-1 p-4 shadow-lg rounded-xl h-fit sticky top-4">
          <FilteringSection
            filters={filters}
            onChange={setFilters}
            onClearAll={handleClearAll}
            minFee={MIN_FEE}
            maxFee={MAX_FEE}
            specialityOptions={specialityOptions}
          />
        </div>

        {/* mobile drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute left-0 top-16 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto p-4">
              <div className="flex items-center justify-end mb-1">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              <FilteringSection
                filters={filters}
                onChange={setFilters}
                onClearAll={handleClearAll}
                minFee={MIN_FEE}
                maxFee={MAX_FEE}
                specialityOptions={specialityOptions}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={() => setMobileFiltersOpen(false)}
                sx={{
                  mt: 3,
                  backgroundColor: "#10B981",
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#059669" },
                }}
              >
                Apply Filters ({filteredDoctors.length})
              </Button>
            </div>
          </div>
        )}

        {/* main section */}
        <div className="col-span-1 md:col-span-5 xl:col-span-4">
          <DoctorsSection doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}
