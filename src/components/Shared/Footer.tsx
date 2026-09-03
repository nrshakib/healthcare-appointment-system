import Image from "next/image";
import Link from "next/link";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const findCareLinks = [
  { href: "/find-care/doctors", label: "Find a Doctor" },
  { href: "/find-care/specialities", label: "Specialities" },
  { href: "/find-care/available-today", label: "Available Today" },
];

const serviceLinks = [
  { href: "/services/appointment", label: "Book Appointment" },
  { href: "/services/video-consultation", label: "Video Consultation" },
  { href: "/services/in-person-consultation", label: "In Person Consultation" },
  { href: "/services/medical-records", label: "Medical Records" },
];

const resourceLinks = [
  { href: "/resources/health-articles", label: "Health Articles" },
  { href: "/resources/frequently-asked-questions", label: "FAQs" },
  { href: "/resources/help-center", label: "Help Center" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
  { href: "https://x.com", icon: FaXTwitter, label: "X (Twitter)" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-base sm:text-lg font-semibold footer-heading mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-2.5 text-sm sm:text-base font-medium">
        {links.map(({ href, label }, idx) => (
          <Link key={idx} href={href} className="footer-link w-fit">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-10 px-6 sm:px-8 lg:px-20 py-16">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 space-y-5">
          <Link
            href="/"
            className="flex items-center h-8 sm:h-10 w-28 sm:w-40"
            aria-label="MediCare Home"
          >
            <Image
              src="/images/medicare-logo2.png"
              alt="MediCare Logo"
              width={180}
              height={40}
              loading="eager"
              priority
            />
          </Link>
          <p className="footer-text text-xs sm:text-sm lg:w-[85%] leading-relaxed">
            Your health, our priority. We connect you with trusted doctors and
            quality care.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }, idx) => (
              <Link
                key={idx}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Find Care"
          links={findCareLinks}
        />
        <FooterColumn
          title="Services"
          links={serviceLinks}
        />
        <FooterColumn
          title="Resources"
          links={resourceLinks}
        />
      </div>

      {/* Bottom bar */}
      <div className="footer-border border-t px-6 sm:px-8 lg:px-20 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm footer-text">
          <p>
            &copy; {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="footer-link font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="footer-link font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
