"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import {
  HiChevronDown,
  HiChevronRight,
  HiMagnifyingGlass,
  HiXMark,
  HiBars3,
} from "react-icons/hi2";
import { MdOutlineWbSunny, MdNightlight } from "react-icons/md";

interface SubItem {
  label: string;
  href: string;
}

const findCareItems: SubItem[] = [
  { label: "Find a Doctor", href: "/find-care/doctor" },
  { label: "Find a Clinic", href: "/find-care/clinic" },
  { label: "Find a Hospital", href: "/find-care/hospital" },
  { label: "Available Today", href: "/find-care/available-today" },
];

const specialties: SubItem[] = [
  { label: "Cardiology", href: "/specialties/cardiology" },
  { label: "Dermatology", href: "/specialties/dermatology" },
  { label: "Neurology", href: "/specialties/neurology" },
  { label: "Dentistry", href: "/specialties/dentistry" },
  { label: "Orthopedics", href: "/specialties/orthopedics" },
];

const servicesItems: SubItem[] = [
  { label: "Book an Appointment", href: "/services/book" },
  { label: "Video Consultation", href: "/services/video" },
  { label: "In-Person Consultation", href: "/services/in-person" },
  { label: "Medical Records", href: "/services/records" },
  { label: "Prescriptions", href: "/services/prescriptions" },
];

const resourcesItems: SubItem[] = [
  { label: "Health Articles", href: "/resources/articles" },
  { label: "Health Guides", href: "/resources/guides" },
  { label: "FAQs", href: "/resources/faqs" },
  { label: "Help Center", href: "/resources/help" },
];

const providersItems: SubItem[] = [
  { label: "For Doctors", href: "/providers/doctors" },
  { label: "Join MediCare", href: "/providers/join" },
  { label: "Provider Dashboard", href: "/providers/dashboard" },
  { label: "Provider Resources", href: "/providers/resources" },
];

function FindCareDropdown({ onClose }: { onClose: () => void }) {
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSpecialties = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSpecialtiesOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setSpecialtiesOpen(false), 150);
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl overflow-visible z-50 navbar-dropdown border border-[var(--navbar-border)]">
      <div className="py-2">
        {findCareItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
          >
            {item.label}
          </Link>
        ))}

        {/* Browse Specialties — flyout with close-delay to bridge mouse travel gap */}
        <div
          className="relative"
          onMouseEnter={openSpecialties}
          onMouseLeave={scheduleClose}
        >
          <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors duration-150 navbar-dropdown-item">
            Browse Specialties
            <HiChevronRight size={14} />
          </button>

          {specialtiesOpen && (
            /* pl-1 replaces the old ml-1 so the hover area is continuous — no physical gap */
            <div
              className="absolute top-0 left-full pl-1 w-56"
              onMouseEnter={openSpecialties}
              onMouseLeave={scheduleClose}
            >
              <div className="w-52 rounded-xl shadow-2xl z-50 navbar-dropdown border border-[var(--navbar-border)]">
                <div className="py-2">
                  {specialties.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={onClose}
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Generic Simple Dropdown
// ─────────────────────────────────────────────

function SimpleDropdown({
  items,
  onClose,
}: {
  items: SubItem[];
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 mt-2 w-60 rounded-xl shadow-2xl z-50 navbar-dropdown border border-[var(--navbar-border)]">
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Search Overlay
// ─────────────────────────────────────────────

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl navbar-dropdown rounded-2xl shadow-2xl border border-[var(--navbar-border)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3">
          <HiMagnifyingGlass
            size={18}
            style={{ color: "var(--navbar-text-muted)", flexShrink: 0 }}
          />
          <InputBase
            inputRef={inputRef}
            id="navbar-search-input"
            placeholder="Search doctors, clinics, specialties…"
            className="navbar-search-input"
            fullWidth
            sx={{ fontSize: "1rem", color: "var(--navbar-text)" }}
          />
          <IconButton
            onClick={onClose}
            size="small"
            className="navbar-icon-btn"
            aria-label="Close search"
          >
            <HiXMark size={20} />
          </IconButton>
        </div>
        <Divider sx={{ borderColor: "var(--navbar-border)" }} />
        <div className="px-5 py-3">
          <p
            className="text-xs font-medium"
            style={{ opacity: 0.5, color: "var(--navbar-text-muted)" }}
          >
            Popular: Cardiology · Dermatology · Book Appointment
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Desktop Nav Item with Dropdown
// ─────────────────────────────────────────────

type DropdownKey = "find-care" | "services" | "resources" | "providers" | null;

function NavDropdownItem({
  id,
  label,
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  id: Exclude<DropdownKey, null>;
  label: string;
  activeDropdown: DropdownKey;
  onMouseEnter: (id: DropdownKey) => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}) {
  const isOpen = activeDropdown === id;

  return (
    <div
      className="relative"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <Button
        id={`nav-${id}-trigger`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        endIcon={
          <HiChevronDown
            size={14}
            style={{
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        className={`navbar-nav-item${isOpen ? " navbar-nav-item-active" : ""}`}
        sx={{
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "0.5rem",
          px: 1.5,
          py: 1,
          minWidth: "unset",
          gap: 0.5,
          color: "var(--navbar-text)",
          "&:hover": {
            background: "var(--navbar-item-hover-bg)",
            color: "var(--navbar-item-active-text)",
          },
        }}
      >
        {label}
      </Button>
      {isOpen && children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Mobile Menu (MUI Drawer)
// ─────────────────────────────────────────────

function MobileMenu({
  isDark,
  onClose,
  onToggleTheme,
}: {
  isDark: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
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
    {
      key: "providers",
      label: "For Providers",
      items: providersItems,
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
              <div className="mt-1 ml-4 border-l-2 border-[var(--navbar-accent-soft)] pl-3 space-y-0.5">
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
                      <div className="ml-3 border-l border-[var(--navbar-border)] pl-3 mt-0.5 space-y-0.5">
                        {specialties.map((s) => (
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
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 navbar-mobile-item"
        >
          {isDark ? <MdOutlineWbSunny size={18} /> : <MdNightlight size={18} />}
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <Link
          href="/sign-in"
          onClick={onClose}
          className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 navbar-mobile-item"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          onClick={onClose}
          className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 navbar-cta-btn"
        >
          Get Started
        </Link>
      </div>
    </Drawer>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function PublicNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleMouseEnter = useCallback((id: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="MediCare Home"
            >
              <Image
                src="/images/medicare-logo2.png"
                alt="MediCare Logo"
                width={110}
                height={44}
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
                <FindCareDropdown onClose={closeDropdown} />
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

              <NavDropdownItem
                id="providers"
                label="For Providers"
                {...dropdownProps}
              >
                <SimpleDropdown
                  items={providersItems}
                  onClose={closeDropdown}
                />
              </NavDropdownItem>
            </div>

            {/* Right Actions — Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <IconButton
                id="navbar-search-btn"
                onClick={() => setSearchOpen(true)}
                className="navbar-icon-btn"
                aria-label="Open search"
                size="small"
              >
                <HiMagnifyingGlass size={18} />
              </IconButton>

              <IconButton
                id="navbar-theme-toggle"
                onClick={() => setIsDark((d) => !d)}
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

              <Button
                component={Link}
                href="/sign-in"
                id="navbar-sign-in-btn"
                variant="outlined"
                className="navbar-sign-in-btn"
                sx={{
                  borderRadius: "0.625rem",
                  textTransform: "none",
                  fontWeight: 600,
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
            </div>

            {/* Mobile Right Actions */}
            <div className="flex lg:hidden items-center gap-1.5">
              <IconButton
                id="mobile-search-btn"
                onClick={() => setSearchOpen(true)}
                className="navbar-icon-btn"
                aria-label="Open search"
                size="small"
              >
                <HiMagnifyingGlass size={18} />
              </IconButton>

              <IconButton
                id="mobile-theme-btn"
                onClick={() => setIsDark((d) => !d)}
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

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {mobileOpen && (
        <MobileMenu
          isDark={isDark}
          onClose={() => setMobileOpen(false)}
          onToggleTheme={() => setIsDark((d) => !d)}
        />
      )}
    </>
  );
}
