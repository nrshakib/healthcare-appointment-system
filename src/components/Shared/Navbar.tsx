"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import {
  HiChevronDown,
  HiBars3,
  HiSquares2X2,
  HiCalendarDays,
  HiClipboardDocumentList,
  HiUserCircle,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { MdOutlineWbSunny, MdNightlight } from "react-icons/md";

import specialities from "@/utils/specialities";
import { MobileMenu } from "./MobileMenu";
import { NavDropdownItem } from "./NavbarDropdowns/NavDropdownItem";
import { FindCareDropdown } from "./NavbarDropdowns/FindCareDropdown";
import { SimpleDropdown } from "./NavbarDropdowns/SimpleDropdown";

interface SubItem {
  label: string;
  href: string;
}

import type { AuthUser } from "@/hooks/useAuthUser";
import { useDarkMode } from "@/contexts/DarkModeContext";

const findCareItems: SubItem[] = [
  { label: "Find a Doctor", href: "/find-care/doctors" },
  { label: "Available Today", href: "/find-care/available-today" },
];

const specialityItems: SubItem[] = specialities.map((speciality) => ({
  label: speciality.name,
  href: `/find-care/specialities/${speciality.slug}`,
}));

const servicesItems: SubItem[] = [
  { label: "Appointment", href: "/services/appointment" },
  { label: "Video Consultation", href: "/services/video-consultation" },
  { label: "In-Person Consultation", href: "/services/in-person-consultation" },
  { label: "Medical Records", href: "/services/medical-records" },
];

const resourcesItems: SubItem[] = [
  { label: "Health Articles", href: "/resources/health-articles" },
  { label: "FAQs", href: "/resources/frequently-asked-questions" },
  { label: "Help Center", href: "/resources/help-center" },
];

// Desktop Nav Item with Dropdown
type DropdownKey = "find-care" | "services" | "resources" | null;

// Main Component
export default function Navbar() {
  const router = useRouter();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { user } = useAuthUser();

  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Click outside and escape key to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = useCallback((id: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
    setUserMenuOpen(false);
    router.push("/sign-in");
  }, [router]);

  const dropdownProps = {
    activeDropdown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <>
      <nav
        className={`navbar-root${scrolled ? " scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="max-w-[95%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 flex items-center"
              aria-label="MediCare Home"
            >
              <Image
                src="/images/medicare-logo2.png"
                alt="MediCare Logo"
                width={150}
                height={80}
                loading="eager"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavDropdownItem
                id="find-care"
                label="Find Care"
                {...dropdownProps}
              >
                <FindCareDropdown
                  findCareItems={findCareItems}
                  specialityItems={specialityItems}
                  onClose={closeDropdown}
                />
              </NavDropdownItem>

              <NavDropdownItem
                id="services"
                label="Services"
                {...dropdownProps}
              >
                <SimpleDropdown items={servicesItems} onClose={closeDropdown} />
              </NavDropdownItem>

              <NavDropdownItem
                id="resources"
                label="Resources"
                {...dropdownProps}
              >
                <SimpleDropdown
                  items={resourcesItems}
                  onClose={closeDropdown}
                />
              </NavDropdownItem>
            </div>

            {/* Right Actions — Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <IconButton
                id="navbar-theme-toggle"
                onClick={toggleDark}
                className="navbar-icon-btn"
                aria-label="Toggle theme"
                size="small"
              >
                {isDark ? (
                  <MdOutlineWbSunny size={18} />
                ) : (
                  <MdNightlight size={18} />
                )}
              </IconButton>

              {user ? (
                /* Authenticated Patient User Avatar & Dropdown */
                <div className="relative" ref={userMenuRef}>
                  <button
                    id="navbar-user-avatar-btn"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-(--navbar-border) hover:border-[#06836B] transition-all duration-200 bg-(--navbar-dropdown-bg) focus:outline-none focus:ring-2 focus:ring-[#06836B]/30 cursor-pointer shadow-xs hover:shadow-md"
                    aria-label="User account menu"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#06836B]/40">
                      <Image
                        src="/images/users/user-avatar-1.png"
                        alt="User Profile"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    {/* <span className="max-w-[130px] truncate text-xs font-semibold text-(--navbar-text)">
                      {user.email.split("@")[0]}
                    </span> */}
                    <HiChevronDown
                      size={14}
                      className={`text-(--navbar-text-muted) transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180 text-[#06836B]" : ""
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl shadow-2xl overflow-hidden z-50 navbar-dropdown border border-(--navbar-border)">
                      {/* User Info Header */}
                      <div className="p-4 bg-emerald-500/5 border-b border-(--navbar-border)">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#06836B] shrink-0">
                            <Image
                              src="/images/users/user-avatar-1.png"
                              alt="User Profile"
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                                {user.role}
                              </span>
                            </div>
                            <p
                              className="text-xs font-medium text-(--navbar-text) truncate mt-1"
                              title={user.email}
                            >
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Menu Items */}
                      <div className="p-1.5 space-y-0.5">
                        <Link
                          href="/patient-dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-150 navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
                        >
                          <HiSquares2X2
                            className="text-[#06836B] shrink-0"
                            size={18}
                          />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/patient-dashboard/appointments"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-150 navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
                        >
                          <HiCalendarDays
                            className="text-[#06836B] shrink-0"
                            size={18}
                          />
                          <span>Appointments</span>
                        </Link>
                        <Link
                          href="/patient-dashboard/records"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-150 navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
                        >
                          <HiClipboardDocumentList
                            className="text-[#06836B] shrink-0"
                            size={18}
                          />
                          <span>Medical Records</span>
                        </Link>
                        <Link
                          href="/patient-dashboard/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-150 navbar-dropdown-item hover:bg-(--navbar-item-hover-bg)"
                        >
                          <HiUserCircle
                            className="text-[#06836B] shrink-0"
                            size={18}
                          />
                          <span>Profile Settings</span>
                        </Link>
                      </div>

                      {/* Log Out Action */}
                      <div className="border-t border-(--navbar-border) p-1.5">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors duration-150 cursor-pointer text-left"
                        >
                          <HiArrowRightOnRectangle
                            size={18}
                            className="shrink-0"
                          />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated Sign In & Get Started Buttons */
                <>
                  <Button
                    component={Link}
                    href="/sign-in"
                    id="navbar-sign-in-btn"
                    variant="outlined"
                    className="navbar-sign-in-btn"
                    sx={{
                      borderRadius: "0.625rem",
                      border: "1px solid #06836B",
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#06836B",
                    }}
                  >
                    Sign In
                  </Button>

                  <Button
                    component={Link}
                    href="/register"
                    id="navbar-get-started-btn"
                    className="navbar-cta-btn"
                    sx={{ borderRadius: "0.625rem", textTransform: "none" }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Right Actions */}
            <div className="flex lg:hidden items-center gap-1.5">
              <IconButton
                id="mobile-theme-btn"
                onClick={toggleDark}
                className="navbar-icon-btn"
                aria-label="Toggle theme"
                size="small"
              >
                {isDark ? (
                  <MdOutlineWbSunny size={18} />
                ) : (
                  <MdNightlight size={18} />
                )}
              </IconButton>

              <IconButton
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                className="navbar-icon-btn"
                aria-label="Open menu"
                size="small"
              >
                <HiBars3 size={22} />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu
          findCareItems={findCareItems}
          servicesItems={servicesItems}
          resourcesItems={resourcesItems}
          specialityItems={specialityItems}
          user={user}
          isDark={isDark}
          onClose={() => setMobileOpen(false)}
          onToggleTheme={toggleDark}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
