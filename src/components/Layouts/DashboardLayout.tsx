"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider } from "@mui/material";
import type { IconType } from "react-icons";
import {
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiClipboardDocumentList,
  HiHome,
  HiUserCircle,
  HiDocumentText,
  HiBars3,
  HiXMark,
  HiArrowTopRightOnSquare,
  HiArrowRightOnRectangle,
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
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar automatically on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine active nav item
  const isLinkActive = (href: string) => {
    if (href === "/patient-dashboard") {
      return pathname === "/patient-dashboard";
    }
    return pathname.startsWith(href);
  };

  const currentNav = config.navItems.find((item) => isLinkActive(item.href));

  // Render navigation links list
  const renderNavLinks = (onItemClick?: () => void) => (
    <nav
      className="flex flex-1 flex-col gap-1 overflow-y-auto px-1 py-1"
      aria-label={`${config.title} navigation`}
    >
      {config.navItems.map((item) => {
        const Icon = item.icon;
        const active = isLinkActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
              active
                ? "bg-emerald-50 text-emerald-800 font-bold shadow-xs border-l-4 border-primary"
                : "text-slate-600 hover:bg-emerald-50/60 hover:text-primary"
            }`}
          >
            <Icon
              className={`size-5 transition-colors ${
                active
                  ? "text-primary font-bold"
                  : "text-slate-400 group-hover:text-primary"
              }`}
              aria-hidden="true"
            />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-slate-950">
      {/* Desktop Sidebar (lg and above) */}
      <aside className="fixed inset-y-0 left-0 hidden w-56 xl:w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col z-30">
        <Link
          href="/"
          className="flex items-center justify-center h-10 w-40 mx-auto transition-opacity hover:opacity-90"
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

        <Divider sx={{ my: "14px" }} />

        {renderNavLinks()}

        <Divider sx={{ my: "14px" }} />

        <div className="flex flex-col gap-2 pt-1">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-center text-sm font-semibold text-white bg-primary shadow-xs transition hover:border-primary hover:text-primary hover:bg-white"
          >
            <HiArrowTopRightOnSquare className="size-4" />
            <span>Go to Website</span>
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50"
          >
            <HiArrowRightOnRectangle className="size-4 text-slate-400 group-hover:text-rose-500" />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Panel (< lg) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <div
            className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white px-5 py-5 shadow-2xl transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Drawer Header with Logo & Close Button */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center"
                aria-label="MediCare Home"
              >
                <Image
                  src="/images/medicare-logo2.png"
                  alt="MediCare Logo"
                  width={80}
                  height={20}
                  priority
                  className="h-16 w-24"
                />
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="flex size-7 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary/40 cursor-pointer"
                aria-label="Close navigation menu"
              >
                <HiXMark className="size-5" />
              </button>
            </div>

            <Divider sx={{ my: "10px" }} />

            {/* Nav list */}
            {renderNavLinks(() => setSidebarOpen(false))}

            <Divider sx={{ my: "12px" }} />

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-white bg-primary shadow-xs transition hover:border-primary hover:text-primary hover:bg-white"
              >
                <HiArrowTopRightOnSquare className="size-4" />
                <span>Go to Website</span>
              </Link>
              <Link
                href="/sign-in"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50"
              >
                <HiArrowRightOnRectangle className="size-4" />
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-56 xl:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md transition-shadow sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Left Header: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-primary hover:border-emerald-200 transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary/40 lg:hidden cursor-pointer"
                aria-label="Open sidebar navigation"
              >
                <HiBars3 className="size-5.5" />
              </button>

              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 truncate">
                  {config.eyebrow}
                </p>
                <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {currentNav?.label || config.title}
                </h1>
              </div>
            </div>

            {/* Right Header: Role badge & Quick action */}
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
              {config.title}
            </div>
          </div>
        </header>

        {/* Dashboard Page Viewport */}
        <main className="flex-1 px-3.5 py-4 sm:px-4 sm:py-6 xl:px-5 lg:py-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
