import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs, Divider } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

import specialities from "@/utils/specialities";
import doctors from "@/utils/doctors";
import { slugify } from "@/utils/slugify";
import FaqAccordion from "@/components/Public/SpecialitiesPage/FaqAccordion";
import { TbHome2Filled } from "react-icons/tb";

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
    <main className="bg-white overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className={`${speciality.color.bgClass}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8 lg:py-16">
          <div className="w-full max-w-2xl">
            <Breadcrumbs
              separator=">"
              aria-label="breadcrumb"
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
                mb: { xs: 1.5, sm: 2, lg: 3 },
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
                display: "flex",
              }}
            >
              <Link
                href="/"
                className="text-primary hover:text-emerald-600 transition-colors"
              >
                <TbHome2Filled className="text-lg" />
              </Link>
              <p>Find Care</p>
              <Link href="/find-care/specialities" className="font-medium">
                Specialities
              </Link>
              <p className={`font-medium ${speciality.color.textClass}`}>
                {speciality.name}
              </p>
            </Breadcrumbs>

            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-start">
              <div
                className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-white sm:size-16 lg:size-32 ${speciality.color.textClass}`}
              >
                <Icon className="size-8 sm:size-10 lg:size-20" />
              </div>
              <div className="min-w-0 text-center sm:text-start">
                <h1 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-4xl">
                  {speciality.name}
                </h1>
                <p className="mt-1 max-w-xl text-sm leading-5 text-black sm:leading-6 lg:mt-3 lg:text-base">
                  {speciality.details}. Find verified doctors, and book care
                  with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-40 shrink-0 sm:max-w-60 lg:mx-0 lg:w-auto lg:self-auto">
            <Image
              src={speciality.image}
              alt={speciality.name}
              width={220}
              height={48}
              loading="eager"
              priority
              className="h-auto w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:gap-3 xl:gap-5 px-3 py-4 sm:px-6 lg:px-3 xl:px-6 sm:py-8 lg:grid-cols-3 xl:max-w-[75%]">
        {/* left */}
        <div className="col-span-1 rounded-lg border border-gray-200 p-3 sm:p-5 lg:col-span-2">
          <div className="space-y-2">
            <p className="text-lg font-bold sm:text-xl lg:text-2xl">
              About{" "}
              <span className={`${speciality.color.textClass}`}>
                {speciality.name}
              </span>
            </p>
            <p className="text-xs leading-5 text-stone-500 lg:w-[90%] lg:text-base">
              {speciality.description}
            </p>
          </div>

          {/* treatments */}
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:gap-4">
            {speciality.treatments.map((treatment, index) => {
              const TreatmentIcon = treatment.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-lg border border-gray-100 p-2 shadow-lg sm:items-start xl:gap-3 lg:p-3"
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${speciality.color.bgClass} ${speciality.color.textClass}`}
                  >
                    <TreatmentIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 lg:text-base">
                      {treatment.title}
                    </p>
                    <p className="text-xs text-slate-500 xl:text-sm">
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
            <p className="mb-3 text-base font-bold text-slate-900 sm:text-lg">
              Common Conditions We Treat
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {speciality.commonConditions.map((condition, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-2 py-2 sm:gap-2 sm:px-3"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-xs font-medium text-slate-700 sm:text-sm">
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
          <div className="mt-6 overflow-hidden rounded-xl bg-linear-to-r from-[#e8f9f0] to-[#f0fdf4] px-3 py-5 sm:px-4 sm:py-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:gap-4 sm:text-start">
                <p className="text-sm font-bold text-primary sm:text-base lg:text-xl">
                  Need help with your {speciality.name}?
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">
                  Consult with our {speciality.name} expert today.
                </p>
                <Link
                  href={`/find-care/doctors?speciality=${encodeURIComponent(
                    speciality.name,
                  )}`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-linear-to-r from-[#085d4c] to-[#12a762] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-[#065f46] hover:to-[#059669]"
                >
                  Book an Appointment
                </Link>
              </div>
              <div className="hidden shrink-0 sm:block">
                <Image
                  src="/images/medicare-logo2.png"
                  alt="Medicare Logo"
                  width={180}
                  height={180}
                  className="h-auto w-28 opacity-90 sm:w-36 lg:w-44"
                />
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="col-span-1 w-full space-y-3">
          <div className="rounded-lg border border-gray-200">
            <div className="p-3 sm:p-4 lg:p-2 xl:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  Top {matchedSpecialities[0]}
                </p>
                {totalSpecialityDoctors > 4 && (
                  <Link
                    href={`/find-care/doctors?speciality=${encodeURIComponent(
                      speciality.name,
                    )}`}
                    className="shrink-0 whitespace-nowrap text-center text-xs font-medium text-primary hover:text-[#047857] sm:text-sm"
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
                      className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 shadow-sm transition hover:border-primary hover:shadow-lg sm:gap-3"
                    >
                      <div className="size-14 shrink-0 overflow-hidden rounded-full bg-gray-100 sm:size-20 lg:size-18">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {doctor.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {doctor.degree}
                        </p>
                        <div className="mt-1 flex flex-col min-[400px]:flex-row items-start min-[400px]:items-center gap-x-2 gap-y-1 text-xs text-gray-600 ">
                          <p className="flex items-center gap-1 font-medium text-amber-600">
                            <FaStar />
                            <span>{doctor.rating}</span>
                            <span className="text-gray-500">
                              ({doctor.reviewCount} reviews)
                            </span>
                          </p>
                          <span className="hidden min-[400px]:block">
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

          <div className="rounded-lg border border-gray-200">
            <p className="mb-3 px-3 pt-3 text-base font-bold text-slate-900 sm:px-4 sm:pt-4 sm:text-lg">
              Frequently Asked Questions
            </p>
            <FaqAccordion faqs={speciality.faqs} />
          </div>
        </div>
      </section>
    </main>
  );
}
