"use client";

import { useState } from "react";
import { Breadcrumbs, Button, TextField } from "@mui/material";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import FilteringSection from "@/components/Public/DoctorsPage/FilteringSection";
import DoctorsSection from "@/components/Public/DoctorsPage/DoctorsSection";

export default function Doctors() {
  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    return <div></div>;
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
            className="py-6 sm:py-4"
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
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
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

            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                borderRadius: "12px",
                padding: "12px 20px",
                minWidth: "64px",
                boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)",
                transition: "all 0.3s ease",
                width: { xs: "100%", sm: "auto" },
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
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="grid grid-cols-5 p-5">
        {/* filtering section */}
        <div className="col-span-1 p-4 shadow-lg">
          <FilteringSection />
        </div>
        {/* main section */}
        <div className="col-span-4">
          <DoctorsSection />
        </div>
      </div>
    </div>
  );
}
