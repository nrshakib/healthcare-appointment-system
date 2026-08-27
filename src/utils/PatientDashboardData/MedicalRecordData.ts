interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  type: "Lab Report" | "Imaging" | "Vaccination" | "Surgery";
  doctorName: string;
  status: "available" | "pending";
}

export const medicalRecords: MedicalRecord[] = [
  {
    id: "rec-001",
    title: "Complete Blood Count (CBC)",
    date: "2026-08-18",
    type: "Lab Report",
    doctorName: "Dr. Sarah Ahmed",
    status: "available",
  },
  {
    id: "rec-002",
    title: "Chest X-Ray",
    date: "2026-08-10",
    type: "Imaging",
    doctorName: "Dr. Kamal Hossain",
    status: "available",
  },
  {
    id: "rec-003",
    title: "COVID-19 Vaccination (2nd Dose)",
    date: "2026-07-28",
    type: "Vaccination",
    doctorName: "Dr. Nasreen Akter",
    status: "available",
  },
  {
    id: "rec-004",
    title: "Appendectomy Report",
    date: "2026-08-22",
    type: "Surgery",
    doctorName: "Dr. Tanvir Rahman",
    status: "pending",
  },
];
