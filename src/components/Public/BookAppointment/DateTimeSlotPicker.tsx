"use client";

import { useRef, useEffect, useState } from "react";
import { FaRegClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface CalendarDateItem {
  fullDate: Date;
  dayName: string;
  shortDay: string;
  dayNumber: number;
  monthShort: string;
  formattedIso: string;
  isToday: boolean;
  isAvailableDay: boolean;
}

interface DateTimeSlotPickerProps {
  calendarDates: CalendarDateItem[];
  selectedDate: string;
  onDateSelect: (isoDate: string) => void;
  timeSlots: string[];
  selectedSlot: string;
  onSlotSelect: (slot: string) => void;
}

export default function DateTimeSlotPicker({
  calendarDates,
  selectedDate,
  onDateSelect,
  timeSlots,
  selectedSlot,
  onSlotSelect,
}: DateTimeSlotPickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrow buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [calendarDates]);

  // Slide left by one date item width (~92px)
  const slideLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -96, behavior: "smooth" });
      setTimeout(checkScrollPosition, 250);
    }
  };

  // Slide right by one date item width (~92px)
  const slideRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 96, behavior: "smooth" });
      setTimeout(checkScrollPosition, 250);
    }
  };

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-7 rounded-full bg-[#06836b] text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Choose Date & Available Slot
          </h3>
        </div>
      </div>

      {/* Date Carousel with Left & Right Arrow Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Appointment Date
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={slideLeft}
              disabled={!canScrollLeft}
              aria-label="Previous date"
              className="size-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={slideRight}
              disabled={!canScrollRight}
              aria-label="Next date"
              className="size-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth"
          >
            {calendarDates.map((item) => {
              const isSelected = selectedDate === item.formattedIso;
              return (
                <button
                  key={item.formattedIso}
                  type="button"
                  onClick={() => onDateSelect(item.formattedIso)}
                  className={`shrink-0 w-20 sm:w-22 py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-[#06836b] text-white border-[#06836b] shadow-md scale-102"
                      : "bg-slate-50 hover:bg-emerald-50/70 border-slate-200/80 text-slate-700 hover:border-emerald-200"
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold ${
                      isSelected ? "text-emerald-100" : "text-slate-500"
                    }`}
                  >
                    {item.shortDay}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold leading-none">
                    {item.dayNumber}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-tight ${
                      isSelected ? "text-emerald-100" : "text-slate-400"
                    }`}
                  >
                    {item.monthShort}
                  </span>
                  <span
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-emerald-100 text-[#06836b]"
                    }`}
                  >
                    Available
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Time Slot
          </label>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <FaRegClock className="text-[#06836b]" />
            30 mins per session
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSlotSelect(slot)}
                className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-[#06836b] text-white border-[#06836b] shadow-xs"
                    : "bg-slate-50 hover:bg-emerald-50/60 text-slate-700 border-slate-200"
                }`}
              >
                <FaRegClock
                  className={`text-xs ${
                    isSelected ? "text-white" : "text-primary"
                  }`}
                />
                <span>{slot}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
