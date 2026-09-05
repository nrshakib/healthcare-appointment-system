import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, Button, Divider } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import {
  FaCalendarCheck,
  FaRegBookmark,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaRegClock,
} from "react-icons/fa";

import { FaRegMessage } from "react-icons/fa6";

import { FaBookMedical } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";
import { TbHome2Filled } from "react-icons/tb";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: slugify(doctor.name),
  }));
}

export default async function DoctorDetails({ params }: PageProps) {
  const { slug } = await params;
  const doctor = doctors.find((item) => slugify(item.name) === slug);

  if (!doctor) {
    notFound();
  }

  const acceptsOnline = doctor.consultationType
    ?.toLowerCase()
    .includes("online");
  const acceptsInPerson = doctor.consultationType
    ?.toLowerCase()
    .includes("person");

  return (
    <div>
      <div className="doctorsHeroBg py-3">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[80%] xl:px-0">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "11px", sm: "14px" },
              py: { xs: 2, sm: 3 },
              color: "var(--doctors-breadcrumb-text)",
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
                color: "var(--text-subtle)",
                opacity: 0.8,
              },
              "& .MuiBreadcrumbs-ol": {
                alignItems: "center",
              },
              "& p, & span, & a": {
                fontSize: "inherit",
              },
            }}
          >
            <Link
              href="/"
              className="doctors-breadcrumb-home hover:text-emerald-600 transition-colors"
            >
              <TbHome2Filled className="text-lg" />
            </Link>
            <p className="doctors-breadcrumb-item">Find Care</p>
            <p className="doctors-breadcrumb-item">Doctors</p>
            <p className="doctors-breadcrumb-active font-medium">
              {doctor.name}
            </p>
          </Breadcrumbs>
        </div>
      </div>

      <div className="doctors-bottom-section">
        <div className="mx-auto max-w-[95%] gap-6 py-8 xl:max-w-[80%] space-y-10">
          {/* info section */}
          <section className="doctors-card grid grid-cols-1 gap-5 rounded-xl lg:grid-cols-4">
            <div className="col-span-1 flex flex-col gap-2 sm:gap-6 rounded-sm border-gray-100 p-2 sm:p-5 sm:flex-row  lg:col-span-3 lg:border-r">
              <div className="mx-auto h-60 sm:h-72 md:h-80 w-full max-w-55 sm:w-auto sm:max-w-none shrink-0 overflow-hidden rounded-xl sm:mx-0 ">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={260}
                  height={320}
                  sizes="(max-width: 640px) 220px, 260px"
                  className="h-full w-full object-cover sm:w-auto"
                  priority
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between py-2 text-center sm:text-left">
                <div>
                  <p className="doctors-heading-text text-2xl font-semibold sm:text-2xl md:text-3xl">
                    {doctor.name}
                  </p>
                  <p className="doctors-speciality-text mt-2 text-base font-medium sm:text-lg">
                    {doctor.speciality}
                  </p>
                </div>

                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex flex-col items-center gap-2 sm:items-start">
                    <p className="flex items-center gap-2">
                      <FaBookMedical className="doctors-breadcrumb-icon shrink-0" />
                      <span className="doctors-info-text">{doctor.degree}</span>
                    </p>
                    <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-primary sm:text-sm">
                      {doctor.experience} Years Experience
                    </Badge>
                  </div>
                  <p className="flex items-center justify-center gap-2 sm:justify-start">
                    <AiFillStar className="shrink-0 text-lg text-amber-400" />
                    <span>
                      <strong className="mr-2 text-amber-600">
                        {doctor.rating}
                      </strong>{" "}
                      <span className="doctors-info-text">
                        ({doctor.reviewCount} reviews)
                      </span>
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {acceptsOnline && (
                    <Badge className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 sm:text-sm">
                      <HiOutlineVideoCamera />
                      Video Consultation
                    </Badge>
                  )}
                  {acceptsInPerson && (
                    <Badge className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 sm:text-sm">
                      <FiUserCheck />
                      In-person
                    </Badge>
                  )}
                </div>

                <div className="mt-4 sm:mt-3">
                  <p className="flex items-center justify-center gap-2 sm:justify-start">
                    <FaMapMarkerAlt className="shrink-0 doctors-breadcrumb-icon" />
                    <span className="text-sm font-medium doctors-location-text">
                      {doctor.location}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 h-fit rounded-xl border-t border-gray-100 p-2 md:p-3 xl:p-5 lg:border-t-0">
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-end justify-center gap-1 xl:gap-3 border-b border-gray-100 pb-2">
                  <span className="doctors-price-text text-2xl xl:text-3xl font-bold">
                    ৳{doctor.consultationFee}
                  </span>
                  <span className="doctors-price-muted text-sm xl:text-base">
                    / Consultation Fee
                  </span>
                </div>
              </div>

              {/* buttons section */}
              <div className="flex flex-col items-center gap-3 py-2 xl:py-4 sm:items-stretch sm:gap-3">
                <Link
                  href={`/find-care/book-appointment?doctor=${slugify(doctor.name)}`}
                  className="flex items-center justify-center gap-2 w-[70%] sm:w-1/2 md:w-full mx-auto md:mx-0 
                rounded-xl text-white font-semibold text-xs sm:text-sm px-5 py-3 shadow-sm transition-all
                duration-200 ease-in-out bg-linear-to-br from-[#047857] to-[#10B981] hover:from-[#059669]
                 hover:to-[#047857] hover:shadow-lg active:from-[#047857] active:to-[#065f46]"
                >
                  <FaCalendarCheck size={16} />
                  Book Appointment
                </Link>

                <Button
                  startIcon={<FaRegMessage size={16} />}
                  variant="outlined"
                  className="doctor-message-btn"
                  sx={{
                    width: { xs: "70%", sm: "50%", md: "100%" },
                    mx: { xs: "auto", md: 0 },
                    textTransform: "none",
                    borderRadius: "20px",
                    borderWidth: "1px",
                    borderColor: "#10B981",
                    color: "#10B981",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.5,
                    transition: "all 0.2s ease",
                    "& .MuiButton-startIcon": {
                      mr: 1,
                    },
                    "&:hover": {
                      borderWidth: "2px",
                      borderColor: "#059669",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                      color: "#059669",
                    },
                    ".dark &": {
                      borderColor: "#34d399",
                      color: "#34d399",
                      "&:hover": {
                        borderColor: "#6ee7b7",
                        color: "#6ee7b7",
                        backgroundColor: "rgba(52, 211, 153, 0.1)",
                      },
                    },
                  }}
                >
                  Message Doctor
                </Button>

                <Button
                  startIcon={<FaRegBookmark size={16} />}
                  variant="outlined"
                  disabled
                  className="doctor-save-btn"
                  sx={{
                    width: { xs: "70%", sm: "50%", md: "100%" },
                    mx: { xs: "auto", md: 0 },
                    textTransform: "none",
                    borderRadius: "20px",
                    borderWidth: "1px",
                    borderColor: "#4B5563",
                    color: "#4B5563",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.5,
                    transition: "all 0.2s ease",
                    "& .MuiButton-startIcon": {
                      mr: 1,
                    },
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                      color: "#1F2937",
                      ".dark &": {
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        color: "#f1f5f9",
                        borderColor: "#64748b",
                      },
                    },
                    "&.Mui-disabled": {
                      borderColor: "#4B5563",
                      color: "#4B5563",
                      opacity: 0.6,
                      ".dark &": {
                        borderColor: "#334155",
                        color: "#64748b",
                        opacity: 0.7,
                      },
                    },
                  }}
                >
                  Save Doctor
                </Button>

                <Link
                  href="/find-care/doctors"
                  className="doctor-back-link flex items-center justify-center gap-1.5 w-[70%] sm:w-1/2 lg:w-full border rounded-2xl mx-auto py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-primary transition-colors duration-200 hover:text-[#059669] hover:bg-[#edfcf7] hover:underline"
                >
                  <FaArrowLeft size={12} />
                  Back to doctors
                </Link>
              </div>
            </div>
          </section>
          {/* details section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* left section */}
            <div className="doctors-card col-span-2 space-y-6 p-5 rounded-xl">
              <div>
                <p className="text-lg sm:text-xl font-semibold text-heading">
                  About
                </p>
                <p className="mt-2 doctors-info-text lg:w-[90%] text-sm sm:text-base">
                  {doctor.about}
                </p>
              </div>
              <Divider
                sx={{
                  my: "20px",
                }}
              />

              <div>
                <p className="text-lg sm:text-xl font-semibold text-heading">
                  Education
                </p>
                <div className="mt-4">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="doctor-services w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"></div>
                        {index < doctor.education.length - 1 && (
                          <div className="w-px h-8 bg-gray-200 mt-1"></div>
                        )}
                      </div>
                      <div
                        className={`text-sm sm:text-base doctors-info-text ${
                          index < doctor.education.length - 1 ? "pb-4" : ""
                        }`}
                      >
                        <span className="font-semibold">{edu.degree}</span> –{" "}
                        <span className="italic font-medium">
                          {edu.institution}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-heading">Services</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {doctor.services.map((service) => (
                    <div
                      key={service}
                      className="doctor-services rounded-lg px-4 py-1 sm:py-3 text-sm font-medium "
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="doctors-card col-span-1 space-y-5 rounded-xl p-4 sm:space-y-6 sm:p-5">
              <div>
                <p className="text-heading mb-2 text-base font-semibold sm:mb-3 sm:text-lg">
                  Available Days
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {doctor.availableDays.map((day) => (
                    <span
                      key={day}
                      className="rounded-lg border border-primary/20 bg-[#e9fcf9] px-2.5 py-1 text-xs font-medium text-primary sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <Divider
                sx={{
                  my: { xs: "16px", sm: "20px" },
                }}
              />

              <div>
                <p className="mb-2 text-base font-semibold text-heading sm:mb-3 sm:text-lg">
                  Available Slots
                </p>
                <div className="grid grid-cols-2 gap-2 xs:grid-cols-2 sm:flex sm:flex-col sm:gap-2">
                  {doctor.timeslots.map((slot) => (
                    <div
                      key={slot}
                      className="flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-[#d1f0eb] px-2.5 py-2 text-xs font-medium text-gray-700 sm:w-fit sm:justify-start sm:px-3 sm:text-sm"
                    >
                      <FaRegClock className="shrink-0 text-xs text-primary sm:text-sm" />
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
