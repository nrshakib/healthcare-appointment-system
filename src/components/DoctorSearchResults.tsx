"use client";

import { useMemo } from "react";
import { FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    location: "New York, NY",
    rating: 4.9,
    reviews: 120,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 85,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 64,
    available: false,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    location: "Houston, TX",
    rating: 4.9,
    reviews: 210,
    available: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "General Practitioner",
    location: "Phoenix, AZ",
    rating: 4.6,
    reviews: 45,
    available: true,
  },
];

export default function DoctorSearchResults({
  doctor,
  location,
  date,
}: {
  doctor?: string;
  location?: string;
  date?: string;
}) {
  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchDoctor =
        !doctor ||
        d.name.toLowerCase().includes(doctor.toLowerCase()) ||
        d.specialty.toLowerCase().includes(doctor.toLowerCase());
      const matchLocation =
        !location ||
        d.location.toLowerCase().includes(location.toLowerCase());
      return matchDoctor && matchLocation;
    });
  }, [doctor, location]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.length === 0 ? (
        <p className="text-gray-600 col-span-full">No doctors found matching your criteria.</p>
      ) : (
        filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.specialty}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  doc.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.available ? "Available" : "Unavailable"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FaMapMarkerAlt className="text-gray-400" />
              {doc.location}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FaStar className="text-yellow-500" />
              <span className="font-medium">{doc.rating}</span>
              <span className="text-gray-500">({doc.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FaClock className="text-gray-400" />
              {date ? `Booked for ${date}` : "Available this week"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
