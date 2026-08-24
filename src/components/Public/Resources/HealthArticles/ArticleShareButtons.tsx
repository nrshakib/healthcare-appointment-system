"use client";

import { useState } from "react";
import { Tooltip } from "@mui/material";
import { FaFacebookF, FaLinkedinIn, FaLink, FaCheck } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

interface ArticleShareButtonsProps {
  title: string;
}

export default function ArticleShareButtons({
  title,
}: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getShareUrl = () => {
    return typeof window !== "undefined" ? window.location.href : "";
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1 hidden sm:inline">
        Share:
      </span>

      {/* Copy link button */}
      <Tooltip title={copied ? "Link Copied!" : "Copy Link"} arrow>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link"
          className={`flex size-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
            copied
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 shadow-2xs"
          }`}
        >
          {copied ? (
            <FaCheck className="text-xs" />
          ) : (
            <FaLink className="text-xs" />
          )}
        </button>
      </Tooltip>

      {/* Twitter / X */}
      <Tooltip title="Share on X (Twitter)" arrow>
        <Link
          href="x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white shadow-2xs transition-all cursor-pointer"
        >
          <FaXTwitter className="text-xs" />
        </Link>
      </Tooltip>

      {/* Facebook */}
      <Tooltip title="Share on Facebook" arrow>
        <Link
          href="facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-2xs transition-all cursor-pointer"
        >
          <FaFacebookF className="text-xs" />
        </Link>
      </Tooltip>

      {/* LinkedIn */}
      <Tooltip title="Share on LinkedIn" arrow>
        <Link
          href="linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white shadow-2xs transition-all cursor-pointer"
        >
          <FaLinkedinIn className="text-xs" />
        </Link>
      </Tooltip>
    </div>
  );
}
