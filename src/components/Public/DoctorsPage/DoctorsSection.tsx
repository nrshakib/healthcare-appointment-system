"use client";

import React, { useState } from "react";
import doctors from "@/utils/doctors";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  Pagination,
} from "@mui/material";
import { AiOutlineClockCircle, AiOutlineBook } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function DoctorsSection() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDoctors = doctors.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-3">
        {paginatedDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            sx={{
              height: "100%",
              display: "flex",
              borderRadius: 2,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <div className="relative">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={100}
                height={100}
              />
              {doctor.availableDays.includes("Sunday") ||
              doctor.availableDays.includes("Saturday") ||
              doctor.availableDays.includes(
                new Date().toLocaleDateString("en-US", { weekday: "long" }),
              ) ? (
                <Chip
                  label="Available Today"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#10B981",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
              ) : (
                <Chip
                  label="Not Available"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#EF4444",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
              )}
            </div>

            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <p>{doctor.name}</p>
              <p>{doctor.speciality}</p>
              <p className="flex items-center">
                <AiOutlineBook fontSize="small" />
                {doctor.degree}
              </p>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={doctor.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <p>{doctor.rating}</p>
                <p>({doctor.reviewCount} reviews)</p>
              </Box>
              <p>{doctor.experience} years experience</p>
              <div className="flex items-center gap-1">
                <AiOutlineClockCircle fontSize="small" />
                <Typography variant="body2">
                  {doctor.consultationType}
                </Typography>
              </div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <p>৳{doctor.consultationFee}</p>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  href={`/doctors/${doctor.id}`}
                  sx={{
                    backgroundColor: "#10B981",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#059669",
                    },
                  }}
                >
                  View Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: 500,
            },
          }}
        />
      )}
    </div>
  );
}
