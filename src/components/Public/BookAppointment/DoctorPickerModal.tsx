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
      <div className="relative w-full sm:max-w-[80%] xl:max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <FaExchangeAlt className="text-[#06836b]" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Select a Doctor
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 shrink-0 bg-[#fafcfb]">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search doctor by name, speciality, or hospital..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-white text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Doctors List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-2">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 hover:bg-emerald-50/50 transition-colors cursor-pointer ${
                selectedDoctorId === doc.id
                  ? "bg-emerald-50 border border-emerald-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={doc.image || "/images/doctors/doctor-1.png"}
                    alt={doc.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-[#06836b] font-medium truncate">
                    {doc.speciality}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {doc.location}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-bold text-[#06836b] text-sm">
                  ৳{doc.consultationFee}
                </span>
                <span className="block text-[10px] text-slate-400">
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
