import { Collapse, Divider, Drawer, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiCalendarDays,
  HiChevronDown,
  HiClipboardDocumentList,
  HiSquares2X2,
  HiUserCircle,
  HiXMark,
} from "react-icons/hi2";
import { MdNightlight, MdOutlineWbSunny } from "react-icons/md";

interface SubItem {
  label: string;
  href: string;
}

interface AuthUser {
  role: string;
  email: string;
}

export function MobileMenu({
  findCareItems,
  servicesItems,
  resourcesItems,
  specialityItems,
  user,
  isDark,
  onClose,
  onToggleTheme,
  onLogout,
}: {
  findCareItems: SubItem[];
  servicesItems: SubItem[];
  resourcesItems: SubItem[];
  specialityItems: SubItem[];
  user: AuthUser | null;
  isDark: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);

  const toggle = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const sections = [
    {
      key: "find-care",
      label: "Find Care",
      items: findCareItems,
      hasSub: true,
    },
    { key: "services", label: "Services", items: servicesItems, hasSub: false },
    {
      key: "resources",
      label: "Resources",
      items: resourcesItems,
      hasSub: false,
    },
  ];

  return (
    <Drawer
      anchor="right"
      open
      onClose={onClose}
      slotProps={{
        paper: {
          className: "navbar-mobile-panel",
          sx: {
            width: 320,
            maxWidth: "100vw",
            background: "var(--navbar-mobile-panel-bg)",
            color: "var(--navbar-text)",
            boxShadow: "none",
          },
        },
        backdrop: {
          style: { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)" },
        },
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-base font-bold tracking-tight navbar-brand">
          Navigation
        </span>
        <IconButton
          onClick={onClose}
          id="mobile-menu-close"
          className="navbar-icon-btn"
          aria-label="Close menu"
        >
          <HiXMark size={22} />
        </IconButton>
      </div>
      <Divider sx={{ borderColor: "var(--navbar-border)" }} />

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto py-3 px-3">
        {sections.map((section) => (
          <div key={section.key} className="mb-1">
            <button
              id={`mobile-nav-${section.key}`}
              onClick={() => toggle(section.key)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 navbar-mobile-item${openSection === section.key ? " navbar-mobile-item-active" : ""}`}
            >
              {section.label}
              <HiChevronDown
                size={14}
                style={{
                  transition: "transform 0.2s",
                  transform:
                    openSection === section.key
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            </button>

            <Collapse in={openSection === section.key} timeout={200}>
              <div className="mt-1 ml-4 border-l-2 border-(--navbar-accent-soft) pl-3 space-y-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}

                {section.hasSub && (
                  <div>
                    <button
                      onClick={() => setSpecialtiesOpen((p) => !p)}
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
                    >
                      Browse Specialties
                      <HiChevronDown
                        size={14}
                        style={{
                          transition: "transform 0.2s",
                          transform: specialtiesOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </button>
                    <Collapse in={specialtiesOpen} timeout={200}>
                      <div className="ml-3 border-l border-(--navbar-border) pl-3 mt-0.5 space-y-0.5">
                        <Link
                          href="/find-care/specialities"
                          onClick={onClose}
                          className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 navbar-dropdown-item"
                        >
                          All Specialities
                        </Link>
                        {specialityItems.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={onClose}
                            className="flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-150 navbar-dropdown-item"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </Collapse>
                  </div>
                )}
              </div>
            </Collapse>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Divider sx={{ borderColor: "var(--navbar-border)" }} />
      <div className="px-4 py-4 space-y-3">
        <button
          id="mobile-theme-toggle"
          onClick={onToggleTheme}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 navbar-mobile-item"
        >
          {isDark ? <MdOutlineWbSunny size={18} /> : <MdNightlight size={18} />}
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        <Divider sx={{ borderColor: "var(--navbar-border)" }} />

        {user ? (
          <div className="space-y-2 pt-1">
            {/* User Profile Overview */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-(--navbar-border)">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#06836B] shrink-0">
                <Image
                  src="/images/users/user-avatar-1.png"
                  alt="User Profile"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {user.role}
                </span>
                <p
                  className="text-xs font-semibold text-(--navbar-text) truncate mt-0.5"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* User Links */}
            <div className="space-y-1 pt-1">
              <Link
                href="/patient-dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
              >
                <HiSquares2X2 className="text-[#06836B] shrink-0" size={18} />
                Dashboard
              </Link>
              <Link
                href="/patient-dashboard/appointments"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
              >
                <HiCalendarDays className="text-[#06836B] shrink-0" size={18} />
                Appointments
              </Link>
              <Link
                href="/patient-dashboard/records"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
              >
                <HiClipboardDocumentList
                  className="text-[#06836B] shrink-0"
                  size={18}
                />
                Medical Records
              </Link>
              <Link
                href="/patient-dashboard/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
              >
                <HiUserCircle className="text-[#06836B] shrink-0" size={18} />
                Profile Settings
              </Link>
            </div>

            <Divider sx={{ borderColor: "var(--navbar-border)" }} />

            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors duration-200 cursor-pointer"
            >
              <HiArrowRightOnRectangle size={18} />
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center justify-center w-full px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 navbar-mobile-item"
            >
              Sign In
            </Link>
            <Divider sx={{ borderColor: "var(--navbar-border)" }} />
            <Link
              href="/register"
              onClick={onClose}
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 navbar-cta-btn"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </Drawer>
  );
}
