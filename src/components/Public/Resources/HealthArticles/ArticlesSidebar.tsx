"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuBookOpen, LuStethoscope, LuSparkles } from "react-icons/lu";
import healthArticles from "@/utils/healthArticles";

interface ArticlesSidebarProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function ArticlesSidebar({
  selectedCategory = "",
  onSelectCategory,
}: ArticlesSidebarProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const { categories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    healthArticles.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });

    const uniqueCategories = Object.keys(counts);
    return {
      categories: uniqueCategories,
      categoryCounts: counts,
    };
  }, []);

  // Filter categories by category search
  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((cat) => cat.toLowerCase().includes(query));
  }, [categories, categorySearch]);

  const visibleCategories = categorySearch
    ? filteredCategories
    : showAllCategories
      ? filteredCategories
      : filteredCategories.slice(0, 6);

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      if (selectedCategory === category) {
        onSelectCategory("");
      } else {
        onSelectCategory(category);
      }
    }
  };

  const handleClearCategorySearch = () => {
    setCategorySearch("");
  };

  return (
    <aside className="w-full space-y-6 lg:pr-4">
      {/* Top Section */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
          <LuBookOpen className="text-base" />
          <span>Resource Center</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 leading-tight">
          Health Articles
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Expert health tips, wellness guides, and medical insights from our
          expert doctors &amp; specialists to help you live a healthier life.
        </p>
      </div>

      {/* Category Search and Filter */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        {/* Search Categories Box */}
        <div>
          <label
            htmlFor="category-search"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2"
          >
            Search Categories
          </label>
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
            <input
              id="category-search"
              type="text"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
            {categorySearch && (
              <button
                type="button"
                aria-label="Clear category search"
                onClick={handleClearCategorySearch}
                className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Categories
            </h3>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory?.("")}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {/* All Articles Option */}
            {!categorySearch && (
              <button
                type="button"
                onClick={() => onSelectCategory?.("")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === ""
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LuSparkles
                    className={
                      selectedCategory === ""
                        ? "text-white"
                        : "text-emerald-600"
                    }
                  />
                  <span>All Categories</span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategory === ""
                      ? "bg-emerald-700/80 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {healthArticles.length}
                </span>
              </button>
            )}

            {/* List of categories */}
            {visibleCategories.length > 0 ? (
              visibleCategories.map((category) => {
                const isSelected = selectedCategory === category;
                const count = categoryCounts[category] || 0;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white font-semibold shadow-xs"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{category}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isSelected
                          ? "bg-emerald-700/80 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                No categories found matching &quot;{categorySearch}&quot;
              </div>
            )}
          </div>

          {/* View All / Show Less button when not searching */}
          {!categorySearch && categories.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/40 transition-colors cursor-pointer"
            >
              <span>
                {showAllCategories
                  ? "Show Less Categories"
                  : `View All Categories (${categories.length})`}
              </span>
              {showAllCategories ? (
                <FaChevronUp className="text-[10px]" />
              ) : (
                <FaChevronDown className="text-[10px]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* CTA Card */}
      <div className="rounded-2xl bg-linear-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-md">
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs mb-3">
          <LuStethoscope className="text-xl text-white" />
        </div>
        <h4 className="text-base font-bold leading-snug">
          Need personalized advice?
        </h4>
        <p className="mt-1.5 text-xs text-emerald-100 leading-relaxed">
          Book an in-person or video consultation with our certified doctors
          today.
        </p>
        <Link
          href="/find-care/doctors"
          className="mt-4 inline-block w-full rounded-xl bg-white py-2.5 text-center text-xs font-bold text-emerald-800 shadow-xs transition-all hover:bg-emerald-50 active:scale-98"
        >
          Find a Doctor
        </Link>
      </div>
    </aside>
  );
}
