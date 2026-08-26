import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiClipboardDocumentList,
  HiHome,
  HiUserCircle,
  HiDocumentText,
} from "react-icons/hi2";

type DashboardRole = "patient";

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
  patient: {
    title: "Patient Portal",
    eyebrow: "Personal care hub",
    navItems: [
      { label: "Overview", href: "/patient-dashboard", icon: HiHome },
      {
        label: "Appointments",
        href: "/patient-dashboard/appointments",
        icon: HiCalendarDays,
      },
      {
        label: "Doctors",
        href: "/patient-dashboard/doctors",
        icon: HiUserCircle,
      },
      {
        label: "Prescriptions",
        href: "/patient-dashboard/prescriptions",
        icon: HiDocumentText,
      },
      {
        label: "Medical Records",
        href: "/patient-dashboard/medical-records",
        icon: HiClipboardDocumentList,
      },
      {
        label: "Messages",
        href: "/patient-dashboard/messages",
        icon: HiChatBubbleLeftRight,
      },
      {
        label: "Payments",
        href: "/patient-dashboard/payments",
        icon: HiChatBubbleLeftRight,
      },
      {
        label: "Profile",
        href: "/patient-dashboard/profile",
        icon: HiUserCircle,
      },
      {
        label: "Settings",
        href: "/patient-dashboard/settings",
        icon: HiCog6Tooth,
      },
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
    <div className="min-h-screen bg-gray-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        <Link
          href="/"
          className="flex items-center justify-center h-10 w-40 mx-auto"
          aria-label="MediCare Home"
        >
          <Image
            src="/images/medicare-logo2.png"
            alt="MediCare Logo"
            width={150}
            height={52}
            priority
            className="h-auto w-auto"
          />
        </Link>
        <Divider
          sx={{
            my: "10px",
          }}
        />

        <nav
          className="flex flex-1 flex-col gap-1"
          aria-label={`${config.title} navigation`}
        >
          {config.navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-primary"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-white bg-primary transition hover:border-primary hover:text-primary hover:bg-white"
          >
            Go to Website
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
          >
            Sign out
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-700">
                {config.eyebrow}
              </p>
              {/* <h2 className="text-lg font-bold text-slate-950">
                {config.title}
              </h2> */}
            </div>
            {/* <Link
              href="/"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-[#056d59]"
            >
              Public Site
            </Link> */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-1">
              {/* <p className="text-xs font-semibold uppercase text-emerald-700">
                {config.eyebrow}
              </p> */}
              <h1 className="text-lg font-bold text-slate-950">
                {config.title}
              </h1>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-65px)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
