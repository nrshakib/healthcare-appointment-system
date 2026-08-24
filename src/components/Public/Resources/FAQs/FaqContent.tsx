"use client";

import { useState, useMemo } from "react";
import { Chip, Pagination } from "@mui/material";
import { FaQuestionCircle } from "react-icons/fa";
import {
  LuCalendar,
  LuVideo,
  LuUserCheck,
  LuCreditCard,
  LuFileText,
  LuShieldCheck,
  LuChevronDown,
  LuThumbsUp,
  LuThumbsDown,
  LuRotateCcw,
  LuSparkles,
  LuCheck,
} from "react-icons/lu";
import { faqCategories, faqsData, FaqItem } from "@/utils/faqsData";

interface FaqContentProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function FaqContent({
  searchQuery = "",
  onClearSearch,
}: FaqContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("apt-1");
  const [helpfulFeedback, setHelpfulFeedback] = useState<
    Record<string, "yes" | "no">
  >({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Track previous filter values to reset page during render (React-recommended pattern)
  const [prevFilters, setPrevFilters] = useState({
    category: selectedCategory,
    query: searchQuery,
  });
  if (
    prevFilters.category !== selectedCategory ||
    prevFilters.query !== searchQuery
  ) {
    setPrevFilters({ category: selectedCategory, query: searchQuery });
    setPage(1);
  }

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "LuCalendar":
        return <LuCalendar className="text-sm" />;
      case "LuVideo":
        return <LuVideo className="text-sm" />;
      case "LuUserCheck":
        return <LuUserCheck className="text-sm" />;
      case "LuCreditCard":
        return <LuCreditCard className="text-sm" />;
      case "LuFileText":
        return <LuFileText className="text-sm" />;
      case "LuShieldCheck":
        return <LuShieldCheck className="text-sm" />;
      default:
        return <FaQuestionCircle className="text-sm" />;
    }
  };

  // Filtered FAQ items based on category and search query
  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const matchQuestion = item.question.toLowerCase().includes(query);
      const matchAnswer = item.answer.toLowerCase().includes(query);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(query));

      return matchQuestion || matchAnswer || matchTags;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredFaqs.length / pageSize);
  const paginatedFaqs = filteredFaqs.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqsData.length };
    faqsData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleExpandAll = () => {
    // If all currently visible are expanded or one is expanded, we can toggle or open all
    if (expandedId === "ALL") {
      setExpandedId(null);
    } else {
      setExpandedId("ALL");
    }
  };

  const handleFeedback = (id: string, type: "yes" | "no") => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  const handleCopyQuestionLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const isItemExpanded = (id: string) => {
    return expandedId === "ALL" || expandedId === id;
  };

  return (
    <div className="space-y-8">
      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {faqCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80"
              }`}
            >
              <span className={isSelected ? "text-white" : "text-emerald-600"}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Bar: Results Info + Expand All toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <span className="font-bold text-slate-900">
            {filteredFaqs.length}{" "}
            {filteredFaqs.length === 1 ? "Question" : "Questions"}
          </span>
          {searchQuery && (
            <span>
              matching &ldquo;
              <span className="font-semibold text-emerald-700">
                {searchQuery}
              </span>
              &rdquo;
            </span>
          )}
          {selectedCategory !== "all" && (
            <span className="text-slate-400">
              in{" "}
              <span className="text-slate-700 font-medium capitalize">
                {faqCategories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                onClearSearch?.();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <LuRotateCcw className="text-xs" />
              <span>Reset Filters</span>
            </button>
          )}

          <button
            onClick={handleExpandAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 transition-colors cursor-pointer"
          >
            <span>{expandedId === "ALL" ? "Collapse All" : "Expand All"}</span>
          </button>
        </div>
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3">
          {paginatedFaqs.map((faq: FaqItem) => {
            const isOpen = isItemExpanded(faq.id);
            const feedback = helpfulFeedback[faq.id];
            const isCopied = copiedId === faq.id;

            return (
              <div
                key={faq.id}
                id={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/10"
                    : "border-slate-200/90 shadow-2xs hover:border-slate-300"
                }`}
              >
                {/* Accordion Header / Question */}
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/70 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 pr-2">
                    <div
                      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      ?
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {faq.popular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                            <LuSparkles className="text-[10px] text-amber-500" />
                            Popular
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-emerald-700 capitalize">
                          {
                            faqCategories.find((c) => c.id === faq.category)
                              ?.name
                          }
                        </span>
                      </div>

                      <h3
                        className={`text-xs sm:text-base font-semibold leading-snug transition-colors ${
                          isOpen ? "text-emerald-950" : "text-slate-900"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen
                        ? "bg-emerald-100 text-emerald-700 rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <LuChevronDown className="text-base" />
                  </div>
                </button>

                {/* Accordion Body / Answer */}
                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {faq.answer}
                    </p>

                    {/* Tags */}
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-slate-400 mr-1">
                          Related tags:
                        </span>
                        {faq.tags.map((tag, tIdx) => (
                          <Chip
                            key={tIdx}
                            label={`#${tag}`}
                            size="small"
                            sx={{
                              fontSize: "0.65rem",
                              height: "20px",
                              bgcolor: "#ffffff",
                              color: "#475569",
                              border: "1px solid #e2e8f0",
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Micro Feedback Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[11px]">
                          Was this helpful?
                        </span>
                        <button
                          onClick={() => handleFeedback(faq.id, "yes")}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                            feedback === "yes"
                              ? "bg-emerald-100 border-emerald-300 text-emerald-800 font-bold"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                          }`}
                        >
                          <LuThumbsUp className="text-xs" />
                          <span>Yes</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(faq.id, "no")}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                            feedback === "no"
                              ? "bg-rose-100 border-rose-300 text-rose-800 font-bold"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                          }`}
                        >
                          <LuThumbsDown className="text-xs" />
                          <span>No</span>
                        </button>
                        {feedback && (
                          <span className="text-[11px] text-emerald-700 font-medium">
                            Thank you for your feedback!
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopyQuestionLink(faq.id)}
                        className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <LuCheck className="text-xs text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">
                              Link copied
                            </span>
                          </>
                        ) : (
                          <span>Share Question</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
            <FaQuestionCircle className="text-2xl" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
            No matching questions found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any FAQs matching &ldquo;
            <span className="font-semibold text-slate-700">{searchQuery}</span>
            &rdquo; in{" "}
            {faqCategories.find((c) => c.id === selectedCategory)?.name}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("all");
                onClearSearch?.();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-emerald-700"
            >
              <LuRotateCcw className="text-xs" />
              <span>Clear Search &amp; Show All</span>
            </button>
          </div>
        </div>
      )}

      {/* Pagination — only shown when there are results */}
      {filteredFaqs.length > 0 && totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                borderRadius: "10px",
                color: "#475569",
                minWidth: { xs: "28px", sm: "36px" },
                height: { xs: "28px", sm: "36px" },
                fontSize: { xs: "12px", sm: "14px" },
                margin: { xs: "1px", sm: "3px" },
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#06836b",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#056f5a" },
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(6, 131, 107, 0.08)",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
