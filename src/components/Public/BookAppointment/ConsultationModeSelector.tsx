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
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-5 sm:size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-slate-900">
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
          sx={{
            p: 2,
            borderRadius: "16px",
            border: "2px solid",
            borderColor: consultationType === "Online" ? "#06836b" : "#e2e8f0",
            backgroundColor:
              consultationType === "Online" ? "#f0fdf9" : "#ffffff",
            boxShadow:
              consultationType === "Online"
                ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                : "none",
            textAlign: "left",
            textTransform: "none",
            transition: "all 0.2s ease-in-out",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            "&:hover": {
              borderColor:
                consultationType === "Online" ? "#06836b" : "#cbd5e1",
              backgroundColor:
                consultationType === "Online" ? "#f0fdf9" : "#ffffff",
            },
          }}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="size-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl">
              <HiOutlineVideoCamera />
            </div>
            {consultationType === "Online" && (
              <span className="size-5 rounded-full bg-[#06836b] text-white flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1 w-full">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              Video Consultation
            </p>
            <p className="text-xs text-slate-500 font-normal normal-case">
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
          sx={{
            p: 2,
            borderRadius: "16px",
            border: "2px solid",
            borderColor:
              consultationType === "In-Person" ? "#06836b" : "#e2e8f0",
            backgroundColor:
              consultationType === "In-Person" ? "#f0fdf9" : "#ffffff",
            boxShadow:
              consultationType === "In-Person"
                ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                : "none",
            textAlign: "left",
            textTransform: "none",
            transition: "all 0.2s ease-in-out",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            "&:hover": {
              borderColor:
                consultationType === "In-Person" ? "#06836b" : "#cbd5e1",
              backgroundColor:
                consultationType === "In-Person" ? "#f0fdf9" : "#ffffff",
            },
          }}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="size-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl">
              <FiUserCheck />
            </div>
            {consultationType === "In-Person" && (
              <span className="size-5 rounded-full bg-[#06836b] text-white flex items-center justify-center text-xs">
                <FaCheck />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1 w-full">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              In-Person Chamber Visit
            </p>
            <p className="text-xs text-slate-500 truncate font-normal normal-case">
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
