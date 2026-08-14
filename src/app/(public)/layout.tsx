import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
