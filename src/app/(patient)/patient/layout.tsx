import DashboardLayout from "@/components/Layouts/DashboardLayout";

export default function PatientLayout({ children }: LayoutProps<"/patient">) {
  return <DashboardLayout role="patient">{children}</DashboardLayout>;
}
