import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function GetStarted() {
  return (
    <div className="py-5">
      <div className="flex flex-col items-center gap-6 lg:gap-4  px-6 py-8 sm:px-8 sm:py-10 lg:py-4 lg:flex-row lg:items-center lg:justify-between bg-linear-to-r from-[#085d4c] to-[#12a762] max-w-[92%] sm:max-w-[88%] xl:max-w-[80%] mx-auto rounded-3xl text-center lg:text-left">
      <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-center">
        <div className="shrink-0 p-2 sm:p-3 rounded-full bg-white size-10 sm:size-16 lg:size-20">
          <Image
            src="/images/medicare-logo.png"
            alt="Medicare Logo"
            width={100}
            height={100}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="text-white">
          <p className="text-lg sm:text-2xl font-semibold sm:font-normal">
            Ready to take control of your health?
          </p>
          <p className="mt-1 text-sm sm:text-base sm:w-3/4 lg:w-auto lg:max-w-md mx-auto lg:mx-0">
            Join thousands of patients who trust MediCare for their healthcare
            needs.
          </p>
        </div>
      </div>
      <Link
        href="/register"
        className="flex w-full items-center justify-center gap-2 bg-white px-8 py-3 sm:py-2 text-sm sm:text-base text-primary rounded-lg sm:w-auto shrink-0 hover:bg-emerald-500 hover:text-white hover:border-2 hover:border-gray-300"
      >
        <p className="font-medium">Get Started Today</p>
        <FaArrowRight />
      </Link>
    </div>
    </div>
  );
}
