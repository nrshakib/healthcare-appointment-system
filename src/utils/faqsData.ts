export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags?: string[];
  popular?: boolean;
}

export interface FaqCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: "all",
    name: "All FAQs",
    description: "Browse all questions and answers across all categories",
    iconName: "FaQuestionCircle",
  },
  {
    id: "appointments",
    name: "Appointments & Booking",
    description: "Scheduling, rescheduling, cancellation, and clinic visits",
    iconName: "LuCalendar",
  },
  {
    id: "telemedicine",
    name: "Telemedicine & Video Care",
    description: "Virtual doctor visits, system requirements, and video calls",
    iconName: "LuVideo",
  },
  {
    id: "doctors",
    name: "Doctors & Specialists",
    description: "Doctor credentials, choosing specialists, and communications",
    iconName: "LuUserCheck",
  },
  {
    id: "billing",
    name: "Billing & Insurance",
    description: "Payment methods, claims, co-pays, and refund policies",
    iconName: "LuCreditCard",
  },
  {
    id: "prescriptions",
    name: "Prescriptions & Lab Tests",
    description: "E-prescriptions, pharmacy delivery, and diagnostic reports",
    iconName: "LuFileText",
  },
  {
    id: "security",
    name: "Privacy & Account",
    description: "HIPAA compliance, profile settings, and data safety",
    iconName: "LuShieldCheck",
  },
];

export const faqsData: FaqItem[] = [
  // Appointments & Booking
  {
    id: "apt-1",
    category: "appointments",
    popular: true,
    question: "How do I book an appointment with a doctor on Medicare?",
    answer:
      "You can book an appointment in 3 easy steps: 1) Go to 'Find a Doctor' and search by specialty, symptoms, or doctor name. 2) Select your preferred doctor and choose an available date and time slot. 3) Choose between an In-Person Clinic Visit or Video Consultation, enter patient details, and confirm booking. You'll receive instant SMS and email confirmation.",
    tags: ["booking", "schedule", "find doctor", "new appointment"],
  },
  {
    id: "apt-2",
    category: "appointments",
    popular: true,
    question: "Can I reschedule or cancel my appointment without fees?",
    answer:
      "Yes, you can reschedule or cancel your appointment free of charge up to 2 hours before the scheduled time. Simply visit your 'Appointments' dashboard, locate the upcoming booking, and click 'Reschedule' or 'Cancel'. Any pre-paid fees will be immediately credited or refunded to your original payment method within 3–5 business days.",
    tags: ["cancel", "reschedule", "refund", "fees"],
  },
  {
    id: "apt-3",
    category: "appointments",
    popular: false,
    question: "Can I book a same-day appointment for urgent non-emergency care?",
    answer:
      "Yes! Navigate to 'Find Care' > 'Available Today' to filter doctors with immediate open slots today. For life-threatening emergencies, please call 911 or visit your nearest emergency room immediately.",
    tags: ["same-day", "urgent", "today", "emergency"],
  },
  {
    id: "apt-4",
    category: "appointments",
    popular: false,
    question: "How far in advance can I schedule a consultation?",
    answer:
      "You can book appointments up to 60 days in advance depending on the doctor's calendar availability. We recommend booking routine checkups and popular specialist visits at least 1–2 weeks ahead.",
    tags: ["advance", "calendar", "availability"],
  },
  {
    id: "apt-5",
    category: "appointments",
    popular: false,
    question: "What documents should I bring to an in-person appointment?",
    answer:
      "Please bring a valid photo ID (Driver's License or Passport), your health insurance card, a list of your current medications, and any recent lab reports or imaging results relevant to your consultation.",
    tags: ["documents", "in-person", "id", "insurance card"],
  },

  // Telemedicine & Video Care
  {
    id: "tele-1",
    category: "telemedicine",
    popular: true,
    question: "How does a virtual telemedicine consultation work?",
    answer:
      "Once booked, you will receive a secure video consultation link via email and SMS. At your appointment time, click the link on your smartphone, tablet, or computer (no special software installation required). You will enter a private virtual waiting room until the doctor joins. The call is end-to-end encrypted and HIPAA compliant.",
    tags: ["telemedicine", "video", "virtual visit", "how it works"],
  },
  {
    id: "tele-2",
    category: "telemedicine",
    popular: true,
    question: "What device or internet speed do I need for video appointments?",
    answer:
      "You only need any modern smartphone, tablet, laptop, or desktop computer with a working camera, microphone, and a stable internet connection (minimum 1.5 Mbps recommended). Supported browsers include Google Chrome, Safari, Edge, and Firefox.",
    tags: ["requirements", "browser", "device", "internet speed"],
  },
  {
    id: "tele-3",
    category: "telemedicine",
    popular: false,
    question: "What happens if the video connection drops during my consultation?",
    answer:
      "If disconnected, simply refresh your browser page and click the join button again. If the internet issue persists, your doctor will immediately call you directly on your registered phone number to complete the consultation via voice call.",
    tags: ["disconnect", "reconnect", "phone call", "connection issue"],
  },
  {
    id: "tele-4",
    category: "telemedicine",
    popular: false,
    question: "Can doctors prescribe medication during a virtual consultation?",
    answer:
      "Yes, licensed doctors can write and electronically send legally valid prescriptions (e-prescriptions) directly to your local pharmacy or our home delivery pharmacy service, excluding controlled substances that require an in-person clinical exam by law.",
    tags: ["e-prescription", "medication", "virtual prescription"],
  },

  // Doctors & Specialists
  {
    id: "doc-1",
    category: "doctors",
    popular: true,
    question: "How are Medicare doctors and specialists vetted?",
    answer:
      "All medical practitioners on Medicare undergo a rigorous 5-step credentialing process. We verify medical degrees, state board licenses, hospital affiliations, clean malpractice histories, and board certifications before onboarding. Patient feedback is continuously monitored to ensure the highest standard of care.",
    tags: ["vetted", "credentials", "doctor quality", "verification"],
  },
  {
    id: "doc-2",
    category: "doctors",
    popular: false,
    question: "Can I request a second opinion from another specialist?",
    answer:
      "Absolutely. You can easily share your previous consultation notes and diagnostic reports with another doctor on Medicare to obtain an independent second medical opinion.",
    tags: ["second opinion", "specialist", "medical review"],
  },
  {
    id: "doc-3",
    category: "doctors",
    popular: false,
    question: "How can I send a follow-up question to my doctor after a visit?",
    answer:
      "After any completed consultation, you have access to a secure 7-day post-visit chat window with your doctor directly from your patient portal to ask quick clarifying questions regarding your prescribed regimen.",
    tags: ["follow-up", "messaging", "chat with doctor"],
  },

  // Billing & Insurance
  {
    id: "bill-1",
    category: "billing",
    popular: true,
    question: "Which health insurance providers are accepted?",
    answer:
      "Medicare partners with over 40 major insurance carriers including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Humana, Medicare Part B, and Medicaid. You can verify your exact plan coverage during booking by entering your insurance details.",
    tags: ["insurance", "accepted plans", "coverage", "aetna", "cigna"],
  },
  {
    id: "bill-2",
    category: "billing",
    popular: false,
    question: "What if I don't have health insurance?",
    answer:
      "We offer transparent, upfront cash pay pricing for all uninsured self-pay patients. General practitioner consultations start at $45, and specialist visits start at $75 with no hidden hospital facility fees.",
    tags: ["self-pay", "no insurance", "cash price", "pricing"],
  },
  {
    id: "bill-3",
    category: "billing",
    popular: false,
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), HSA/FSA cards, Apple Pay, Google Pay, and PayPal. For corporate wellness members, employer billing is supported.",
    tags: ["payment methods", "hsa", "fsa", "credit card", "apple pay"],
  },
  {
    id: "bill-4",
    category: "billing",
    popular: false,
    question: "How do I download an itemized receipt or invoice for reimbursement?",
    answer:
      "Log in to your account, go to 'Billing & Payments' in your dashboard, select the specific appointment, and click 'Download Superbill / Itemized Invoice (PDF)'. This document contains all standard CPT and ICD-10 medical billing codes for insurance claims.",
    tags: ["receipt", "invoice", "superbill", "claim", "reimbursement"],
  },

  // Prescriptions & Lab Tests
  {
    id: "rx-1",
    category: "prescriptions",
    popular: true,
    question: "How do I receive and fill my prescription after an appointment?",
    answer:
      "Your doctor sends your e-prescription digitally to your chosen local pharmacy immediately after the consultation. You can also opt for free doorstep delivery within 24–48 hours via our partner online pharmacies.",
    tags: ["pharmacy", "delivery", "prescription", "rx"],
  },
  {
    id: "rx-2",
    category: "prescriptions",
    popular: false,
    question: "Can I book home sample collection for diagnostic lab tests?",
    answer:
      "Yes! If your doctor orders blood work or diagnostic tests, you can schedule a certified phlebotomist to visit your home for sample collection, or visit a nearby partner diagnostic lab (Quest Diagnostics, Labcorp) with your digital lab requisition slip.",
    tags: ["lab test", "blood work", "home sample", "diagnostic"],
  },
  {
    id: "rx-3",
    category: "prescriptions",
    popular: false,
    question: "Where can I view my lab test results?",
    answer:
      "Your lab test results will automatically sync to your 'Medical Records' section as soon as the laboratory analyzes them (typically within 24 to 48 hours). You'll receive an email notification when results are ready for review.",
    tags: ["lab results", "records", "test report"],
  },

  // Privacy & Account
  {
    id: "sec-1",
    category: "security",
    popular: true,
    question: "Is my personal health and medical data secure and private?",
    answer:
      "Yes, absolutely. Medicare is 100% HIPAA compliant and utilizes 256-bit AES encryption at rest and in transit. Your personal health information (PHI) is strictly confidential and never shared with third-party advertisers or unauthorized entities.",
    tags: ["hipaa", "privacy", "security", "encryption", "phi"],
  },
  {
    id: "sec-2",
    category: "security",
    popular: false,
    question: "Can I manage appointments for my children or elderly family members?",
    answer:
      "Yes! You can add dependent profiles under your primary account in 'Account Settings' > 'Family Members'. When booking an appointment, you simply select which family member the appointment is for.",
    tags: ["dependents", "family", "kids", "children", "parents"],
  },
  {
    id: "sec-3",
    category: "security",
    popular: false,
    question: "How do I delete my account or request my complete medical records?",
    answer:
      "You can export your complete medical history as a secure PDF archive from 'Medical Records' > 'Export All Records'. To request account deletion, navigate to 'Privacy Settings' or contact our data protection officer at support@medicare.health.",
    tags: ["delete account", "export data", "medical history"],
  },
];

export default faqsData;
