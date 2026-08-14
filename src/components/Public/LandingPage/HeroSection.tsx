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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { motion } from "framer-motion";

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

const TYPEWRITER_TEXT = "Your Health, Our Priority";

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
        "absolute flex items-center gap-2 xl:gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-3 py-1 sm:px-2 sm:py-2 lg:px-3 shadow-lg border border-white/50 " +
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
  const [typewriterLength, setTypewriterLength] = useState(0);

  useEffect(() => {
    const typingDelay = typewriterLength === TYPEWRITER_TEXT.length ? 1400 : 70;

    const timeout = window.setTimeout(() => {
      setTypewriterLength((currentLength) =>
        currentLength === TYPEWRITER_TEXT.length ? 0 : currentLength + 1
      );
    }, typingDelay);

    return () => window.clearTimeout(timeout);
  }, [typewriterLength]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (doctor) params.set("doctor", doctor);
    if (location) params.set("location", location);
    if (date) params.set("date", date.format("DD/MM/YYYY"));
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50">
      <div className="px-4 sm:px-6 md:px-10 lg:px-1 pt-8 lg:py-2 sm:pt-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 overflow-hidden">
        {/* left section */}
        <div className="w-full lg:w-3/5 lg:pl-5 xl:pl-20 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-3 sm:gap-4 items-center lg:items-start">
            <motion.p
              className="text-primary bg-primary/10 backdrop-blur-md border border-primary/20 shadow-sm w-fit px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
              aria-label={TYPEWRITER_TEXT}
            >
              <span aria-hidden="true">
                {TYPEWRITER_TEXT.slice(0, typewriterLength).replace(
                  / /g,
                  "\u00A0"
                )}
              </span>
              <motion.span
                className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-primary sm:h-4"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                aria-hidden="true"
              />
            </motion.p>
            <p className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold w-full lg:w-[90%] xl:w-[85%] leading-[1.15] sm:leading-[1.1]">
              Quality care for a{" "}
              <span className="text-primary">healthier you</span>
            </p>
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg w-full lg:w-[90%] xl:w-[80%]">
              Find trusted doctors, book appointments, and manage your health
              anytime, anywhere.
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-6 w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-2xl shadow-sm p-4 mt-8 w-full">
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
              <div className="flex items-center gap-3 flex-1 cursor-pointer pb-1 sm:pb-0 min-w-0">
                <FaCalendarAlt
                  className="text-[#10B981] text-base lg:text-lg shrink-0"
                  onClick={() => setOpenDatePicker(true)}
                />
                <div className="flex-1 w-full min-w-0 text-left">
                  <p
                    className="text-gray-600 text-xs sm:text-sm font-semibold"
                    onClick={() => setOpenDatePicker(true)}
                  >
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
                                  fontSize: "0.8rem",
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
                                fontSize: "0.8rem",
                              },
                              "& .MuiPickersSectionList-root": {
                                fontSize: "0.8rem",
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
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: "12px",
                  padding: "14px 20px",
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

          {/*Specs Text */}
          <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center lg:justify-items-start gap-x-3 xs:gap-x-4 gap-y-2.5 xs:gap-y-3">
            <div className="flex items-center gap-2">
              <p className="text-lg bg-gray-200 rounded-full p-1">
                <LuHeartHandshake className="text-primary" />
              </p>
              <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                Verified Doctors
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg bg-gray-200 rounded-full p-1">
                <LuCalendarHeart className="text-primary" />
              </p>
              <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                Easy Booking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg bg-gray-200 rounded-full p-1">
                <MdOutlineHealthAndSafety className="text-primary" />
              </p>
              <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                Secure & Private
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg bg-gray-200 rounded-full p-1">
                <FaHandHoldingHeart className="text-primary" />
              </p>
              <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                24/7 Support
              </p>
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="relative w-full lg:w-2/5 min-h-50 sm:min-h-96 lg:min-h-130 max-w-105 sm:max-w-130 xl:max-w-150 shrink-0 flex items-center justify-center mx-auto">
          {/* Background blob */}
          {/* right */}
          <div
            className="pointer-events-none absolute -right-24 sm:-right-32 md:-right-50 top-1/2 h-56 sm:h-96 md:h-100 xl:h-125 w-56 sm:w-96 md:w-100 xl:w-125 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85% )",
            }}
          />
          {/* top-left */}
          <div
            className="pointer-events-none absolute left-0 top-16 sm:top-24 lg:top-2 h-32 sm:h-52 lg:h-60 xl:h-75 w-32 sm:w-52 lg:w-60 xl:w-75 -translate-y-1/2 rounded-full opacity-90 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
            }}
          />
          {/* bottom-center */}
          <div
            className="pointer-events-none absolute left-8 sm:left-16 xl:left-20 top-3/4 size-40 sm:size-60 md:size-80 xl:size-90 -translate-y-1/2 rounded-full blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 60%, transparent 85%)",
            }}
          />
          <div className="relative w-full h-64 sm:h-96 lg:h-130 xl:h-145">
            {/* Doctor image */}
            <div className="absolute bottom-0 left-1/2 h-64 sm:h-95 xl:h-115 w-50 sm:w-70 xl:w-90 -translate-x-1/2 overflow-hidden">
              <Image
                src="/images/HeroDoctor.png"
                alt="Doctor with arms crossed, wearing a white coat and stethoscope"
                width={360}
                height={480}
                className="h-full w-full object-cover object-top"
              />
            </div>
            {/* 24/7 Support — top left */}
            <FloatingCard className="left-[10%] sm:left-2 md:left-12 xl:left-24 top-8 sm:top-16 md:top-28">
              <span className="flex size-5 sm:h-9 sm:w-9 xl:h-11 xl:w-11 items-center justify-center rounded-full bg-emerald-50">
                <FaHeadphones className="h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 text-emerald-600" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm sm:text-base xl:text-lg font-bold text-slate-900">
                  24/7
                </span>
                <span className="block text-[8px] sm:text-xs xl:text-sm text-slate-500">
                  Support
                </span>
              </span>
            </FloatingCard>
            {/* Video Consultation — right middle */}
            <FloatingCard className="right-0 sm:right-2 md:right-6 xl:right-2 top-20 sm:top-36 lg:top-72 xl:top-44">
              <span className="flex size-5 sm:h-9 sm:w-9 xl:h-11 xl:w-11 items-center justify-center rounded-full bg-emerald-50">
                <FaVideo className="h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 text-emerald-600" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs sm:text-base xl:text-lg font-bold text-slate-900">
                  Video
                </span>
                <span className="block text-[8px] sm:text-xs xl:text-sm text-slate-500">
                  Consultation
                </span>
              </span>
            </FloatingCard>
            {/* 50K+ Happy Patients — bottom right */}
            <FloatingCard className="right-0 sm:right-2 md:right-4 xl:right-1 bottom-2 sm:bottom-8 md:bottom-16 flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {PATIENT_AVATARS.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt=""
                      width={30}
                      height={30}
                      className="h-5 w-5 sm:h-6 sm:w-6 xl:h-8 xl:w-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-base xl:text-lg font-semibold text-slate-900">
                  50K+
                </span>
              </div>
              <span className="text-[8px] sm:text-xs xl:text-sm text-slate-500">
                Happy Patients
              </span>
            </FloatingCard>
          </div>
        </div>
      </div>
    </div>
  );
}
