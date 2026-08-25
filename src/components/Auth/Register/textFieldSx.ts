// Shared MUI TextField sx styles used across all register form components
export const textFieldSx = {
  "& label.Mui-focused": {
    color: "#06836B",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    "& fieldset": {
      borderColor: "rgba(6, 131, 107, 0.4)",
    },
    "&:hover fieldset": {
      borderColor: "#06836B",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#06836B",
    },
  },
};

export const submitButtonSx = {
  py: 1.5,
  borderRadius: "0.75rem",
  fontSize: "0.95rem",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "0 4px 14px rgba(6, 131, 107, 0.35)",
  background: "linear-gradient(135deg, #06836B 0%, #0db996 100%)",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(6, 131, 107, 0.45)",
    opacity: 0.95,
  },
};

export const checkboxSx = {
  color: "#06836B",
  "&.Mui-checked": {
    color: "#06836B",
  },
};
