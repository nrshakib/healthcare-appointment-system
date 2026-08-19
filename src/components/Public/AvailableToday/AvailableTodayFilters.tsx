"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useState } from "react";

export interface Filters {
  specialities: string[];
  experience: string;
  gender: string;
  consultationType: string;
  availability: string;
  priceRange: number[];
}

interface AvailableTodayFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClearAll: () => void;
  minFee: number;
  maxFee: number;
  specialityOptions: string[];
}

const filterOptionLabelSx = {
  marginLeft: 0,
  marginRight: 0,
  minHeight: 24,
  alignItems: "center",
  "& .MuiFormControlLabel-label": {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#4B5563",
  },
};

const radioSx = {
  padding: 0,
  marginRight: "8px",
  color: "#10B981",
  "& .MuiSvgIcon-root": { fontSize: 18 },
  "&.Mui-checked": { color: "#10B981" },
};

export default function AvailableTodayFilters({
  filters,
  onChange,
  onClearAll,
  minFee,
  maxFee,
  specialityOptions,
}: AvailableTodayFiltersProps) {
  const [showMore, setShowMore] = useState(false);

  const update = (patch: Partial<Filters>) =>
    onChange({ ...filters, ...patch });

  const handleSpecialityToggle = (specialityName: string) => {
    const next = filters.specialities.includes(specialityName)
      ? filters.specialities.filter((s) => s !== specialityName)
      : [...filters.specialities, specialityName];
    update({ specialities: next });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100/80">
        <p className="text-base sm:text-lg font-bold text-slate-900">Filters</p>
        <Button
          onClick={onClearAll}
          size="small"
          sx={{
            textTransform: "none",
            color: "#06836b",
            fontWeight: 600,
            fontSize: "13px",
            padding: "2px 6px",
            "&:hover": { backgroundColor: "rgba(6, 131, 107, 0.08)" },
          }}
        >
          Clear All
        </Button>
      </div>

      <div>
        <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">
          Specialities{" "}
          <span className="text-xs sm:text-sm font-normal text-slate-500">
            ({specialityOptions.length})
          </span>
        </p>
        <FormGroup sx={{ gap: "2px" }}>
          {specialityOptions
            .slice(0, showMore ? specialityOptions.length : 6)
            .map((speciality) => (
              <FormControlLabel
                key={speciality}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.specialities.includes(speciality)}
                    onChange={() => handleSpecialityToggle(speciality)}
                    sx={{
                      padding: "3px",
                      marginRight: "6px",
                      color: "#06836b",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&.Mui-checked": { color: "#06836b" },
                    }}
                  />
                }
                label={speciality}
                sx={filterOptionLabelSx}
              />
            ))}
        </FormGroup>
        {specialityOptions.length > 6 && (
          <Button
            onClick={() => setShowMore((prev) => !prev)}
            size="small"
            sx={{
              textTransform: "none",
              color: "#06836b",
              fontWeight: 600,
              fontSize: "13px",
              padding: 0,
              marginTop: "6px",
              "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>

      <div>
        <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">Gender</p>
        <RadioGroup
          value={filters.gender}
          onChange={(e) => update({ gender: e.target.value })}
          sx={{ gap: "2px" }}
        >
          {["All", "Male", "Female", "Other"].map((gender) => (
            <FormControlLabel
              key={gender}
              value={gender}
              control={<Radio size="small" sx={radioSx} />}
              label={gender}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">Consultation Type</p>
        <RadioGroup
          value={filters.consultationType}
          onChange={(e) => update({ consultationType: e.target.value })}
          sx={{ gap: "2px" }}
        >
          {["All", "Video Consultation", "In Person"].map((consultation) => (
            <FormControlLabel
              key={consultation}
              value={consultation}
              control={<Radio size="small" sx={radioSx} />}
              label={consultation}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">Price Range</p>
        <div className="w-full px-2">
          <Slider
            value={filters.priceRange}
            onChange={(_, value) => update({ priceRange: value as number[] })}
            valueLabelDisplay="auto"
            min={minFee}
            max={maxFee}
            step={10}
            sx={{
              color: "#06836b",
              height: 6,
              "& .MuiSlider-thumb": { width: 16, height: 16 },
              "& .MuiSlider-rail": { opacity: 0.25 },
            }}
          />
          <div className="mt-1 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700">
            <span>৳{filters.priceRange[0]}</span>
            <span>৳{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
