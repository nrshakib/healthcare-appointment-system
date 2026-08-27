"use client";

import CurrentDateTime from "@/components/CurrentDateTime";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Avatar, Chip, Paper, Divider } from "@mui/material";
import {
  HiCalendarDays,
  HiCheckCircle,
  HiClipboardDocumentList,
  HiClock,
  HiCurrencyDollar,
  HiDocumentText,
  HiVideoCamera,
} from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import {
  upcomingAppointments,
  activePrescriptions,
  medicalRecords,
  recentMessages,
  duePayments,
} from "@/utils/PatientDashboardData/patientDashboardData";
import {
  Appointment,
  Payment,
  Prescription,
} from "@/components/types/PatientDashboardTypes/OverviewPageTypes";

export default function PatientDashboardPage() {
  const hour: number = new Date().getHours();
  const greetings: "Midnight" | "Morning" | "Afternoon" | "Evening" | "Night" =
    hour === 0
      ? "Midnight"
      : hour < 5
        ? "Night"
        : hour < 12
          ? "Morning"
          : hour < 17
            ? "Afternoon"
            : hour < 21
              ? "Evening"
              : "Night";

  const greetingPrefix: "Happy" | "Good" =
    greetings === "Midnight" ? "Happy" : "Good";

  const user = "John Doe";

  const totalAppointments = (upcomingAppointments as Appointment[]).filter(
    (a) => a.status === "upcoming",
  ).length;
  const totalPrescriptions = (activePrescriptions as Prescription[]).filter(
    (p) => p.status === "active",
  ).length;
  const totalDue = (duePayments as Payment[]).filter(
    (p) => p.status === "pending" || p.status === "overdue",
  ).length;
  const totalDueAmount = (duePayments as Payment[])
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const sortedUpcomingAppointments: Appointment[] = [
    ...(upcomingAppointments as Appointment[]),
  ].sort(
    (a: Appointment, b: Appointment) =>
      new Date(`${a.date} ${a.time}`).getTime() -
      new Date(`${b.date} ${b.time}`).getTime(),
  );
  const recentUpcomingAppointments: Appointment[] =
    sortedUpcomingAppointments.slice(0, 2);

  const stats = [
    {
      title: "Upcoming Appointments",
      value: totalAppointments,
      subtitle: null,
      icon: <HiCalendarDays />,
      href: "/patient-dashboard/appointments",
      linkText: "View all",
    },
    {
      title: "Active Prescriptions",
      value: totalPrescriptions,
      subtitle: null,
      icon: <HiClipboardDocumentList />,
      href: "/patient-dashboard/prescriptions",
      linkText: "View all",
    },
    {
      title: "Due Payments",
      value: totalDue,
      subtitle: `( ৳${totalDueAmount.toLocaleString()} total )`,
      icon: <HiCurrencyDollar />,
      href: "/patient-dashboard/payments",
      linkText: "Pay now",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-lg sm:text-xl font-medium text-black">
            {greetingPrefix} {greetings},{" "}
            <span className="text-xl sm:text-2xl text-primary font-semibold">
              {user}
            </span>
          </p>
          <h1 className="text-sm sm:text-base font-medium text-slate-600">
            Your health management portal is here.
          </h1>
        </div>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#d1fae5",
            px: 1.5,
            py: 1,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: "0.875rem",
            width: { xs: "fit-content", sm: "auto" },
          }}
        >
          <CurrentDateTime />
        </Paper>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            variant="outlined"
            sx={{
              borderRadius: 4,
              bgcolor: "#fcfcfc",
              borderColor: "#f1f5f9",
              transition: "box-shadow .2s",
              "&:hover": { boxShadow: 5 },
              boxShadow: 1,
            }}
          >
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] sm:text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    {stat.subtitle && (
                      <p className="text-slate-600">{stat.subtitle}</p>
                    )}
                  </div>
                </div>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: { xs: 32, md: 40, xl: 48 },
                    height: { xs: 32, md: 40, xl: 48 },
                    borderRadius: 3,
                    bgcolor: "#ecfdf5",
                    color: "#06836b",
                  }}
                >
                  {stat.icon}
                </Avatar>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  href={stat.href}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:bg-[#eaf7f1] hover:scale-105 px-2 py-1 rounded-sm transition-all"
                >
                  <span>{stat.linkText}</span>
                  <FaArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming appointments */}
      <Card variant="outlined" sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}>
        <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-5">
          <h2 className="sm:text-lg font-bold text-slate-900">
            Upcoming Appointments
          </h2>
          <Link
            href="/patient-dashboard/appointments"
            className="text-[13px] sm:text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <Divider />
        <div className="p-4 sm:p-5 space-y-4">
          {recentUpcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    bgcolor: "#f1f5f9",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={apt.image}
                    alt={apt.doctorName}
                    fill
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {apt.doctorName}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {apt.speciality}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <HiCalendarDays className="size-3.5" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock className="size-3.5" />
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 pl-[64px] sm:pl-0">
                <Chip
                  size="small"
                  icon={
                    apt.type === "Online" ? (
                      <HiVideoCamera className="size-3" />
                    ) : undefined
                  }
                  label={apt.type}
                  sx={
                    apt.type === "Online"
                      ? { bgcolor: "#f0f9ff", color: "#0369a1" }
                      : { bgcolor: "#eef2ff", color: "#4338ca" }
                  }
                />
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <FaLocationDot className="size-3.5" />
                  {apt.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Prescriptions */}
        <Card
          variant="outlined"
          sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}
        >
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-5">
            <h2 className="sm:text-lg font-bold text-slate-900">
              Active Prescriptions
            </h2>
            <Link
              href="/patient-dashboard/prescriptions"
              className="text-[13px] sm:text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <Divider />
          <div className="p-5 space-y-4">
            {activePrescriptions.slice(0, 2).map((rx) => (
              <Card
                key={rx.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: "#f1f5f9",
                  transition: "border-color .2s",
                  "&:hover": { borderColor: "#a7f3d0" },
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 text-sm">
                      {rx.medication}
                    </p>
                    <Chip
                      size="small"
                      icon={<HiCheckCircle className="size-3" />}
                      label={rx.status}
                      sx={{ bgcolor: "#ecfdf5", color: "#047857" }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{rx.doctorName}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <span>{rx.dosage}</span>
                    <span className="text-slate-300">•</span>
                    <span>{rx.frequency}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <HiClock className="size-3.5" />
                    <span>
                      {rx.startDate} — {rx.endDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>

        {/* Medical Records */}
        <Card
          variant="outlined"
          sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}
        >
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-5">
            <h2 className="sm:text-lg font-bold text-slate-900">
              Medical Records
            </h2>
            <Link
              href="/patient-dashboard/medical-records"
              className="text-[13px] sm:text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <Divider />
          <div className="p-5 space-y-4">
            {medicalRecords.slice(0, 2).map((rec) => (
              <Card
                key={rec.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: "#f1f5f9",
                  transition: "border-color .2s",
                  "&:hover": { borderColor: "#a7f3d0" },
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <div className="flex items-start gap-3">
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "#f1f5f9",
                        mt: 0.25,
                      }}
                    >
                      <HiDocumentText className="size-5 text-slate-500" />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900 text-sm truncate">
                          {rec.title}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            rec.status === "available"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {rec.type} • {rec.doctorName}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <HiCalendarDays className="size-3.5" />
                        {rec.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>

        {/* Messages */}
        <Card
          variant="outlined"
          sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}
        >
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-5">
            <h2 className="sm:text-lg font-bold text-slate-900">Messages</h2>
            <Link
              href="/patient-dashboard/messages"
              className="text-[13px] sm:text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <Divider />
          <div className="p-5 space-y-4">
            {recentMessages.slice(0, 2).map((msg) => (
              <Card
                key={msg.id}
                variant="outlined"
                sx={
                  msg.unread
                    ? {
                        borderRadius: 3,
                        borderColor: "#a7f3d0",
                        bgcolor: "rgba(236,253,245,0.3)",
                      }
                    : {
                        borderRadius: 3,
                        borderColor: "#f1f5f9",
                        transition: "border-color .2s",
                        "&:hover": { borderColor: "#a7f3d0" },
                      }
                }
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <div className="flex items-start gap-3">
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      src={msg.avatar}
                      alt={msg.senderName}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900 text-sm truncate">
                          {msg.senderName}
                        </p>
                        {msg.unread && (
                          <span className="size-2 rounded-full bg-primary shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-0.5 truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {msg.preview}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{msg.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
