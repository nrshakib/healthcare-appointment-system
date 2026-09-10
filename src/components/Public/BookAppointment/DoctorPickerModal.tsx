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

  return (
    <div className="fixed inset-0 z-50 top-10 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="doctors-card relative w-full sm:max-w-[80%] xl:max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FaExchangeAlt className="text-[#06836b] dark:text-[#34d399]" />
            <h3 className="doctors-heading-text font-bold text-base sm:text-lg">
              Select a Doctor
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-700 hover:text-slate-400 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-[#fafcfb] dark:bg-slate-900/50">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search doctor by name, speciality, or hospital..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#06836b] dark:focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Doctors List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                selectedDoctorId === doc.id
                  ? "bg-[#4acd90] dark:bg-[#056336be] border border-emerald-200 dark:border-emerald-800/60"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
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
                <span className="font-bold text-[#06836b] dark:text-[#34d399] text-sm">
                  ৳{doc.consultationFee}
                </span>
                <span className="doctors-info-text block text-[10px]">
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
