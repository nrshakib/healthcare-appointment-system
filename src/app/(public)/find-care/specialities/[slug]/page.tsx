import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Breadcrumbs,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import { GoDotFill, GoChevronDown } from "react-icons/go";

import specialities from "@/utils/specialities";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";
import FaqAccordion from "@/components/Public/SpecialitiesPage/FaqAccordion";

const SPECIALITY_DOCTOR_MAP: Record<string, string[]> = {
  Cardiology: ["Cardiologist"],
  Neurology: ["Neurologist"],
  Pediatrics: ["Pediatrician"],
  Pediatric: ["Pediatrician"],
  "Pediatric Dentistry": ["Pediatric Dentist"],
  Orthopedics: ["Orthopedic Surgeon"],
  "General Medicine": ["General Physician"],
  "General Surgery": ["General Surgeon"],
  "Plastic Surgery": ["Plastic Surgeon"],
  Radiology: ["Radiologist"],
  Dermatology: ["Dermatologist"],
  Psychology: ["Psychiatrist"],
  Gastroenterology: ["Gastroenterologist"],
  Pulmonology: ["Pulmonologist"],
  Nephrology: ["Nephrologist"],
  Urology: ["Urologist"],
  Endocrinology: ["Endocrinologist"],
  Oncology: ["Oncologist"],
  Hematology: ["Hematologist"],
  Neonatology: ["Neonatologist"],
  Geriatrics: ["Geriatrician"],
  ENT: ["ENT Specialist"],
  Dentistry: ["Dentist"],
  "Oral Surgery": ["Oral Surgeon"],
  Anesthesiology: ["Anesthesiologist"],
  "Allergy & Immunology": ["Allergist & Immunologist"],
  "Physical Medicine": ["Physiotherapist"],
  "Nutrition & Dietetics": ["Nutritionist & Dietitian"],
  Physiotherapy: ["Physiotherapist"],
  "Obstetrics & Gynecology": ["Obstetrician & Gynecologist"],
  Ophthalmology: ["Ophthalmologist"],
};

const getMatchedDoctorSpecialities = (specialityName: string) =>
  SPECIALITY_DOCTOR_MAP[specialityName] ?? [specialityName];

type SpecialityDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return specialities.map((speciality) => ({
    slug: speciality.slug,
  }));
}

export async function generateMetadata({ params }: SpecialityDetailsProps) {
  const { slug } = await params;
  const speciality = specialities.find((item) => item.slug === slug);

  if (!speciality) {
    return {
      title: "Speciality Not Found",
    };
  }

  return {
    title: `${speciality.name} | Find Care`,
    description: speciality.details,
  };
}

export default async function SpecialityDetails({
  params,
}: SpecialityDetailsProps) {
  const { slug } = await params;
  const speciality = specialities.find((item) => item.slug === slug);

  if (!speciality) {
    notFound();
  }

  const Icon = speciality.Icon;
  const matchedSpecialities = getMatchedDoctorSpecialities(speciality.name);
  const specialityDoctors = doctors
    .filter((doctor) => matchedSpecialities.includes(doctor.speciality))
    .slice(0, 4);
  const totalSpecialityDoctors = doctors.filter((doctor) =>
    matchedSpecialities.includes(doctor.speciality),
  ).length;
  // const doctorsHref = `/find-care/doctors?speciality=${encodeURIComponent(
  //   speciality.name,
  // )}`;

  return (
    <main className="bg-white">
      <section className={`${speciality.color.bgClass}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 lg:gap-10 sm:px-6 lg:px-8 sm:py-10 lg:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-2xl">
            <Breadcrumbs
              separator=">"
              aria-label="breadcrumb"
              sx={{
                fontSize: { xs: "12px", sm: "12px", md: "14px" },
                mb: { xs: 1.5, sm: 2, lg: 3 },
                flexWrap: "wrap",
              }}
            >
              <Link href="/">Home</Link>
              <p>Find Care</p>
              <Link href="/find-care/specialities" className="font-medium">
                Specialities
              </Link>
              <p className={`font-medium ${speciality.color.textClass}`}>
                {speciality.name}
              </p>
            </Breadcrumbs>

            {/* <Link
              href="/find-care/specialities"
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-[#047857] sm:mb-5 sm:text-sm"
            >
              <FaArrowLeft className="size-3 shrink-0" />
              Back to Specialities
            </Link> */}

            <div className="flex flex-col gap-2 sm:flex-row items-center sm:gap-4">
              <div
                className={`flex size-12 sm:size-16 lg:size-32 shrink-0 items-center justify-center rounded-full bg-white  ${speciality.color.textClass}`}
              >
                <Icon className="size-8 sm:size-10 lg:size-20" />
              </div>
              <div className="min-w-0 text-center sm:text-start">
                <h1 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-4xl ">
                  {speciality.name}
                </h1>
                <p className="mt-1 lg:mt-3 max-w-xl text-sm lg:text-base leading-4 sm:leading-6 text-black">
                  {speciality.details}. Find verified doctors, and book care
                  with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-50 shrink-0 self-center sm:max-w-60 lg:w-auto lg:self-auto">
            <Image
              src={speciality.image}
              alt={speciality.name}
              width={220}
              height={48}
              loading="eager"
              priority
              className="h-auto w-full object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:max-w-[75%] mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* left */}
        <div className="col-span-2 border border-gray-200 rounded-lg p-3 sm:p-5">
          <div className="space-y-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">
              About{" "}
              <span className={`${speciality.color.textClass}`}>
                {speciality.name}
              </span>
            </p>
            <p className="text-xs lg:text-base lg:w-[90%] leading-5 text-stone-500">
              {speciality.description}
            </p>
          </div>

          {/* treatments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-4 mt-6">
            {speciality.treatments.map((treatment, index) => {
              const TreatmentIcon = treatment.icon;
              return (
                <div
                  key={index}
                  className="flex items-center sm:items-start gap-2 xl:gap-3 rounded-lg border border-gray-100 p-2 lg:p-3 shadow-lg"
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${speciality.color.bgClass} ${speciality.color.textClass}`}
                  >
                    <TreatmentIcon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm lg:text-base font-semibold text-slate-900">
                      {treatment.title}
                    </p>
                    <p className="text-xs xl:text-sm text-slate-500">
                      {treatment.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Divider
            sx={{
              my: "20px",
            }}
          />

          {/* common conditions */}
          <div className="mt-6">
            <p className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Common Conditions We Treat
            </p>
            <div className="grid grid-cols-2 gap-1 sm:gap-3">
              {speciality.commonConditions.map((condition, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 sm:gap-2 rounded-lg border border-gray-100 bg-gray-50 px-1 sm:px-3 py-2"
                  >
                    <span className="size-1 sm:size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-[11px] sm:text-sm text-slate-700 font-medium">
                      {condition}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Divider
            sx={{
              my: "20px",
            }}
          />

          {/* book appointment */}
          <div className="mt-6 overflow-hidden rounded-xl bg-linear-to-r from-[#e8f9f0] to-[#f0fdf4] px-3 sm:px-4 py-5 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row items-center sm:justify-between">
              <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
                <p className="text-sm lg:text-xl font-bold text-primary">
                  Need help with your {speciality.name}?
                </p>
                <p className="text-xs lg:text-sm text-slate-600">
                  Consult with our {speciality.name} expert today.
                </p>
                <Link
                  href={`/find-care/doctors?speciality=${encodeURIComponent(
                    speciality.name,
                  )}`}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-[#085d4c] to-[#12a762] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-[#065f46] hover:to-[#059669] rounded-lg w-fit"
                >
                  Book an Appointment
                </Link>
              </div>
              <div className="shrink-0 hidden sm:block">
                <Image
                  src="/images/medicare-logo2.png"
                  alt="Medicare Logo"
                  width={180}
                  height={180}
                  className="h-auto w-28 sm:w-36 lg:w-44 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* right */}

        <div className="col-span-1 space-y-3 w-full">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3 gap-2">
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  Top {matchedSpecialities[0]}
                </p>
                {totalSpecialityDoctors > 4 && (
                  <Link
                    href={`/find-care/doctors?speciality=${encodeURIComponent(
                      speciality.name,
                    )}`}
                    className="shrink-0 text-center text-xs sm:text-sm font-medium text-primary hover:text-[#047857]"
                  >
                    View All
                  </Link>
                )}
              </div>
              {specialityDoctors.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No doctors available for this speciality.
                </p>
              ) : (
                <div className="space-y-3">
                  {specialityDoctors.map((doctor) => (
                    <Link
                      key={doctor.id}
                      href={`/find-care/doctors/${slugify(doctor.name)}`}
                      className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-100 p-2 transition hover:border-primary shadow-sm hover:shadow-lg"
                    >
                      <div className="size-14 xs:size-16 sm:size-18 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {doctor.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {doctor.degree}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 gap-y-1 mt-1 text-xs text-gray-600">
                          <p className="flex items-center gap-0.5 sm:gap-1 font-medium text-amber-600">
                            <FaStar />
                            <span>{doctor.rating}</span>
                            <span className="text-gray-500">
                              ({doctor.reviewCount}reviews)
                            </span>
                          </p>
                          <span className="">
                            <GoDotFill className="text-primary" />
                          </span>
                          <p className="font-medium">
                            {doctor.experience} Years Exp.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <p className="text-base sm:text-lg font-bold text-slate-900 mb-3 px-3 sm:px-4 pt-3 sm:pt-4">
              Frequently Asked Questions
            </p>
            <FaqAccordion faqs={speciality.faqs} />
          </div>
        </div>
      </section>
    </main>
  );
}
