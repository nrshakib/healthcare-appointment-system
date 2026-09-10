import Image from "next/image";
import { FaExchangeAlt, FaTimes, FaSearch } from "react-icons/fa";
import doctorsData from "@/utils/doctors";

export type DoctorItem = (typeof doctorsData)[0];

interface DoctorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: DoctorItem[];
  selectedDoctorId: string | number;
  onSelectDoctor: (doctor: DoctorItem) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export default function DoctorPickerModal({
  isOpen,
  onClose,
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  searchQuery,
  onSearchQueryChange,
}: DoctorPickerModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onSearchQueryChange("");
    onClose();
  };

  const handleSelectDoctor = (doc: DoctorItem) => {
    onSearchQueryChange("");
    onSelectDoctor(doc);
  };

  return (
    <div
      className="fixed inset-0 z-50 top-10 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="doctors-card relative w-full sm:max-w-[80%] xl:max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b doctors-search-divider shrink-0">
          <div className="flex items-center gap-2">
            <FaExchangeAlt className="doctors-speciality-text text-base" />
            <h3 className="doctors-heading-text font-bold text-base sm:text-lg">
              Select a Doctor
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="doctors-close-btn p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <div className="doctors-bottom-section p-4 sm:p-5 border-b doctors-search-divider shrink-0">
          <div className="relative flex items-center">
            <FaSearch className="doctors-search-label absolute left-3.5 text-sm pointer-events-none" />
            <input
              type="text"
              placeholder="Search doctor by name, speciality, or hospital..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="doctors-search-box doctors-heading-text w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Doctors List */}
        <div className="doctor-picker-scroll p-4 sm:p-5 overflow-y-auto flex-1 divide-y doctors-search-divider space-y-2">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleSelectDoctor(doc)}
              className={`doctor-picker-item p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer ${
                selectedDoctorId === doc.id ? "doctor-picker-item-selected" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-12 rounded-xl overflow-hidden doctor-picker-avatar shrink-0">
                  <Image
                    src={doc.image || "/images/doctors/doctor-1.png"}
                    alt={doc.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="doctors-heading-text font-bold text-xs sm:text-sm truncate">
                    {doc.name}
                  </p>
                  <p className="doctors-speciality-text text-xs font-medium truncate">
                    {doc.speciality}
                  </p>
                  <p className="doctors-info-text text-[11px] truncate">
                    {doc.location}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="doctors-speciality-text font-bold text-sm">
                  ৳{doc.consultationFee}
                </span>
                <span className="doctors-card-muted block text-[10px]">
                  / Session
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
