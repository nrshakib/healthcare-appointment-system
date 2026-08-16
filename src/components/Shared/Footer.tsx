import Image from "next/image";
import Link from "next/link";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 px-2 sm:px-8 lg:px-20 py-16 bg-gray-100">
      <div className="space-y-5">
        <Link
          href="/"
          className="flex items-center h-5 sm:h-10 w-28 sm:w-40"
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
        <p className="text-gray-400 text-xs sm:text-sm lg:w-[80%]">
          Your health, our priority. We Connect you with trusted doctors and
          quality care.
        </p>
        <div className="flex items-center gap-2">
          <Link href="facebook.com" className="bg-primary/20 p-2 rounded-full">
            <FaFacebook />
          </Link>
          <Link href="x.com" className="bg-primary/20 p-2 rounded-full">
            <FaXTwitter />
          </Link>
          <Link href="instagram.com" className="bg-primary/20 p-2 rounded-full">
            <FaInstagram />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-primary mb-2">Find Care</p>
        <div className="flex flex-col gap-.5 text-orange-400  text-sm sm:text-base">
          <Link href="/find-care/doctors" className="hover:text-primary">
            Find a Doctor
          </Link>
          {/* <Link href="/" className="hover:text-primary">
            Find a Clinic
          </Link>
          <Link href="/" className="hover:text-primary">
            Find a Hospital
          </Link> */}
          <Link href="/find-care/specialities" className="hover:text-primary">
            Specialities
          </Link>
          <Link
            href="/find-care/available-today"
            className="hover:text-primary"
          >
            Available Today
          </Link>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-primary mb-2">Services</p>
        <div className="flex flex-col gap-.5 text-gray-500 text-sm sm:text-base">
          <Link href="/" className="hover:text-primary">
            Book Appointment
          </Link>
          <Link href="/" className="hover:text-primary">
            Video Consultation
          </Link>
          <Link href="/" className="hover:text-primary">
            Modical Reports
          </Link>
          <Link href="/" className="hover:text-primary">
            Prescriptions
          </Link>
          <Link href="/" className="hover:text-primary">
            Lab Tests
          </Link>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-primary mb-2">Resources</p>
        <div className="flex flex-col gap-0.5 text-stone-600 text-sm sm:text-base">
          <Link href="/" className="hover:text-primary">
            Health Articles
          </Link>
          <Link href="/" className="hover:text-primary">
            Health Guides
          </Link>
          <Link href="/" className="hover:text-primary">
            FAQs
          </Link>
          <Link href="/" className="hover:text-primary">
            Help Center
          </Link>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-primary mb-2">Dashboards</p>
        <div className="flex flex-col gap-0.5 text-[#17223e] text-sm sm:text-base">
          <Link href="/" className="hover:text-primary">
            Doctor Dashboard
          </Link>
          <Link href="/" className="hover:text-primary">
            Patient Dashboard
          </Link>
          <Link href="/" className="hover:text-primary">
            Provider Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
