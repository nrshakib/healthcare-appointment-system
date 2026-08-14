"use client";

import { useState } from "react";
import specialities from "@/utils/specialities";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";

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

export default function FilteringSection() {
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    [],
  );
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [showMore, setShowMore] = useState(false);

  const handleSpecialityToggle = (specialityName: string) => {
    setSelectedSpecialities((prev) =>
      prev.includes(specialityName)
        ? prev.filter((s) => s !== specialityName)
        : [...prev, specialityName],
    );
  };

  const handleClearAll = () => {
    setSelectedSpecialities([]);
    setSelectedExperience("");
    setSelectedGender("");
    setSelectedConsultationType("");
    setSelectedAvailability("");
    setPriceRange([0, 100]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={handleClearAll}
          sx={{
            textTransform: "none",
            color: "#10B981",
          }}
        >
          Clear All
        </Button>
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">
          Specialities <span className="text-sm text-gray-500">({specialities.length})</span>
        </p>
        <FormGroup sx={{ gap: 0 }}>
          {specialities
            .slice(0, showMore ? specialities.length : 6)
            .map((speciality) => (
              <FormControlLabel
                key={speciality.name}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedSpecialities.includes(speciality.name)}
                    onChange={() => handleSpecialityToggle(speciality.name)}
                    sx={{
                      padding: 0,
                      marginRight: "8px",
                      color: "#10B981",
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                      },
                      "&.Mui-checked": {
                        color: "#10B981",
                      },
                    }}
                  />
                }
                label={speciality.name}
                sx={filterOptionLabelSx}
              />
            ))}
        </FormGroup>
        {specialities.length > 6 && (
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
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          sx={{ gap: 0 }}
        >
          {["0-5 years", "5-10 years", "10-15 years", "15+ years"].map(
            (experience) => (
              <FormControlLabel
                key={experience}
                value={experience}
                control={
                  <Radio
                    size="small"
                    sx={{
                      padding: 0,
                      marginRight: "8px",
                      color: "#10B981",
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                      },
                      "&.Mui-checked": {
                        color: "#10B981",
                      },
                    }}
                  />
                }
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
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          sx={{ gap: 0 }}
        >
          {["All", "Male", "Female", "Other"].map((gender) => (
            <FormControlLabel
              key={gender}
              value={gender}
              control={
                <Radio
                  size="small"
                  sx={{
                    padding: 0,
                    marginRight: "8px",
                    color: "#10B981",
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                    },
                    "&.Mui-checked": {
                      color: "#10B981",
                    },
                  }}
                />
              }
              label={gender}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">Consultation Type</p>
        <RadioGroup
          value={selectedConsultationType}
          onChange={(e) => setSelectedConsultationType(e.target.value)}
          sx={{ gap: 0 }}
        >
          {["All", "Video Consultation", "In Person"].map((consultation) => (
            <FormControlLabel
              key={consultation}
              value={consultation}
              control={
                <Radio
                  size="small"
                  sx={{
                    padding: 0,
                    marginRight: "8px",
                    color: "#10B981",
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                    },
                    "&.Mui-checked": {
                      color: "#10B981",
                    },
                  }}
                />
              }
              label={consultation}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">Availability</p>
        <RadioGroup
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          sx={{ gap: 0 }}
        >
          {["Available Today", "Available This Week"].map((availability) => (
            <FormControlLabel
              key={availability}
              value={availability}
              control={
                <Radio
                  size="small"
                  sx={{
                    padding: 0,
                    marginRight: "8px",
                    color: "#10B981",
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                    },
                    "&.Mui-checked": {
                      color: "#10B981",
                    },
                  }}
                />
              }
              label={availability}
              sx={filterOptionLabelSx}
            />
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">Price Range</p>
        <div className="max-w-60 px-1">
          <Slider
            value={priceRange}
            onChange={(_, value) => setPriceRange(value as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={10}
            sx={{
              color: "#10B981",
              height: 6,
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
              },
              "& .MuiSlider-rail": {
                opacity: 0.25,
              },
            }}
          />
          <div className="mt-1 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
