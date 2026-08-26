export interface Appointment {
  id: string;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: "In-person" | "Online";
  location: string;
  image: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed";
}

export interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  type: "Lab Report" | "Imaging" | "Vaccination" | "Surgery";
  doctorName: string;
  status: "available" | "pending";
}

export interface Message {
  id: string;
  senderName: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  avatar: string;
}

export interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
}

export const upcomingAppointments: Appointment[] = [
  {
    id: "apt-001",
    doctorName: "Dr. Sarah Ahmed",
    speciality: "Cardiology",
    date: "2026-09-02",
    time: "10:30 AM",
    status: "upcoming",
    type: "In-person",
    location: "Apollo Hospital, Dhaka",
    image: "/images/doctors/doctor-1.png",
  },
  {
    id: "apt-002",
    doctorName: "Dr. Rafiq Islam",
    speciality: "Dermatology",
    date: "2026-09-05",
    time: "02:15 PM",
    status: "upcoming",
    type: "Online",
    location: "Video Consultation",
    image: "/images/doctors/doctor-2.png",
  },
  {
    id: "apt-003",
    doctorName: "Dr. Nasreen Akter",
    speciality: "Pediatrics",
    date: "2026-09-08",
    time: "11:00 AM",
    status: "upcoming",
    type: "In-person",
    location: "Square Hospital, Dhaka",
    image: "/images/doctors/doctor-3.png",
  },
  {
    id: "apt-004",
    doctorName: "Dr. Kamal Hossain",
    speciality: "Orthopedics",
    date: "2026-09-12",
    time: "09:45 AM",
    status: "upcoming",
    type: "Online",
    location: "Video Consultation",
    image: "/images/doctors/doctor-4.png",
  },
];

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

export const recentMessages: Message[] = [
  {
    id: "msg-001",
    senderName: "Dr. Sarah Ahmed",
    subject: "Follow-up on blood pressure readings",
    preview:
      "Please share your latest home BP readings so we can adjust your medication if needed...",
    date: "2026-08-26",
    unread: true,
    avatar: "/images/users/user-avatar-1.png",
  },
  {
    id: "msg-002",
    senderName: "Apollo Hospital, Dhaka",
    subject: "Appointment confirmation",
    preview:
      "Your appointment with Dr. Sarah Ahmed on Sep 2 has been confirmed...",
    date: "2026-08-25",
    unread: true,
    avatar: "/images/users/user-avatar-2.png",
  },
  {
    id: "msg-003",
    senderName: "Dr. Rafiq Islam",
    subject: "Skin test results",
    preview:
      "Your allergy test results are ready. No major concerns were found...",
    date: "2026-08-23",
    unread: false,
    avatar: "/images/users/user-avatar-3.png",
  },
  {
    id: "msg-004",
    senderName: "Pharmacy Care",
    subject: "Prescription refill reminder",
    preview:
      "Your Amoxicillin prescription will finish soon. Refill now to avoid gaps...",
    date: "2026-08-21",
    unread: false,
    avatar: "/images/users/user-avatar-4.png",
  },
];

export const duePayments: Payment[] = [
  {
    id: "pay-001",
    title: "Cardiology Consultation",
    amount: 1500,
    dueDate: "2026-09-02",
    status: "pending",
  },
  {
    id: "pay-002",
    title: "Lab Tests (CBC & Lipid Profile)",
    amount: 2200,
    dueDate: "2026-08-30",
    status: "overdue",
  },
  {
    id: "pay-003",
    title: "X-Ray Imaging",
    amount: 1800,
    dueDate: "2026-09-10",
    status: "pending",
  },
];
