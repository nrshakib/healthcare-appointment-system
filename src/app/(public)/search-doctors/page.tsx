/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Breadcrumbs,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbHome2Filled } from "react-icons/tb";

import Link from "next/link";
import FilteringSection, {
  Filters,
} from "@/components/Public/DoctorsPage/FilteringSection";
import DoctorSearchResults from "@/components/DoctorSearchResults";
import doctors from "@/utils/doctors";

dayjs.extend(customParseFormat);

const datePickerTheme = createTheme({
  palette: {
    primary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
  },
});

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

function SearchDoctorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [doctorInput, setDoctorInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [dateInput, setDateInput] = useState<Dayjs | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState<
    "recommended" | "rating" | "fee-low" | "fee-high" | "experience"
  >("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL search parameters
  useEffect(() => {
    const doc = searchParams.get("doctor") || "";
    const loc = searchParams.get("location") || "";
    const dateParam = searchParams.get("date");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDoctorInput(doc);
    setLocationInput(loc);

    if (dateParam) {
      let parsed = dayjs(dateParam, "YYYY-MM-DD", true);
      if (!parsed.isValid()) {
        parsed = dayjs(dateParam, "DD/MM/YYYY", true);
      }
      if (!parsed.isValid()) {
        parsed = dayjs(dateParam);
      }
      setDateInput(parsed.isValid() ? parsed : null);
    } else {
      setDateInput(null);
    }
  }, [searchParams]);

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (doctorInput.trim()) params.set("doctor", doctorInput.trim());
    if (locationInput.trim()) params.set("location", locationInput.trim());
    if (dateInput && dateInput.isValid()) {
      params.set("date", dateInput.format("YYYY-MM-DD"));
    }
    const qs = params.toString();
    router.push(`/search-doctors${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handleClearAll = () => {
    setFilters(defaultFilters);
    setDoctorInput("");
    setLocationInput("");
    setDateInput(null);
    setSortBy("recommended");
    router.push("/search-doctors", { scroll: false });
  };

  const currentDoctorParam = searchParams.get("doctor") || "";
  const currentLocationParam = searchParams.get("location") || "";
  const currentDateParam = searchParams.get("date") || "";

  const hasSearchCriteria =
    Boolean(currentDoctorParam) ||
    Boolean(currentLocationParam) ||
    Boolean(currentDateParam);

  const hasFiltersApplied =
    filters.specialities.length > 0 ||
    Boolean(filters.experience) ||
    Boolean(filters.gender && filters.gender !== "All") ||
    Boolean(filters.consultationType && filters.consultationType !== "All") ||
    filters.priceRange[0] > MIN_FEE ||
    filters.priceRange[1] < MAX_FEE;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Search Section */}
      <div className="bg-[#eaf6f4] py-6 border-b border-emerald-100">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[80%] xl:px-0">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "11px", sm: "14px" },
              pb: { xs: 1.5, sm: 2 },
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
              },
              "& p, & a": {
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
            <p className="text-primary font-medium">Search Doctors</p>
          </Breadcrumbs>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
              Doctor Search Results..
            </h1>
          </div>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-2xl shadow-sm p-4 mt-2 w-full border border-gray-100">
            {/* Search Doctor Input */}
            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 min-w-0">
              <FaSearch className="text-[#10B981] text-base lg:text-lg shrink-0" />
              <div className="w-full min-w-0 text-left">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Search Doctor
                </p>
                <TextField
                  placeholder="Doctor, specialty, etc."
                  variant="standard"
                  value={doctorInput}
                  onChange={(e) => setDoctorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      style: { fontSize: "0.85rem" },
                    },
                  }}
                  fullWidth
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 min-w-0">
              <FaMapMarkerAlt className="text-[#10B981] text-base lg:text-lg shrink-0" />
              <div className="w-full min-w-0 text-left">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Location
                </p>
                <TextField
                  placeholder="City, area, or hospital"
                  variant="standard"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      style: { fontSize: "0.85rem" },
                    },
                  }}
                  fullWidth
                />
              </div>
            </div>

            {/* Date Picker Input */}
            <div className="flex items-center gap-3 flex-1 pb-1 sm:pb-0 min-w-0">
              <FaCalendarAlt
                className="text-[#10B981] text-base lg:text-lg shrink-0 cursor-pointer"
                onClick={() => setOpenDatePicker(true)}
              />
              <div className="flex-1 w-full min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p
                    className="text-gray-600 text-xs sm:text-sm font-semibold cursor-pointer"
                    onClick={() => setOpenDatePicker(true)}
                  >
                    Choose Date
                  </p>
                  {/* {dateInput && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDateInput(null);
                      }}
                      className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  )} */}
                </div>
                <ThemeProvider theme={datePickerTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={dateInput}
                      onChange={(newValue) => setDateInput(newValue)}
                      open={openDatePicker}
                      onOpen={() => setOpenDatePicker(true)}
                      onClose={() => setOpenDatePicker(false)}
                      closeOnSelect={false}
                      slotProps={{
                        actionBar: {
                          actions: ["cancel", "accept"],
                          sx: {
                            px: 2,
                            pb: 1,
                            gap: 1,
                            "& .MuiButton-root": {
                              border: "1.5px solid",
                              borderColor: "primary.main",
                              borderRadius: "8px",
                              textTransform: "none",
                              fontWeight: 600,
                              color: "primary.main",
                              px: 2,
                              "&:hover": {
                                backgroundColor: "primary.main",
                                color: "#fff",
                                borderColor: "primary.main",
                              },
                            },
                          },
                        },
                        dialog: {
                          onClose: () => setOpenDatePicker(false),
                        },
                        desktopPaper: {
                          sx: {
                            borderRadius: "16px",
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                          },
                        },
                        mobilePaper: {
                          sx: {
                            borderRadius: "16px",
                          },
                        },
                        textField: {
                          variant: "standard",
                          fullWidth: true,
                          onClick: () => setOpenDatePicker(true),
                          slotProps: {
                            input: {
                              disableUnderline: true,
                              style: {
                                cursor: "pointer",
                                fontSize: "0.85rem",
                              },
                            },
                            htmlInput: {
                              placeholder: "Select Date",
                            },
                          },
                          sx: {
                            width: "100%",
                            cursor: "pointer",
                            "& .MuiInputBase-input": {
                              fontSize: "0.85rem",
                            },
                            "& .MuiPickersSectionList-root": {
                              fontSize: "0.85rem",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">
              <Button
                variant="contained"
                onClick={handleSearchSubmit}
                sx={{
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: "12px",
                  padding: { xs: "10px 18px", sm: "12px 20px" },
                  minWidth: "64px",
                  fontSize: { xs: "12px", sm: "14px" },
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

              {/* Mobile filters toggle */}
              <Button
                variant="outlined"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden"
                sx={{
                  textTransform: "none",
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

          {/* Active criteria pills */}
          {(hasSearchCriteria || hasFiltersApplied) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs sm:text-sm">
              <span className="text-gray-500 font-semibold">
                Active search:
              </span>
              {currentDoctorParam && (
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium border border-emerald-200">
                  Doctor: &ldquo;{currentDoctorParam}&rdquo;
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("doctor");
                      router.push(
                        `/search-doctors${params.toString() ? `?${params.toString()}` : ""}`,
                        { scroll: false },
                      );
                    }}
                    className="hover:text-emerald-950 font-bold ml-0.5 text-base leading-none cursor-pointer"
                    aria-label="Remove doctor filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentLocationParam && (
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium border border-emerald-200">
                  Location: &ldquo;{currentLocationParam}&rdquo;
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("location");
                      router.push(
                        `/search-doctors${params.toString() ? `?${params.toString()}` : ""}`,
                        { scroll: false },
                      );
                    }}
                    className="hover:text-emerald-950 font-bold ml-0.5 text-base leading-none cursor-pointer"
                    aria-label="Remove location filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentDateParam && (
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium border border-emerald-200">
                  Date: {currentDateParam}
                  {dateInput && dateInput.isValid() && (
                    <span> ({dateInput.format("dddd")})</span>
                  )}
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("date");
                      router.push(
                        `/search-doctors${params.toString() ? `?${params.toString()}` : ""}`,
                        { scroll: false },
                      );
                    }}
                    className="hover:text-emerald-950 font-bold ml-0.5 text-base leading-none cursor-pointer"
                    aria-label="Remove date filter"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={handleClearAll}
                className="text-emerald-700 hover:text-emerald-900 font-semibold underline ml-2 cursor-pointer text-xs sm:text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Sidebar + Search Results */}
      <div className="mx-auto max-w-[95%] xl:max-w-[80%] py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-4 gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-2 xl:col-span-1">
            <div className="bg-white p-5 shadow-sm border border-gray-200/80 rounded-2xl sticky top-4">
              <FilteringSection
                filters={filters}
                onChange={setFilters}
                onClearAll={handleClearAll}
                minFee={MIN_FEE}
                maxFee={MAX_FEE}
                specialityOptions={specialityOptions}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute left-0 top-16 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <p className="font-bold text-gray-800 text-lg">
                    Filter Results
                  </p>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="text-gray-500 hover:text-gray-800 p-1"
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
                    fontWeight: 600,
                    py: 1.2,
                    "&:hover": { backgroundColor: "#059669" },
                  }}
                >
                  Show Results
                </Button>
              </div>
            </div>
          )}

          {/* Results Column */}
          <div className="lg:col-span-5 xl:col-span-3">
            <div className="flex items-center justify-between mb-4 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
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

            <DoctorSearchResults
              doctor={currentDoctorParam}
              location={currentLocationParam}
              date={currentDateParam}
              specialities={filters.specialities}
              gender={filters.gender}
              consultationType={filters.consultationType}
              experience={filters.experience}
              priceRange={filters.priceRange as [number, number]}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchDoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              Searching for doctors...
            </p>
          </div>
        </div>
      }
    >
      <SearchDoctorsContent />
    </Suspense>
  );
}
