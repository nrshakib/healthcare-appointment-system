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
  color,
}: {
  title: string;
  links: { href: string; label: string }[];
  color: string;
}) {
  return (
    <div>
      <p className="text-base sm:text-lg font-semibold text-primary mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-2.5 text-sm sm:text-base font-medium">
        {links.map(({ href, label }, idx) => (
          <Link
            key={idx}
            href={href}
            className={`${color} transition-colors w-fit`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-100">
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
          <p className="text-gray-500 text-xs sm:text-sm lg:w-[85%] leading-relaxed">
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
                className="flex items-center justify-center w-9 h-9 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Find Care"
          links={findCareLinks}
          color="text-olive-600 hover:text-slate-700"
        />
        <FooterColumn
          title="Services"
          links={serviceLinks}
          color="text-slate-600 hover:text-amber-800"
        />
        <FooterColumn
          title="Resources"
          links={resourceLinks}
          color="text-amber-700 hover:text-olive-700"
        />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 px-6 sm:px-8 lg:px-20 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="font-medium hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-medium hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
