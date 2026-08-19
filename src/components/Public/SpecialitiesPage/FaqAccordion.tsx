"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { GoChevronDown } from "react-icons/go";
import type { SyntheticEvent } from "react";

export interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | false>(false);

  const handleFaqChange =
    (index: number) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpandedFaq(isExpanded ? index : false);
    };

  if (!faqs || faqs.length === 0) return null;

  return (
    <>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expandedFaq === index}
          onChange={handleFaqChange(index)}
          disableGutters
          elevation={0}
          square
          sx={{
            borderBottom:
              index !== faqs.length - 1 ? "1px solid #f3f4f6" : "none",
            "&:before": { display: "none" },
            "&.MuiAccordion-root": { margin: 0, borderRadius: 0 },
            "& .MuiAccordionSummary-root": {
              px: { xs: 2, sm: 2 },
              py: { xs: 1.5, sm: 2 },
              minHeight: "auto",
            },
            "& .MuiAccordionSummary-content": { margin: 0 },
            "& .MuiAccordionDetails-root": {
              px: { xs: 2, sm: 3 },
              pb: { xs: 2, sm: 3 },
              pt: 0,
            },
          }}
        >
          <AccordionSummary expandIcon={<GoChevronDown />}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "12px", sm: "13px", lg: "14px" },
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                lineHeight: 1.6,
              }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
