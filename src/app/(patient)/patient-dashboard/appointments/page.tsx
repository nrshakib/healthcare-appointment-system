"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import Link from "next/link";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  HiCalendarDays,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiVideoCamera,
} from "react-icons/hi2";
import { FaNotesMedical, FaLocationDot } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

import { allAppointments } from "@/utils/PatientDashboardData/patientDashboardData";
import { Appointment } from "@/components/types/PatientDashboardTypes/OverviewPageTypes";
import { FaUser } from "react-icons/fa";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`appointments-tabpanel-${index}`}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `appointments-tab-${index}`,
    "aria-controls": `appointments-tabpanel-${index}`,
  };
}

export default function PatientAppointments() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredAppointments = (): Appointment[] => {
    let result = allAppointments;

    if (selectedDate) {
      result = result.filter((a) => dayjs(a.date).isSame(selectedDate, "day"));
    }

    switch (tabValue) {
      case 1:
        result = result.filter((a) => a.status === "upcoming");
        break;
      case 2:
        result = result.filter((a) => a.status === "completed");
        break;
      case 3:
        result = result.filter((a) => a.status === "cancelled");
        break;
      default:
        break;
    }

    return result;
  };

  const todayAppointments = allAppointments.filter((a) => {
    const today = dayjs().format("YYYY-MM-DD");
    return a.date === today;
  });

  const getStatusChip = (status: string) => {
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    switch (status) {
      case "upcoming":
        return (
          <Chip
            size="small"
            icon={<HiClock className="size-3 text-amber-800" />}
            label={label}
            sx={{ bgcolor: "#fef3c7", color: "#92400e" }}
          />
        );
      case "completed":
        return (
          <Chip
            size="small"
            icon={<HiCheckCircle className="size-3 text-emerald-700" />}
            label={label}
            sx={{ bgcolor: "#ecfdf5", color: "#047857" }}
          />
        );
      case "cancelled":
        return (
          <Chip
            size="small"
            icon={<HiXCircle className="size-3 text-red-800" />}
            label={label}
            sx={{ bgcolor: "#fee2e2", color: "#991b1b" }}
          />
        );
      default:
        return null;
    }
  };

  const appointmentCard = (
    apt: Appointment,
    index: React.Key | null | undefined,
  ) => {
    const handleCancel = () => {
      alert(`Cancel appointment ${apt.id}`);
    };

    return (
      <Card
        key={index}
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "#f1f5f9",
          transition: "border-color .2s, background-color .2s",
          "&:hover": { borderColor: "#a7f3d0", bgcolor: "#f8fafc" },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:items-center">
            {/* Doctor info */}
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <Avatar
                variant="rounded"
                sx={{
                  width: { xs: 44, sm: 52 },
                  height: { xs: 44, sm: 52 },
                  borderRadius: 3,
                  bgcolor: "#f1f5f9",
                  flexShrink: 0,
                  position: "relative",
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
                <p className="font-semibold text-slate-900 truncate text-sm sm:text-base">
                  {apt.doctorName}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  {apt.speciality}
                </p>
              </div>
            </div>

            {/* Date / type / location */}
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-600 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-1.5">
                  <HiCalendarDays className="size-3.5 text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">{apt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiClock className="size-3.5 text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">{apt.time}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <Chip
                  variant="outlined"
                  size="small"
                  icon={
                    apt.type === "Online" ? (
                      <HiVideoCamera style={{ fontSize: 14 }} />
                    ) : (
                      <FaUser style={{ fontSize: 12 }} />
                    )
                  }
                  label={apt.type}
                  sx={{
                    px: 1,
                    flexShrink: 0,
                    borderColor:
                      apt.type === "Online" ? "secondary.main" : "primary.main",
                    color:
                      apt.type === "Online" ? "secondary.main" : "primary.main",
                    "& .MuiChip-icon": {
                      color:
                        apt.type === "Online"
                          ? "secondary.main"
                          : "primary.main",
                    },
                  }}
                />
                <div className="flex items-center gap-1.5 min-w-0">
                  <FaLocationDot className="size-3.5 text-green-700 shrink-0" />
                  <span className="truncate">{apt.location}</span>
                </div>
              </div>
            </div>

            {/* Status + actions */}
            <div className="flex flex-col items-start md:items-end gap-2">
              {getStatusChip(apt.status)}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                <Link
                  href={`/patient-dashboard/appointments/${apt.id}`}
                  className="text-xs font-medium text-primary border border-primary/30 px-3 py-1.5 rounded hover:bg-emerald-50 transition-colors whitespace-nowrap"
                >
                  View Details
                </Link>
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    whiteSpace: "nowrap",
                  }}
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      <div>
        <p className="text-lg sm:text-xl font-medium text-black">
          Appointments
        </p>
        <p className="text-sm text-slate-600">
          Manage your appointments and consultations
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-3">
        {/* Left */}
        <div className="lg:col-span-3 min-w-0">
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}
          >
            <div>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="appointments filter tabs"
                variant={isXs ? "scrollable" : "fullWidth"}
                scrollButtons={isXs ? "auto" : false}
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    color: "#64748b",
                    minWidth: { xs: "auto", sm: 90 },
                    px: { xs: 1.5, sm: 2 },
                    "&.Mui-selected": {
                      color: "#06836b",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#06836b",
                  },
                }}
              >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Upcoming" {...a11yProps(1)} />
                <Tab label="Completed" {...a11yProps(2)} />
                <Tab label="Cancelled" {...a11yProps(3)} />
              </Tabs>
            </div>

            <Divider />
            <TabPanel value={tabValue} index={0}>
              <div className="p-3 sm:p-4 md:p-5 space-y-2">
                {filteredAppointments().length > 0 ? (
                  filteredAppointments().map(appointmentCard)
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>No appointments found.</p>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Divider />
              <div className="p-3 sm:p-4 md:p-5 space-y-2">
                {filteredAppointments().length > 0 ? (
                  filteredAppointments().map(appointmentCard)
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>No upcoming appointments.</p>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Divider />
              <div className="p-3 sm:p-4 md:p-5 space-y-2">
                {filteredAppointments().length > 0 ? (
                  filteredAppointments().map(appointmentCard)
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>No completed appointments.</p>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Divider />
              <div className="p-3 sm:p-4 md:p-5 space-y-2">
                {filteredAppointments().length > 0 ? (
                  filteredAppointments().map(appointmentCard)
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>No cancelled appointments.</p>
                  </div>
                )}
              </div>
            </TabPanel>
          </Card>
        </div>

        {/* Right */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6 min-w-0">
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, borderColor: "#f1f5f9" }}
          >
            <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Calendar</h2>
              </div>
              {selectedDate && (
                <IconButton
                  size="small"
                  onClick={() => setSelectedDate(null)}
                  sx={{ color: "#64748b" }}
                  aria-label="Clear date filter"
                >
                  <FaXmark className="size-4" />
                </IconButton>
              )}
            </div>
            <Divider />
            <div className="px-1 sm:px-0 py-2 sm:py-3 overflow-x-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation="portrait"
                  openTo="day"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  disablePast
                  slots={{
                    toolbar: () => null,
                  }}
                  slotProps={{
                    actionBar: { actions: [] },
                  }}
                  sx={{
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                    "& .MuiPickersLayout-contentWrapper": {
                      width: "100%",
                      minWidth: 0,
                    },
                    "& .MuiDateCalendar-root": {
                      width: "100%",
                      minWidth: 0,
                      maxHeight: "none",
                    },
                    "& .MuiPickersDay-root": {
                      fontSize: { xs: "0.75rem", sm: "0.875rem", lg: "0.6rem" },
                      width: { lg: 32 },
                      height: { lg: 32 },
                      margin: { lg: "0 2px" },
                    },
                    "& .MuiDayCalendar-weekContainer": {
                      margin: { lg: "0" },
                      justifyContent: { lg: "space-between" },
                    },
                    "& .MuiDayCalendar-header": {
                      justifyContent: { lg: "space-between" },
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      fontSize: { lg: "0.7rem" },
                      width: { lg: 32 },
                      margin: { lg: "0 2px" },
                    },
                    "& .MuiPickersCalendarHeader-label": {
                      fontSize: { lg: "0.85rem" },
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      "& svg": {
                        fontSize: { lg: "1.1rem" },
                      },
                    },
                    "& .MuiPickersDay-today": {
                      borderColor: "#06836b",
                      backgroundColor: "#ecfdf5 !important",
                      color: "#06836b",
                      "&:hover": {
                        backgroundColor: "#d1fae5 !important",
                      },
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#06836b !important",
                      color: "#ffffff",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </Card>

          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              borderColor: "#f1f5f9",
              backgroundColor: "#F3FAF7",
            }}
          >
            <div className="px-3 sm:px-5 py-3 sm:py-5">
              <h2 className="text-base font-bold text-slate-900">
                Today&apos;s Appointments
              </h2>
            </div>
            <Divider />
            <div className="p-3 sm:p-4 md:p-5 space-y-3">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 min-w-0"
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "#f1f5f9",
                        position: "relative",
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
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {apt.doctorName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {apt.time} • {apt.type}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-2">
                  No appointments scheduled for today.
                </p>
              )}
            </div>
          </Card>

          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              borderColor: "#f1f5f9",
              backgroundColor: "#F0F5FE",
              paddingX: {
                xs: 2.5,
                sm: 3,
              },
              paddingY: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <div className="flex items-center gap-2">
              <FaNotesMedical className="text-primary" />
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Appointment Note
              </h2>
            </div>
            <p className="text-[13px] sm:text-sm mt-1">
              You can cancel or reschedule your appointment up to 2 hours before
              the scheduled time.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
