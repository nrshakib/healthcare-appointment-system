import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, Button } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import {
  FaCalendarCheck,
  FaCommentMedical,
  FaRegBookmark,
  FaArrowLeft,
} from "react-icons/fa";

import { FaBookMedical } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";

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
      <div className="bg-[#eaf6f4] py-3">
        <div className="mx-auto max-w-[95%] px-4 xl:max-w-[80%] xl:px-0">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "11px", sm: "14px" },
              py: { xs: 2, sm: 3 },
              "& .MuiBreadcrumbs-separator": {
                mx: { xs: 0.5, sm: 1 },
              },
              "& p, & a": {
                fontSize: "inherit",
              },
            }}
          >
            <p>Home</p>
            <p>Find Care</p>
            <p>Doctors</p>
            <p className="text-primary font-medium">{doctor.name}</p>
          </Breadcrumbs>
        </div>
      </div>

      <div className="mx-auto max-w-[95%] gap-6 py-8 xl:max-w-[80%]">
        {/* info section */}
        <div className="grid grid-cols-1 gap-5 rounded-xl border border-gray-200 shadow-lg lg:grid-cols-4">
          <div className="col-span-1 flex flex-col gap-2 sm:gap-6 rounded-xl border-gray-100 p-2 sm:p-5 sm:flex-row  lg:col-span-3 lg:border-r">
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
                <p className="text-2xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
                  {doctor.name}
                </p>
                <p className="mt-2 text-base font-medium text-primary sm:text-lg">
                  {doctor.speciality}
                </p>
              </div>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex flex-col items-center gap-2 sm:items-start">
                  <p className="flex items-center gap-2">
                    <FaBookMedical className="shrink-0 text-primary" />
                    <span>{doctor.degree}</span>
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
                    ({doctor.reviewCount} reviews)
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
                  <FaMapMarkerAlt className="shrink-0 text-primary" />
                  <span className="text-sm font-medium text-blue-900">
                    {doctor.location}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 h-fit rounded-xl border-t border-gray-100 p-2 md:p-3 xl:p-5 lg:border-t-0">
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-end justify-center gap-1 xl:gap-3 border-b border-gray-100 pb-2">
                <span className="text-2xl xl:text-3xl font-bold text-gray-900">
                  ৳{doctor.consultationFee}
                </span>
                <span className="text-sm xl:text-base">/ Consultation Fee</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 py-2 xl:py-4 sm:items-stretch sm:gap-3">
              <Button
                startIcon={<FaCalendarCheck size={16} />}
                sx={{
                  width: { xs: "70%", sm: "50%", md: "100%" },
                  mx: { xs: "auto", md: 0 },
                  textTransform: "none",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(135deg, #047857 0%, #10B981 100%)",
                  color: "#fff",
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 600,
                  px: 2.5,
                  py: 1.5,
                  boxShadow: 1,
                  transition: "all 0.2s ease",
                  "& .MuiButton-startIcon": {
                    mr: 1,
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    boxShadow: 3,
                  },
                  "&:active": {
                    background:
                      "linear-gradient(135deg, #047857 0%, #065f46 100%)",
                  },
                }}
              >
                Book Appointment
              </Button>

              <Button
                startIcon={<FaCommentMedical size={16} />}
                variant="outlined"
                sx={{
                  width: { xs: "70%", sm: "50%", md: "100%" },
                  mx: { xs: "auto", md: 0 },
                  textTransform: "none",
                  borderRadius: "20px",
                  borderWidth: "2px",
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
                }}
              >
                Message Doctor
              </Button>

              <Button
                startIcon={<FaRegBookmark size={16} />}
                variant="outlined"
                sx={{
                  width: { xs: "70%", sm: "50%", md: "100%" },
                  mx: { xs: "auto", md: 0 },
                  textTransform: "none",
                  borderRadius: "20px",
                  borderWidth: "2px",
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
                  },
                }}
              >
                Save Doctor
              </Button>

              <Link
                href="/find-care/doctors"
                className="flex items-center justify-center gap-1.5 w-[70%] sm:w-1/2 lg:w-full border rounded-2xl mx-auto py-3 sm:py-4 text-center text-xs font-medium text-primary transition-colors duration-200 hover:text-[#059669] hover:bg-[#edfcf7] hover:underline sm:text-sm"
              >
                <FaArrowLeft size={12} />
                Back to doctors
              </Link>
            </div>
          </div>
        </div>
        {/* details section */}
        <section className="lg:col-span-2">
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xl font-semibold text-gray-900">About</p>
              <p className="mt-2 leading-7 text-gray-600">{doctor.about}</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-900">Education</p>
              <p className="mt-2 leading-7 text-gray-600">{doctor.education}</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-900">Services</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {doctor.services.map((service) => (
                  <div
                    key={service}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
