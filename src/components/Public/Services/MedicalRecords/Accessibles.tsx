"use client";

import React from "react";
import { Card, CardContent } from "@mui/material";
import { motion, Variants } from "framer-motion";
import {
  MdOutlineHealthAndSafety,
  MdOutlineScience,
  MdOutlineDescription,
  MdOutlineVaccines,
  MdOutlineFolderOpen,
  MdOutlineShare,
} from "react-icons/md";

interface AccessItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const items: AccessItem[] = [
  {
    icon: MdOutlineHealthAndSafety,
    title: "Health Summary",
    description: "View your allergies, medical conditions, and health history.",
  },
  {
    icon: MdOutlineScience,
    title: "Lab Reports",
    description: "Access your test results and lab reports in one place.",
  },
  {
    icon: MdOutlineDescription,
    title: "Prescriptions",
    description: "View your current and past prescriptions digitally.",
  },
  {
    icon: MdOutlineVaccines,
    title: "Immunizations",
    description: "Track your vaccinations and immunization records.",
  },
  {
    icon: MdOutlineFolderOpen,
    title: "Documents",
    description: "Upload and store important medical documents securely.",
  },
  {
    icon: MdOutlineShare,
    title: "Share Records",
    description: "Share your records securely with your doctor or specialist.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Accessibles() {
  return (
    <section className="w-full py-8 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-bold tracking-tight text-2xl sm:text-3xl md:text-[2rem] text-[#101828] pb-2 border-b-2 border-[#16A672] w-fit mx-auto">
            What You Can Access
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ height: "100%" }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  border: "1px solid #EAECEA",
                  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
                  transition: "box-shadow 0.3s ease-out",
                  "&:hover": {
                    boxShadow:
                      "0 20px 25px -5px rgba(16,24,40,0.1), 0 8px 10px -6px rgba(16,24,40,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    px: { xs: 3, sm: 3.5 },
                    py: { xs: 3.5, sm: 4 },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#E5F6EE" }}
                  >
                    <Icon size={26} color="#16A672" />
                  </motion.div>

                  <p
                    className="font-semibold text-[1.05rem] mb-1.5"
                    style={{ color: "#101828" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#667085" }}
                  >
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
