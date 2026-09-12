import Link from "next/link";
import { useRef, useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

interface SubItem {
  label: string;
  href: string;
}

export function FindCareDropdown({
  onClose,
  findCareItems,
  specialityItems,
}: {
  onClose: () => void;
  findCareItems: SubItem[];
  specialityItems: SubItem[];
}) {
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
    <div className="custom-scrollbar absolute top-full left-0 mt-2 w-72 rounded-xl shadow-2xl overflow-visible z-50 navbar-dropdown border border-(--navbar-border)">
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
          <p className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors duration-150 navbar-dropdown-item">
            Browse Specialties
            <HiChevronRight size={14} />
          </p>

          {specialtiesOpen && (
            /* pl-1 replaces the old ml-1 so the hover area is continuous — no physical gap */
            <div
              className="absolute top-0 left-full pl-1 w-72"
              onMouseEnter={openSpecialties}
              onMouseLeave={scheduleClose}
            >
              <div className="w-72 max-h-[calc(100vh-20rem)] overflow-y-auto rounded-xl shadow-2xl z-50 navbar-dropdown border border-(--navbar-border)">
                <div className="py-2">
                  <Link
                    href="/find-care/specialities"
                    onClick={onClose}
                    className="flex items-center px-4 py-2.5 text-sm font-semibold transition-colors duration-150 navbar-dropdown-item"
                  >
                    All Specialities
                  </Link>
                  <div className="my-1 border-t border-(--navbar-border)" />
                  {specialityItems.map((s) => (
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
