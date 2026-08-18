import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Divider } from "@mui/material";
import { FaArrowLeft, FaUserDoctor } from "react-icons/fa6";
import { LuCalendarHeart, LuShieldCheck } from "react-icons/lu";

import specialities from "@/utils/specialities";
import Image from "next/image";

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
  // const doctorsHref = `/find-care/doctors?speciality=${encodeURIComponent(
  //   speciality.name,
  // )}`;

  return (
    <main className="bg-white">
      <section className={`${speciality.color.bgClass}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8 lg:py-16">
          <div className="w-full max-w-2xl">
            <Breadcrumbs
              separator=">"
              aria-label="breadcrumb"
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                mb: { xs: 1.5, sm: 2, lg: 3 },
                flexWrap: "wrap",
              }}
            >
              <Link href="/">Home</Link>
              <p>Find Care</p>
              <Link href="/find-care/specialities">Specialities</Link>
              <p className={`font-medium ${speciality.color.textClass}`}>
                {speciality.name}
              </p>
            </Breadcrumbs>

            <Link
              href="/find-care/specialities"
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-[#047857] sm:mb-5 sm:text-sm"
            >
              <FaArrowLeft className="size-3 shrink-0" />
              Back to Specialities
            </Link>

            <div className="flex flex-col gap-2 sm:flex-row items-center sm:gap-4">
              <div
                className={`flex size-16 shrink-0 items-center justify-center rounded-full bg-white sm:size-24 lg:size-32 ${speciality.color.textClass}`}
              >
                <Icon className="size-10 sm:size-16 lg:size-20" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-4xl">
                  {speciality.name}
                </h1>
                <p className="mt-1 max-w-xl text-sm leading-4 sm:leading-6 text-slate-600 lg:mt-3 lg:text-base">
                  {speciality.details}. Find verified doctors, and book care
                  with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-55 shrink-0 self-center sm:max-w-65 lg:w-auto lg:self-auto">
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

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:max-w-[80%] mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* left */}
        <div className="col-span-2 border border-gray-200 rounded-lg p-3 sm:p-5">
          <div className="space-y-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">
              About <span className="text-primary">{speciality.name}</span>
            </p>
            <p className="text-sm lg:text-base lg:w-[90%] leading-5 text-stone-500">
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
                  className="flex items-center sm:items-start gap-2 xl:gap-3 rounded-lg border border-gray-50 p-1 sm:p-2 lg:p-3"
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

          {/* book appointment */}
          <div className="mt-6 overflow-hidden rounded-xl bg-linear-to-r from-[#e8f9f0] to-[#f0fdf4] px-3 sm:px-4 py-5 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base lg:text-xl font-bold text-primary">
                  Need help with your {speciality.name}?
                </p>
                <p className="text-xs lg:text-sm text-slate-600">
                  Consult with our {speciality.name} expert today.
                </p>
                <Link
                  href={`/find-care/doctors?speciality=${encodeURIComponent(
                    speciality.name,
                  )}`}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-[#085d4c] to-[#12a762] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-[#065f46] hover:to-[#059669] rounded-lg"
                >
                  Book an Appointment
                </Link>
              </div>
              <div className="shrink-0">
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
        <div className="col-span-1 space-y-3">
          <div className="border border-gray-200 rounded-lg">Top Right</div>
          <div className="border border-gray-200 rounded-lg">Middle Right</div>
          <div className="border border-gray-200 rounded-lg">Bottom Right </div>
        </div>
      </section>
    </main>
  );
}
