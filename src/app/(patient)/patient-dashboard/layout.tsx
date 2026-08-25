import DashboardLayout from "@/components/Layouts/DashboardLayout";

export default function PatientLayout({ children }: LayoutProps<"/patient-dashboard">) {
  return <DashboardLayout role="patient">{children}</DashboardLayout>;
}
