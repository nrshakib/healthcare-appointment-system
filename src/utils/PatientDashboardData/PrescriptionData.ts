interface Prescription {
  id: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed";
}

export const activePrescriptions: Prescription[] = [
  {
    id: "rx-001",
    doctorName: "Dr. Sarah Ahmed",
    medication: "Amlodipine 5mg",
    dosage: "1 tablet",
    frequency: "Once daily",
    startDate: "2026-08-15",
    endDate: "2026-11-15",
    status: "active",
  },
  {
    id: "rx-002",
    doctorName: "Dr. Rafiq Islam",
    medication: "Cetirizine 10mg",
    dosage: "1 tablet",
    frequency: "Twice daily",
    startDate: "2026-08-20",
    endDate: "2026-09-20",
    status: "active",
  },
  {
    id: "rx-003",
    doctorName: "Dr. Nasreen Akter",
    medication: "Amoxicillin 250mg",
    dosage: "1 capsule",
    frequency: "Three times daily",
    startDate: "2026-08-25",
    endDate: "2026-09-04",
    status: "active",
  },
];
