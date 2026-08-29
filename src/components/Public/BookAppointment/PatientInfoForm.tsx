import { FaUser, FaUserFriends, FaPhoneAlt, FaEnvelope, FaFileMedical, FaTrash } from "react-icons/fa";

interface PatientInfoFormProps {
  bookingFor: "self" | "other";
  setBookingFor: (val: "self" | "other") => void;
  fullName: string;
  setFullName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  age: string;
  setAge: (val: string) => void;
  gender: "Male" | "Female" | "Other";
  setGender: (val: "Male" | "Female" | "Other") => void;
  bloodGroup: string;
  setBloodGroup: (val: string) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (val: boolean) => void;
  symptoms: string;
  setSymptoms: (val: string) => void;
  uploadedFiles: string[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export default function PatientInfoForm({
  bookingFor,
  setBookingFor,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  age,
  setAge,
  gender,
  setGender,
  bloodGroup,
  setBloodGroup,
  isFirstVisit,
  setIsFirstVisit,
  symptoms,
  setSymptoms,
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
}: PatientInfoFormProps) {
  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Patient Details
          </h3>
        </div>
      </div>

      {/* Booking For Switcher */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Who is this appointment for?
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <button
            type="button"
            onClick={() => setBookingFor("self")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              bookingFor === "self"
                ? "bg-[#06836b] text-white border-[#06836b]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FaUser />
            For Myself
          </button>
          <button
            type="button"
            onClick={() => setBookingFor("other")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              bookingFor === "other"
                ? "bg-[#06836b] text-white border-[#06836b]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FaUserFriends />
            Someone Else
          </button>
        </div>
      </div>

      {/* Patient Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400 text-xs sm:text-sm">
              <FaPhoneAlt />
            </span>
            <input
              type="tel"
              required
              placeholder="+880 1700-000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-9 pr-3 text-xs sm:text-sm py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400 text-xs sm:text-sm">
              <FaEnvelope />
            </span>
            <input
              type="email"
              required
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 text-xs sm:text-sm py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
            />
          </div>
        </div>

        {/* Age & Gender */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Age <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            max="120"
            required
            placeholder="e.g. 28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Male", "Female", "Other"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  gender === g
                    ? "bg-[#06836b] text-white border-[#06836b]"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Blood Group */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Blood Group (Optional)
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* First Visit Radio */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Have you visited this doctor before?
          </label>
          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="firstVisit"
                checked={isFirstVisit}
                onChange={() => setIsFirstVisit(true)}
                className="accent-[#06836b]"
              />
              First Visit
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="firstVisit"
                checked={!isFirstVisit}
                onChange={() => setIsFirstVisit(false)}
                className="accent-[#06836b]"
              />
              Follow-up Visit
            </label>
          </div>
        </div>

        {/* Reason for Visit / Symptoms */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Reason for Visit & Health Symptoms (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Briefly describe your symptoms or medical concern to help the doctor prepare..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06836b] bg-slate-50/50"
          />
        </div>

        {/* Medical Reports Upload */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Attach Previous Prescriptions / Lab Reports (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-200 hover:border-[#06836b] rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
            <input
              type="file"
              id="report-upload"
              multiple
              onChange={onFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="report-upload"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <FaFileMedical className="text-2xl text-[#06836b]" />
              <span className="text-xs font-bold text-slate-700">
                Click to upload files
              </span>
              <span className="text-[11px] text-slate-400">
                PDF, PNG, JPG up to 10MB each
              </span>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {uploadedFiles.map((file, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-[#06836b] text-xs font-medium border border-emerald-100"
                >
                  <FaFileMedical />
                  <span className="max-w-[140px] truncate">{file}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveFile(idx)}
                    className="hover:text-rose-500 text-slate-400 ml-1 cursor-pointer"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
