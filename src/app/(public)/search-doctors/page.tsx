// import { Suspense } from "react";
// import Navbar from "@/components/Shared/Navbar";
// import Footer from "@/components/Shared/Footer";
// import DoctorSearchResults from "@/components/DoctorSearchResults";

// export default function DoctorsPage({
//   searchParams,
// }: {
//   searchParams: { doctor?: string; location?: string; date?: string };
// }) {
//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
//         <p className="text-gray-600 mb-6">
//           {searchParams.doctor || searchParams.location || searchParams.date
//             ? `Showing results for: ${[searchParams.doctor, searchParams.location, searchParams.date].filter(Boolean).join(" | ")}`
//             : "Browse all available doctors"}
//         </p>
//         <Suspense fallback={<div>Loading...</div>}>
//           <DoctorSearchResults
//             doctor={searchParams.doctor}
//             location={searchParams.location}
//             date={searchParams.date}
//           />
//         </Suspense>
//       </div>
//       <Footer />
//     </>
//   );
// }

import ComingSoon from "@/components/Shared/ComingSoon";
import React from "react";

export default function SearchDoctors() {
  return (
    <div>
      <ComingSoon />
    </div>
  );
}
