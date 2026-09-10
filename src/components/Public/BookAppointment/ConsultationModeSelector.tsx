import { FaCheck } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FiUserCheck } from "react-icons/fi";
import { Button } from "@mui/material";

interface ConsultationModeSelectorProps {
  consultationType: "Online" | "In-Person";
  onConsultationTypeChange: (type: "Online" | "In-Person") => void;
  doctorLocation?: string;
}

export default function ConsultationModeSelector({
  consultationType,
  onConsultationTypeChange,
  doctorLocation,
}: ConsultationModeSelectorProps) {
  return (
    <section className="doctors-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="consultation-step-badge size-5 sm:size-7 rounded-full text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="doctors-heading-text text-sm sm:text-lg font-bold">
            Select Consultation Mode
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Video Consultation */}
        <Button
          type="button"
          onClick={() => onConsultationTypeChange("Online")}
          disableRipple
          className={`consultation-mode-btn ${consultationType === "Online" ? "active" : ""}`}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="consultation-video-icon size-10 rounded-xl flex items-center justify-center text-xl">
              <HiOutlineVideoCamera />
            </div>
            {consultationType === "Online" && (
              <span className="consultation-check-badge size-5 rounded-full flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1 w-full">
            <p className="doctors-heading-text font-bold text-sm sm:text-base">
              Video Consultation
            </p>
            <p className="doctors-card-muted text-xs font-normal normal-case">
              Join from phone or computer. Instant digital prescription
              included.
            </p>
          </div>
        </Button>

        {/* In-Person Visit */}
        <Button
          type="button"
          onClick={() => onConsultationTypeChange("In-Person")}
          disableRipple
          className={`consultation-mode-btn ${consultationType === "In-Person" ? "active" : ""}`}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="consultation-inperson-icon size-10 rounded-xl flex items-center justify-center text-xl">
              <FiUserCheck />
            </div>
            {consultationType === "In-Person" && (
              <span className="consultation-check-badge size-5 rounded-full flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1 w-full">
            <p className="doctors-heading-text font-bold text-sm sm:text-base">
              In-Person Chamber Visit
            </p>
            <p className="doctors-card-muted text-xs truncate font-normal normal-case">
              At {doctorLocation || "Hospital Chamber"}.
              <br className="xl:hidden" />
              <span>Physical examination.</span>
            </p>
          </div>
        </Button>
      </div>
    </section>
  );
}

