import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
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
                mb: { xs: 1.5, sm: 2, md: 3 },
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
                  {speciality.details}. Find verified doctors, compare
                  appointment options, and book care with confidence.
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

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 sm:py-12 lg:px-8">
        {[
          {
            icon: <FaUserDoctor />,
            title: "Specialist Care",
            text: "Browse doctors focused on this speciality.",
          },
          {
            icon: <LuCalendarHeart />,
            title: "Easy Appointments",
            text: "Choose an appointment time that fits your day.",
          },
          {
            icon: <LuShieldCheck />,
            title: "Verified Providers",
            text: "Book with trusted healthcare professionals.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="mb-3 inline-flex rounded-full bg-emerald-50 p-3 text-xl text-primary">
              {item.icon}
            </p>
            <h2 className="text-base font-semibold text-slate-950">
              {item.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
