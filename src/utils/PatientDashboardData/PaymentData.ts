interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
}

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
