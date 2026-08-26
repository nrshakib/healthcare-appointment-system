"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";

export default function CurrentDateTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(dayjs().format("D MMM, YYYY, h:mm:ss a"));

    const initial = setTimeout(update, 0);
    const timer = setInterval(update, 1000);

    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, []);

  if (now === null) {
    return <CircularProgress size={20} color="inherit" />;
  }

  return <span>{now}</span>;
}
