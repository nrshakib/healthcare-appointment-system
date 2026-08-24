"use client";

import { useState } from "react";
import FaqHero from "./FaqHero";
import FaqContent from "./FaqContent";
import FaqContactCard from "./FaqContactCard";

export default function FaqPageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleQuickSearch = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <>
      <FaqHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickSearch={handleQuickSearch}
      />
      <FaqContent
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />
      <FaqContactCard />
    </>
  );
}
