import Link from "next/link";

interface SubItem {
  label: string;
  href: string;
}

export function SimpleDropdown({
  items,
  onClose,
}: {
  items: SubItem[];
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 mt-2 w-60 rounded-xl shadow-2xl z-50 navbar-dropdown border border-(--navbar-border)">
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center px-4 py-2.5 text-xs xl:text-sm font-medium transition-colors duration-150 navbar-dropdown-item"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
