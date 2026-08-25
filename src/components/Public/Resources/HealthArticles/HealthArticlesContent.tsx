"use client";

import { useState } from "react";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import ArticlesMain from "@/components/Public/Resources/HealthArticles/ArticlesMain";
import ArticlesSidebar from "@/components/Public/Resources/HealthArticles/ArticlesSidebar";

export default function HealthArticlesContent() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory("");
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Auto-close sidebar on mobile after picking a category
    setSidebarOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle Button – hidden on lg+ */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-emerald-700 text-sm font-semibold shadow-xs hover:bg-emerald-50 hover:border-emerald-400 transition-all active:scale-95 cursor-pointer"
        >
          {sidebarOpen ? (
            <>
              <FaTimes className="text-base" />
              <span>Close Filters</span>
            </>
          ) : (
            <>
              <FaSlidersH className="text-base" />
              <span>
                Filters
                {selectedCategory && (
                  <span className="ml-1.5 inline-flex items-center justify-center size-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                    1
                  </span>
                )}
              </span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 items-start">
        {/* Sidebar – always visible on lg+, toggle-controlled on smaller screens */}
        <div
          className={`lg:col-span-2 ${sidebarOpen ? "block" : "hidden"} lg:block`}
        >
          <ArticlesSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Main Content – 5 columns on lg+ */}
        <div className="lg:col-span-5">
          <ArticlesMain
            selectedCategory={selectedCategory}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
}
