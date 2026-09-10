import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaExchangeAlt } from "react-icons/fa";

import doctorsData from "@/utils/doctors";
import { Button } from "@mui/material";

export type DoctorType = (typeof doctorsData)[0];

interface DoctorSummaryCardProps {
  doctor: DoctorType;
  onChangeDoctorClick: () => void;
}

export default function DoctorSummaryCard({
  doctor,
  onChangeDoctorClick,
}: DoctorSummaryCardProps) {
  return (
    <section className="doctors-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Doctor Avatar */}
          <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <Image
              src={doctor.image || "/images/doctors/doctor-1.png"}
              alt={doctor.name}
              width={96}
              height={96}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          {/* Doctor Info */}
          <div className="space-y-1 min-w-0">
            <div className="">
              <h2 className="doctors-heading-text text-lg sm:text-xl font-bold ">
                {doctor.name}
              </h2>
            </div>

            <p className="doctors-speciality-text text-xs sm:text-sm font-semibold">
              {doctor.speciality}
            </p>

            <p className="doctors-info-text text-xs truncate">
              {doctor.degree}
            </p>

            <div className="flex items-center flex-wrap gap-3 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <FaStar className="text-xs" />
                {doctor.rating} ({doctor.reviewCount} reviews)
              </span>
              <span className="doctors-info-text">•</span>
              <span className="doctors-speciality-text">
                {doctor.experience} Years Exp.
              </span>
            </div>

            <div className="doctors-location-text flex items-center gap-1 text-xs pt-1">
              <FaMapMarkerAlt className="text-primary shrink-0" />
              <span className="truncate">{doctor.location}</span>
            </div>
          </div>
        </div>

        {/* Switch Doctor Button */}
        <div className="shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <Button
            type="button"
            onClick={onChangeDoctorClick}
            disableElevation
            className="doctor-switch-btn"
            startIcon={
              <FaExchangeAlt className="doctor-switch-icon text-[#06836b] dark:text-[#34d399] transition-colors" />
            }
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: "14px",
              py: "8px",
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
              color: "#334155",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none",
              border: "1px solid #e2e8f0",
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f1f5f9",
              },
              ".dark &": {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "var(--text-heading)",
                borderColor: "var(--border-default)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  borderColor: "var(--accent)",
                },
                "& .doctor-switch-icon": {
                  color: "var(--accent)",
                },
              },
            }}
          >
            Change Doctor
          </Button>
        </div>
      </div>
    </section>
  );
}
