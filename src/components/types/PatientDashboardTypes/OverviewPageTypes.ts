export interface Appointment {
  id: string | number;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  image: string;
  type: "Online" | "In-person";
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}
 
export interface Prescription {
  id: string | number;
  medication: string;
  doctorName: string;
  status: "active" | "completed" | "expired";
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}
 
export interface MedicalRecord {
  id: string | number;
  title: string;
  type: string;
  doctorName: string;
  date: string;
  status: "available" | "pending";
}
 
export interface Message {
  id: string | number;
  senderName: string;
  subject: string;
  preview: string;
  date: string;
  avatar: string;
  unread: boolean;
}
 
export interface Payment {
  id: string | number;
  amount: number;
  status: "pending" | "overdue" | "paid";
}