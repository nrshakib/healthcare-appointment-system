import DashboardLayout from "@/components/Layouts/DashboardLayout";

export default function DoctorLayout({ children }: LayoutProps<"/doctor">) {
  return <DashboardLayout role="doctor">{children}</DashboardLayout>;
}
