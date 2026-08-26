import { Button } from "@mui/material";
import { HiChevronDown } from "react-icons/hi2";

type DropdownKey = "find-care" | "services" | "resources" | null;

export function NavDropdownItem({
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
          gap: 0.1,
          color: "var(--navbar-text)",
          "&:hover": {
            background: "var(--navbar-item-hover-bg)",
            color: "#06836B",
          },
        }}
      >
        {label}
      </Button>
      {isOpen && children}
    </div>
  );
}
