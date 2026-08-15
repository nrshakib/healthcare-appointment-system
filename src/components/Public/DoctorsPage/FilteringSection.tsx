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

interface FilteringSectionProps {
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

export default function FilteringSection({
  filters,
  onChange,
  onClearAll,
  minFee,
  maxFee,
  specialityOptions,
}: FilteringSectionProps) {
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
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={onClearAll}
          sx={{ textTransform: "none", color: "#10B981" }}
        >
          Clear All
        </Button>
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">
          Specialities{" "}
          <span className="text-sm text-gray-500">
            ({specialityOptions.length})
          </span>
        </p>
        <FormGroup sx={{ gap: 0 }}>
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
                      padding: 0,
                      marginRight: "8px",
                      color: "#10B981",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&.Mui-checked": { color: "#10B981" },
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
            sx={{
              textTransform: "none",
              color: "#10B981",
              padding: 0,
              marginTop: "8px",
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Experience</p>
        <RadioGroup
          value={filters.experience}
          onChange={(e) => update({ experience: e.target.value })}
          sx={{ gap: 0 }}
        >
          {["0-5 years", "5-10 years", "10-15 years", "15+ years"].map(
            (experience) => (
              <FormControlLabel
                key={experience}
                value={experience}
                control={<Radio size="small" sx={radioSx} />}
                label={experience}
                sx={filterOptionLabelSx}
              />
            ),
          )}
        </RadioGroup>
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Gender</p>
        <RadioGroup
          value={filters.gender}
          onChange={(e) => update({ gender: e.target.value })}
          sx={{ gap: 0 }}
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
        <p className="text-lg font-semibold mb-2">Consultation Type</p>
        <RadioGroup
          value={filters.consultationType}
          onChange={(e) => update({ consultationType: e.target.value })}
          sx={{ gap: 0 }}
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
        <p className="text-lg font-semibold mb-2">Availability</p>
        <RadioGroup
          value={filters.availability}
          onChange={(e) => update({ availability: e.target.value })}
          sx={{ gap: 0 }}
        >
          {["Available Today", "Available This Week"].map((availability) => (
            <FormControlLabel
              key={availability}
              value={availability}
              control={<Radio size="small" sx={radioSx} />}
              label={availability}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Price Range</p>
        <div className="w-full max-w-xs px-1">
          <Slider
            value={filters.priceRange}
            onChange={(_, value) => update({ priceRange: value as number[] })}
            valueLabelDisplay="auto"
            min={minFee}
            max={maxFee}
            step={10}
            sx={{
              color: "#10B981",
              height: 6,
              "& .MuiSlider-thumb": { width: 16, height: 16 },
              "& .MuiSlider-rail": { opacity: 0.25 },
            }}
          />
          <div className="mt-1 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>৳{filters.priceRange[0]}</span>
            <span>৳{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
