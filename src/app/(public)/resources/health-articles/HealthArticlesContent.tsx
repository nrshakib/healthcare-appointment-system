"use client";

import { useState } from "react";
import ArticlesMain from "@/components/Public/Resources/HealthArticles/ArticlesMain";
import ArticlesSidebar from "@/components/Public/Resources/HealthArticles/ArticlesSidebar";

export default function HealthArticlesContent() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClearFilters = () => {
    setSelectedCategory("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-start">
      {/* Sidebar - 2 columns on lg+ */}
      <div className="lg:col-span-2">
        <ArticlesSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Content - 5 columns on lg+ */}
      <div className="lg:col-span-5">
        <ArticlesMain
          selectedCategory={selectedCategory}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}
