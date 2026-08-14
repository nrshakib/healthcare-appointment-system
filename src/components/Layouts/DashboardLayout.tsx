import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiCalendarDays,
  HiChartBar,
  HiClipboardDocumentList,
  HiHome,
  HiUserCircle,
  HiUsers,
} from "react-icons/hi2";

type DashboardRole = "doctor" | "patient";

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

const roleConfig: Record<
  DashboardRole,
  {
    title: string;
    eyebrow: string;
    navItems: NavItem[];
  }
> = {
  doctor: {
    title: "Doctor Portal",
    eyebrow: "Clinical workspace",
    navItems: [
      { label: "Overview", href: "/doctor", icon: HiHome },
      { label: "Appointments", href: "/doctor/appointments", icon: HiCalendarDays },
      { label: "Patients", href: "/doctor/patients", icon: HiUsers },
      { label: "Reports", href: "/doctor/reports", icon: HiChartBar },
    ],
  },
  patient: {
    title: "Patient Portal",
    eyebrow: "Personal care hub",
    navItems: [
      { label: "Overview", href: "/patient", icon: HiHome },
      { label: "Appointments", href: "/patient/appointments", icon: HiCalendarDays },
      { label: "Records", href: "/patient/records", icon: HiClipboardDocumentList },
      { label: "Profile", href: "/patient/profile", icon: HiUserCircle },
    ],
  },
};

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: DashboardRole;
}) {
  const config = roleConfig[role];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        <Link href="/" className="mb-8 flex items-center" aria-label="MediCare Home">
          <Image
            src="/images/medicare-logo2.png"
            alt="MediCare Logo"
            width={150}
            height={52}
            priority
            className="h-auto w-auto"
          />
        </Link>

        <div className="mb-6 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-emerald-700">
            {config.eyebrow}
          </p>
          <h1 className="mt-1 text-lg font-bold text-slate-950">{config.title}</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-1" aria-label={`${config.title} navigation`}>
          {config.navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-primary"
              >
                <Icon className="size-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/sign-in"
          className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
        >
          Sign out
        </Link>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-700 lg:hidden">
                {config.eyebrow}
              </p>
              <h2 className="text-lg font-bold text-slate-950">{config.title}</h2>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-[#056d59]"
            >
              Public Site
            </Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-65px)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
