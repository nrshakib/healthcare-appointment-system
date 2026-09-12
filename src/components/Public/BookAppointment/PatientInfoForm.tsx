import {
  FaUser,
  FaUserFriends,
  FaPhoneAlt,
  FaEnvelope,
  FaFileMedical,
  FaTrash,
} from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";

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
    <section className="doctors-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="consultation-step-badge size-7 rounded-full text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h3 className="doctors-heading-text text-base sm:text-lg font-bold">
            Patient Details
          </h3>
        </div>
      </div>

      {/* Booking For Switcher */}
      <div className="space-y-1.5">
        <label className="doctors-info-text block text-xs font-bold">
          Who is this appointment for?
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <Button
            variant="outlined"
            onClick={() => setBookingFor("self")}
            startIcon={<FaUser />}
            className={`slot-items${bookingFor === "self" ? " active scale-102" : ""}`}
            sx={{
              textTransform: "none",
              fontSize: {
                xs: "10px",
                sm: "12px",
              },
              fontWeight: 600,
              ...(bookingFor !== "self" && {
                color: "#64748b",
                borderColor: "#cbd5e1",
                backgroundColor: "#f1f5f9",
                ".dark &": {
                  color: "#94a3b8",
                  borderColor: "#334155",
                  backgroundColor: "rgba(51,65,85,0.3)",
                },
              }),
            }}
          >
            For Myself
          </Button>
          <Button
            variant="outlined"
            onClick={() => setBookingFor("other")}
            startIcon={<FaUserFriends />}
            className={`slot-items${bookingFor === "other" ? " active scale-102" : ""}`}
            sx={{
              textTransform: "none",
              fontSize: {
                xs: "10px",
                sm: "12px",
              },
              fontWeight: 600,
              ...(bookingFor !== "other" && {
                color: "#64748b",
                borderColor: "#cbd5e1",
                backgroundColor: "#f1f5f9",
                ".dark &": {
                  color: "#94a3b8",
                  borderColor: "#334155",
                  backgroundColor: "rgba(51,65,85,0.3)",
                },
              }),
            }}
          >
            Someone Else
          </Button>
        </div>
      </div>

      {/* Patient Fields */}
      <div className="patient-fields-section grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <TextField
            fullWidth
            required
            label="Patient Full Name"
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            size="medium"
            className="patient-mui-field"
          />
        </div>

        {/* Phone Number */}
        <TextField
          fullWidth
          required
          label="Phone Number"
          type="tel"
          placeholder="+88 01700 000000"
          value={phoneNumber}
          onChange={(e) => {
            const filtered = e.target.value.replace(/[^0-9+\-() ]/g, '');
            setPhoneNumber(filtered);
          }}

          size="medium"
          className="patient-mui-field"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaPhoneAlt className="patient-field-icon text-xs" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Email Address */}
        <TextField
          fullWidth
          required
          label="Email Address"
          type="email"
          placeholder="patient@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="medium"
          className="patient-mui-field"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaEnvelope className="patient-field-icon text-xs" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Age */}
        <TextField
          fullWidth
          required
          label="Age"
          type="number"
          placeholder="e.g. 28"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          size="medium"
          className="patient-mui-field"
          slotProps={{ htmlInput: { min: 1, max: 120 } }}
        />

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="patient-field-label block text-xs font-semibold">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Male", "Female", "Other"] as const).map((g) => (
              <Button
                key={g}
                variant="outlined"
                onClick={() => setGender(g)}
                className={`patient-field-gender-btn ${gender === g ? "selected" : ""
                  }`}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "6px 4px",
                  borderRadius: "12px",
                  minWidth: 0,
                }}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>

        {/* Blood Group */}
        <FormControl size="medium" fullWidth className="patient-mui-field">
          <InputLabel id="blood-group-label">Blood Group (Optional)</InputLabel>
          <Select
            labelId="blood-group-label"
            label="Blood Group (Optional)"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="patient-mui-select"
            size="medium"
            MenuProps={{
              slotProps: {
                paper: {
                  sx: {
                    mt: "4px",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 8px 24px -4px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.08)",
                    "& .MuiList-root": { p: "4px" },
                    "& .MuiMenuItem-root": {
                      fontSize: "0.875rem",
                      color: "var(--text-body)",
                      borderRadius: "8px",
                      mx: "2px",
                      my: "1px",
                      px: "12px",
                      transition: "background-color 0.15s ease, color 0.15s ease",
                      "&:hover": {
                        backgroundColor: "rgba(6,131,107,0.08)",
                        color: "var(--accent)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(6, 131, 106, 0.12) !important",
                        color: "var(--accent)",
                        fontWeight: 600,
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "rgba(6,131,107,0.18) !important",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">
              <em>Select Blood Group</em>
            </MenuItem>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <MenuItem key={bg} value={bg}>
                {bg}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* First Visit Radio */}
        <div className="space-y-1">
          <label className="patient-field-label block text-xs font-semibold">
            Have you visited this doctor before?
          </label>
          <RadioGroup
            row={true}
            value={isFirstVisit ? "first" : "followup"}
            onChange={(e) => setIsFirstVisit(e.target.value === "first")}
            className="patient-mui-radio-group"
          >
            <FormControlLabel
              value="first"
              control={
                <Radio
                  size="small"
                  className="patient-mui-radio"
                  sx={{
                    color: "var(--border-default)",
                    "&.Mui-checked": { color: "var(--primary)" },
                    ".dark &.Mui-checked": { color: "var(--accent)" },
                    padding: "4px 8px",
                  }}
                />
              }
              label={
                <span className="patient-field-label text-xs">
                  First Visit
                </span>
              }
            />
            <FormControlLabel
              value="followup"
              control={
                <Radio
                  size="small"
                  className="patient-mui-radio"
                  sx={{
                    color: "var(--border-default)",
                    "&.Mui-checked": { color: "var(--primary)" },
                    ".dark &.Mui-checked": { color: "var(--accent)" },
                    padding: "4px 8px",
                  }}
                />
              }
              label={
                <span className="patient-field-label text-xs">
                  Follow-up Visit
                </span>
              }
            />
          </RadioGroup>
        </div>

        {/* Reason for Visit / Symptoms */}
        <div className="sm:col-span-2">
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason for Visit & Health Symptoms (Optional)"
            placeholder="Briefly describe your symptoms or medical concern to help the doctor prepare..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            size="small"
            className="patient-mui-field"
          />
        </div>

        {/* Medical Reports Upload */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="patient-field-label block text-xs font-semibold">
            Attach Previous Prescriptions / Lab Reports (Optional)
          </label>
          <div className="patient-field-upload-area border-2 border-dashed border-slate-200 hover:border-[#06836b] rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
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
              <span className="patient-field-upload-text text-xs font-bold text-slate-700">
                Click to upload files
              </span>
              <span className="patient-field-upload-text text-[11px] text-slate-400">
                PDF, PNG, JPG up to 10MB each
              </span>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {uploadedFiles.map((file, idx) => (
                <span
                  key={idx}
                  className="patient-field-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-[#06836b] text-xs font-medium border border-emerald-100"
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
