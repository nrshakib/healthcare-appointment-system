"use client";

import { LuHeartHandshake, LuCalendarHeart } from "react-icons/lu";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaHandHoldingHeart, FaVideo } from "react-icons/fa6";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeadphones,
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Image from "next/image";

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

const PATIENT_AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
];

function FloatingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "absolute flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-4 shadow-lg border border-white/50 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

   const handleSearch = () => {
    const params = new URLSearchParams();
    if (doctor) params.set("doctor", doctor);
    if (location) params.set("location", location);
    if (date) params.set("date", date.format("DD/MM/YYYY"));
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 px-1 py-10 flex items-center justify-between gap-4">
      {/* left section */}
      <div className="pl-20">
        <div className="flex flex-col gap-4">
          <p className="text-primary bg-primary/20 w-fit px-2 py-1 rounded-lg text-sm font-medium">
            Your Health, Our Priority
          </p>
          <p className="text-5xl font-bold w-[48%] leading-[1.1]">
            Quality care for a{" "}
            <span className="text-primary">healthier you</span>
          </p>
          <p className="text-gray-600 text-lg w-[48%]">
            Find trusted doctors, book appointments, and manage your health
            anytime, anywhere.
          </p>
        </div>
        <div className="mb-6">
          {/* Search Box */}
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4 mt-8">
            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4">
              <FaSearch className="text-[#10B981] text-xl shrink-0" />
              <div className="w-full">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Search Doctor
                </p>
                <TextField
                  placeholder="Doctor, specialty, etc."
                  variant="standard"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  slotProps={{ input: { disableUnderline: true } }}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4">
              <FaMapMarkerAlt className="text-[#10B981] text-xl shrink-0" />
              <div className="w-full">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Location
                </p>
                <TextField
                  placeholder="City, area, or zip code"
                  variant="standard"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  slotProps={{ input: { disableUnderline: true } }}
                  className="w-full"
                />
              </div>
            </div>
            <div
              className="flex items-center gap-3 flex-1 cursor-pointer pb-1 sm:pb-0"
              onClick={() => setOpenDatePicker(true)}
            >
              <FaCalendarAlt className="text-[#10B981] text-xl shrink-0" />
              <div className="flex-1 w-full">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Choose Date
                </p>
                <ThemeProvider theme={datePickerTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      open={openDatePicker}
                      onOpen={() => setOpenDatePicker(true)}
                      onClose={() => setOpenDatePicker(false)}
                      slotProps={{
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
                          onClick: () => setOpenDatePicker(true),
                          slotProps: {
                            input: {
                              disableUnderline: true,

                              style: {
                                cursor: "pointer",
                                fontSize: "0.875rem",
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
                              fontSize: "0.875rem",
                            },
                            "& .MuiPickersSectionList-root": {
                              fontSize: "0.875rem",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                borderRadius: "12px",
                padding: "16px 24px",
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
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <p className="text-lg bg-gray-200 rounded-full p-1">
              <LuHeartHandshake className="text-primary" />
            </p>
            <p className="text-sm font-medium">Verified Doctors</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg bg-gray-200 rounded-full p-1">
              <LuCalendarHeart className="text-primary" />
            </p>
            <p className="text-sm font-medium">Easy Booking</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg bg-gray-200 rounded-full p-1">
              <MdOutlineHealthAndSafety className="text-primary" />
            </p>
            <p className="text-sm font-medium">Secure & Private</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg bg-gray-200 rounded-full p-1">
              <FaHandHoldingHeart className="text-primary" />
            </p>
            <p className="text-sm font-medium">24/7 Support</p>
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="relative w-full lg:w-2/3 min-h-[460px] sm:min-h-[520px] max-w-[600px] shrink-0 flex items-center justify-center mx-auto">
        {/* Background blob */}
        <div
          className="pointer-events-none absolute -right-50 top-1/2 h-80 sm:h-125 w-80 sm:w-125 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85% )",
          }}
        />
        <div
          className="pointer-events-none absolute left-0 top-2 h-60 sm:h-75 w-40 sm:w-75 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-20 top-3/4 size-60 sm:size-80 -translate-y-1/2 rounded-full blur-[2px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
          }}
        />
        <div className="relative w-full h-[460px] sm:h-[520px]">
          {/* Doctor image */}
          <div className="absolute bottom-0 left-1/2 h-[380px] sm:h-[460px] w-[280px] sm:w-[360px] -translate-x-1/2 overflow-hidden">
            <Image
              src="/images/heroDoctor.png"
              alt="Doctor with arms crossed, wearing a white coat and stethoscope"
              width={360}
              height={480}
              className="h-full w-full object-cover object-top"
            />
          </div>
          {/* 24/7 Support — top left */}
          <FloatingCard className="left-2 sm:left-12 lg:left-24 top-16 sm:top-28 bg-white/80">
            <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-50">
              <FaHeadphones className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
            </span>
            <span className="leading-tight">
              <span className="block text-base sm:text-lg font-bold text-slate-900">
                24/7
              </span>
              <span className="block text-xs sm:text-sm text-slate-500">
                Support
              </span>
            </span>
          </FloatingCard>
          {/* Video Consultation — right middle */}
          <FloatingCard className="right-2 sm:right-6 lg:right-2 top-36 sm:top-44 bg-white/80">
            <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-50">
              <FaVideo className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
            </span>
            <span className="leading-tight">
              <span className="block text-base sm:text-lg font-bold text-slate-900">
                Video
              </span>
              <span className="block text-xs sm:text-sm text-slate-500">
                Consultation
              </span>
            </span>
          </FloatingCard>
          {/* 50K+ Happy Patients — bottom right */}
          <FloatingCard className="right-2 sm:right-1 bottom-8 sm:bottom-16 flex-col items-start gap-1 bg-white/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {PATIENT_AVATARS.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={30}
                    height={30}
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-base sm:text-lg font-semibold text-slate-900">
                50K+
              </span>
            </div>
            <span className="text-xs sm:text-sm text-slate-500">
              Happy Patients
            </span>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
}
