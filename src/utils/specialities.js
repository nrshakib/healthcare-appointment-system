import {
  LuAccessibility,
  LuActivity,
  LuApple,
  LuBaby,
  LuBone,
  LuBrain,
  LuCircleDot,
  LuDroplet,
  LuDroplets,
  LuEar,
  LuEye,
  LuHeart,
  LuHeartPulse,
  LuPersonStanding,
  LuPill,
  LuRibbon,
  LuScan,
  LuScissors,
  LuSmile,
  LuSparkles,
  LuStethoscope,
  LuSyringe,
  LuWind,
} from "react-icons/lu";
import { FaLungs, FaTooth } from "react-icons/fa";

export const createSpecialitySlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const specialityColors = {
  red: {
    bg: "#FEE2E2",
    text: "#EF4444",
    border: "#FECACA",
    bgClass: "bg-red-100",
    textClass: "text-red-500",
    borderClass: "border-red-200",
    hoverBgClass: "hover:bg-red-100",
  },
  blue: {
    bg: "#DBEAFE",
    text: "#3B82F6",
    border: "#BFDBFE",
    bgClass: "bg-blue-100",
    textClass: "text-blue-500",
    borderClass: "border-blue-200",
    hoverBgClass: "hover:bg-blue-100",
  },
  purple: {
    bg: "#EDE9FE",
    text: "#8B5CF6",
    border: "#DDD6FE",
    bgClass: "bg-purple-100",
    textClass: "text-purple-500",
    borderClass: "border-purple-200",
    hoverBgClass: "hover:bg-purple-100",
  },
  pink: {
    bg: "#FCE7F3",
    text: "#EC4899",
    border: "#FBCFE8",
    bgClass: "bg-pink-100",
    textClass: "text-pink-500",
    borderClass: "border-pink-200",
    hoverBgClass: "hover:bg-pink-100",
  },
  teal: {
    bg: "#CCFBF1",
    text: "#14B8A6",
    border: "#99F6E4",
    bgClass: "bg-teal-100",
    textClass: "text-teal-500",
    borderClass: "border-teal-200",
    hoverBgClass: "hover:bg-teal-100",
  },
  green: {
    bg: "#DCFCE7",
    text: "#22C55E",
    border: "#BBF7D0",
    bgClass: "bg-green-100",
    textClass: "text-green-500",
    borderClass: "border-green-200",
    hoverBgClass: "hover:bg-green-100",
  },
  indigo: {
    bg: "#E0E7FF",
    text: "#6366F1",
    border: "#C7D2FE",
    bgClass: "bg-indigo-100",
    textClass: "text-indigo-500",
    borderClass: "border-indigo-200",
    hoverBgClass: "hover:bg-indigo-100",
  },
  orange: {
    bg: "#FFEDD5",
    text: "#F97316",
    border: "#FED7AA",
    bgClass: "bg-orange-100",
    textClass: "text-orange-500",
    borderClass: "border-orange-200",
    hoverBgClass: "hover:bg-orange-100",
  },
  rose: {
    bg: "#FFE4E6",
    text: "#F43F5E",
    border: "#FECDD3",
    bgClass: "bg-rose-100",
    textClass: "text-rose-500",
    borderClass: "border-rose-200",
    hoverBgClass: "hover:bg-rose-100",
  },
  amber: {
    bg: "#FEF3C7",
    text: "#F59E0B",
    border: "#FDE68A",
    bgClass: "bg-amber-100",
    textClass: "text-amber-500",
    borderClass: "border-amber-200",
    hoverBgClass: "hover:bg-amber-100",
  },
  cyan: {
    bg: "#CFFAFE",
    text: "#06B6D4",
    border: "#A5F3FC",
    bgClass: "bg-cyan-100",
    textClass: "text-cyan-500",
    borderClass: "border-cyan-200",
    hoverBgClass: "hover:bg-cyan-100",
  },
  sky: {
    bg: "#E0F2FE",
    text: "#0EA5E9",
    border: "#BAE6FD",
    bgClass: "bg-sky-100",
    textClass: "text-sky-500",
    borderClass: "border-sky-200",
    hoverBgClass: "hover:bg-sky-100",
  },
  slate: {
    bg: "#F1F5F9",
    text: "#64748B",
    border: "#E2E8F0",
    bgClass: "bg-slate-100",
    textClass: "text-slate-500",
    borderClass: "border-slate-200",
    hoverBgClass: "hover:bg-slate-100",
  },
  fuchsia: {
    bg: "#FAE8FF",
    text: "#D946EF",
    border: "#F5D0FE",
    bgClass: "bg-fuchsia-100",
    textClass: "text-fuchsia-500",
    borderClass: "border-fuchsia-200",
    hoverBgClass: "hover:bg-fuchsia-100",
  },
};

const specialities = [
  {
    Icon: LuHeartPulse,
    name: "Cardiology",
    details: "Heart and cardiovascular care",
    image: "/images/specialities/cardiology.png",
    color: specialityColors.red,
    description:
      "Cardiology focuses on the diagnosis, treatment, and prevention of conditions affecting the heart and blood vessels. Cardiologists help manage heart disease, high blood pressure, abnormal heart rhythms, and other cardiovascular problems. Regular evaluation can help identify risk factors early and support long-term heart health.",
    commonConditions: [
      "High blood pressure",
      "Heart failure",
      "Coronary artery disease",
      "Heart rhythm disorders",
      "Chest pain",
      "High cholesterol",
    ],

    faqs: [
      {
        question: "When should I see a cardiologist?",
        answer:
          "You should consider seeing a cardiologist if you have chest pain, shortness of breath, irregular heartbeat, high blood pressure, or other concerns related to your heart.",
      },
      {
        question: "What does a cardiologist treat?",
        answer:
          "Cardiologists diagnose and manage conditions affecting the heart and blood vessels, including hypertension, heart disease, arrhythmias, and heart failure.",
      },
      {
        question: "What tests may a cardiologist recommend?",
        answer:
          "Depending on your symptoms, your doctor may recommend tests such as an ECG, echocardiogram, stress test, or blood tests.",
      },
    ],
    treatments: [
      {
        icon: LuHeartPulse,
        title: "Comprehensive Care",
        subtitle: "From prevention to advanced treatments",
      },
      {
        icon: LuActivity,
        title: "Expert Specialists",
        subtitle: "Highly experienced cardiologists",
      },
      {
        icon: LuScan,
        title: "Advanced Technology",
        subtitle: "State-of-the-art diagnostic tools",
      },
      {
        icon: LuSparkles,
        title: "Personalized Treatment",
        subtitle: "Tailored care for your needs",
      },
    ],
  },

  {
    Icon: LuBone,
    name: "Orthopedics",
    details: "Bone, muscle and joint care",
    image: "/images/specialities/orthopedics.png",
    color: specialityColors.blue,
    description:
      "Orthopedics focuses on the health of the bones, joints, muscles, ligaments, and other parts of the musculoskeletal system. Orthopedic specialists diagnose and treat injuries, joint problems, fractures, and conditions affecting mobility. Treatment may include medication, physiotherapy, lifestyle changes, or surgery when necessary.",

    commonConditions: [
      "Arthritis",
      "Back pain",
      "Joint pain",
      "Fractures",
      "Sports injuries",
      "Ligament injuries",
    ],

    faqs: [
      {
        question: "What does an orthopedic doctor treat?",
        answer:
          "Orthopedic doctors diagnose and treat conditions affecting bones, joints, muscles, ligaments, tendons, and the musculoskeletal system.",
      },
      {
        question: "When should I see an orthopedic specialist?",
        answer:
          "Persistent joint pain, difficulty moving, sports injuries, fractures, or recurring muscle and bone problems may require orthopedic evaluation.",
      },
      {
        question: "Can orthopedic conditions be treated without surgery?",
        answer:
          "Many orthopedic conditions can be managed with medication, physiotherapy, exercise, lifestyle changes, or other non-surgical treatments.",
      },
    ],
    treatments: [
      {
        icon: LuBone,
        title: "Bone Care",
        subtitle: "Complete orthopedic solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Surgeons",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern diagnostic technology",
      },
      {
        icon: LuActivity,
        title: "Personalized Recovery",
        subtitle: "Custom rehabilitation plans",
      },
    ],
  },

  {
    Icon: LuBrain,
    name: "Neurology",
    details: "Brain and nervous system",
    image: "/images/specialities/neurology.png",
    color: specialityColors.purple,
    description:
      "Neurology focuses on disorders affecting the brain, spinal cord, nerves, and muscles. Neurologists evaluate symptoms such as headaches, seizures, numbness, weakness, tremors, and memory problems. Early assessment can help identify neurological conditions and guide appropriate treatment and long-term management.",

    commonConditions: [
      "Migraine",
      "Epilepsy",
      "Stroke",
      "Parkinson's disease",
      "Neuropathy",
      "Memory disorders",
    ],

    faqs: [
      {
        question: "What does a neurologist treat?",
        answer:
          "Neurologists diagnose and manage disorders affecting the brain, spinal cord, nerves, and muscles.",
      },
      {
        question: "When should I see a neurologist?",
        answer:
          "Persistent headaches, seizures, numbness, weakness, tremors, balance problems, or memory changes may require neurological evaluation.",
      },
      {
        question: "Does a neurologist perform surgery?",
        answer:
          "Neurologists generally provide non-surgical treatment. Conditions requiring neurological surgery are typically managed by neurosurgeons.",
      },
    ],
    treatments: [
      {
        icon: LuBrain,
        title: "Brain Care",
        subtitle: "Complete neurological support",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Neurologists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Neuroimaging",
        subtitle: "State-of-the-art diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Treatment",
        subtitle: "Tailored care approaches",
      },
    ],
  },

  {
    Icon: LuBaby,
    name: "Pediatrics",
    details: "Healthcare for children",
    image: "/images/specialities/pediatrics.png",
    color: specialityColors.pink,
    description:
      "Pediatrics provides comprehensive healthcare for infants, children, and adolescents. Pediatricians monitor growth and development while diagnosing and treating common childhood illnesses and health conditions. Regular checkups, vaccinations, and preventive care help children maintain healthy physical and emotional development.",

    commonConditions: [
      "Fever",
      "Common cold",
      "Childhood infections",
      "Asthma",
      "Allergies",
      "Growth and development concerns",
    ],

    faqs: [
      {
        question: "What age group does a pediatrician treat?",
        answer:
          "Pediatricians provide healthcare for infants, children, and adolescents.",
      },
      {
        question: "When should I take my child to a pediatrician?",
        answer:
          "Children should see a pediatrician for regular checkups, vaccinations, growth monitoring, persistent symptoms, or developmental concerns.",
      },
      {
        question: "Do pediatricians provide vaccinations?",
        answer:
          "Yes. Pediatricians commonly provide routine childhood vaccinations and monitor immunization schedules.",
      },
    ],
    treatments: [
      {
        icon: LuBaby,
        title: "Child Healthcare",
        subtitle: "Complete pediatric services",
      },
      {
        icon: LuSmile,
        title: "Expert Pediatricians",
        subtitle: "Experienced child specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Diagnostics",
        subtitle: "Modern child diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Care",
        subtitle: "Tailored young patient care",
      },
    ],
  },

  {
    Icon: LuEye,
    name: "Ophthalmology",
    details: "Complete eye care",
    image: "/images/specialities/ophthalmology.png",
    color: specialityColors.teal,
    description:
      "Ophthalmology focuses on the diagnosis and treatment of diseases and conditions affecting the eyes and vision. Ophthalmologists provide comprehensive eye examinations and manage conditions ranging from common vision problems to complex eye diseases. They can also perform various surgical procedures when required.",

    commonConditions: [
      "Cataracts",
      "Glaucoma",
      "Dry eyes",
      "Eye infections",
      "Vision problems",
      "Retinal disorders",
    ],

    faqs: [
      {
        question: "When should I see an ophthalmologist?",
        answer:
          "You should see an ophthalmologist for persistent vision changes, eye pain, eye injuries, or regular eye health examinations.",
      },
      {
        question: "Can ophthalmologists perform surgery?",
        answer:
          "Yes. Ophthalmologists are medical doctors who can diagnose eye conditions and perform various eye surgeries.",
      },
      {
        question: "How often should I have an eye examination?",
        answer:
          "The appropriate frequency depends on your age, health, vision, and risk factors. Your eye specialist can recommend a suitable schedule.",
      },
    ],
    treatments: [
      {
        icon: LuEye,
        title: "Eye Care",
        subtitle: "Complete vision solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Highly skilled ophthalmologists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "State-of-the-art diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Vision",
        subtitle: "Tailored treatment plans",
      },
    ],
  },

  {
    Icon: LuStethoscope,
    name: "General Medicine",
    details: "Primary healthcare",
    image: "/images/specialities/general-medicine.png",
    color: specialityColors.green,
    description:
      "General Medicine provides comprehensive primary healthcare for a wide range of common and chronic health conditions. General physicians evaluate symptoms, perform initial diagnoses, and create appropriate treatment plans. They can also coordinate care and refer patients to specialists when more advanced evaluation is required.",

    commonConditions: [
      "Fever",
      "Common infections",
      "Hypertension",
      "Diabetes",
      "Digestive problems",
      "Respiratory problems",
    ],

    faqs: [
      {
        question: "What does a general medicine doctor treat?",
        answer:
          "General medicine doctors diagnose and manage a wide range of common adult health conditions and provide primary healthcare.",
      },
      {
        question: "Should I see a general physician first?",
        answer:
          "For many common or unexplained symptoms, a general physician can provide an initial evaluation and refer you to a specialist when necessary.",
      },
      {
        question: "Can a general physician manage chronic conditions?",
        answer:
          "Yes. General physicians commonly help manage chronic conditions such as hypertension, diabetes, and high cholesterol.",
      },
    ],
    treatments: [
      {
        icon: LuStethoscope,
        title: "Primary Care",
        subtitle: "Complete general healthcare",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Physicians",
        subtitle: "Highly trained doctors",
      },
      {
        icon: LuScan,
        title: "Modern Diagnostics",
        subtitle: "Advanced medical technology",
      },
      {
        icon: LuHeart,
        title: "Personalized Health",
        subtitle: "Tailored care strategies",
      },
    ],
  },

  {
    Icon: LuScan,
    name: "Radiology",
    details: "Medical imaging and diagnostics",
    image: "/images/specialities/radiology.png",
    color: specialityColors.indigo,
    description:
      "Radiology uses medical imaging technologies to help diagnose and monitor a wide range of health conditions. Radiologists interpret images from X-rays, CT scans, MRI scans, ultrasound, and other diagnostic procedures. Accurate imaging helps doctors understand internal conditions and make informed treatment decisions.",

    commonConditions: [
      "Bone injuries",
      "Tumors",
      "Internal injuries",
      "Lung abnormalities",
      "Abdominal conditions",
      "Brain disorders",
    ],

    faqs: [
      {
        question: "What does a radiologist do?",
        answer:
          "Radiologists interpret medical images such as X-rays, CT scans, MRI scans, and ultrasound examinations to help diagnose medical conditions.",
      },
      {
        question: "Is an X-ray safe?",
        answer:
          "X-rays use a small amount of radiation. Medical professionals use them when the expected diagnostic benefit outweighs the potential risk.",
      },
      {
        question: "What is the difference between CT and MRI?",
        answer:
          "CT uses X-rays to create detailed cross-sectional images, while MRI uses magnetic fields and radio waves to produce detailed images of soft tissues.",
      },
    ],
    treatments: [
      {
        icon: LuScan,
        title: "Medical Imaging",
        subtitle: "Accurate diagnostic scans",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Radiologists",
        subtitle: "Skilled imaging specialists",
      },
      {
        icon: LuActivity,
        title: "Advanced Technology",
        subtitle: "State-of-the-art equipment",
      },
      {
        icon: LuSparkles,
        title: "Personalized Analysis",
        subtitle: "Tailored diagnostic insights",
      },
    ],
  },

  {
    Icon: LuPill,
    name: "Dermatology",
    details: "Skin, hair and nail care",
    image: "/images/specialities/dermatology.png",
    color: specialityColors.orange,
    description:
      "Dermatology focuses on the diagnosis and treatment of conditions affecting the skin, hair, and nails. Dermatologists treat common concerns such as acne, eczema, infections, rashes, and hair loss. They also help patients manage chronic skin conditions and identify potentially serious skin changes.",

    commonConditions: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Hair loss",
      "Skin infections",
      "Skin allergies",
    ],

    faqs: [
      {
        question: "What does a dermatologist treat?",
        answer:
          "Dermatologists diagnose and treat conditions affecting the skin, hair, and nails.",
      },
      {
        question: "When should I see a dermatologist?",
        answer:
          "Persistent acne, unusual rashes, hair loss, changing moles, chronic itching, or other ongoing skin concerns may require dermatological evaluation.",
      },
      {
        question: "Can dermatologists treat hair loss?",
        answer:
          "Yes. Dermatologists can evaluate different causes of hair loss and recommend appropriate treatment options.",
      },
    ],
    treatments: [
      {
        icon: LuPill,
        title: "Skin Care",
        subtitle: "Complete dermatology services",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Highly trained dermatologists",
      },
      {
        icon: LuScan,
        title: "Advanced Tools",
        subtitle: "Modern skin diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored skin treatments",
      },
    ],
  },

  {
    Icon: LuHeartPulse,
    name: "Psychology",
    details: "Mental and behavioral health",
    image: "/images/specialities/psychology.png",
    color: specialityColors.rose,
    description:
      "Psychology focuses on emotional, behavioral, and mental well-being. Psychologists help people understand and manage challenges such as stress, anxiety, depression, relationship difficulties, and behavioral concerns. Through evidence-based approaches and counseling, they support patients in developing healthier coping strategies.",

    commonConditions: [
      "Stress",
      "Anxiety",
      "Depression",
      "Relationship difficulties",
      "Sleep problems",
      "Behavioral concerns",
    ],

    faqs: [
      {
        question: "What does a psychologist do?",
        answer:
          "Psychologists help people understand and manage emotional, behavioral, and psychological challenges through assessment and therapeutic approaches.",
      },
      {
        question: "When should I talk to a psychologist?",
        answer:
          "Consider talking to a psychologist if emotional or behavioral difficulties are affecting your daily life, relationships, work, or overall well-being.",
      },
      {
        question: "Can psychologists prescribe medication?",
        answer:
          "In most healthcare systems psychologists do not prescribe medication. Medication, when appropriate, is typically managed by a medical doctor or psychiatrist.",
      },
    ],
    treatments: [
      {
        icon: LuSparkles,
        title: "Mental Health",
        subtitle: "Complete psychological support",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Psychologists",
        subtitle: "Highly trained therapists",
      },
      {
        icon: LuActivity,
        title: "Modern Therapy",
        subtitle: "Advanced mental health tech",
      },
      {
        icon: LuHeart,
        title: "Personalized Counseling",
        subtitle: "Tailored therapy approaches",
      },
    ],
  },

  {
    Icon: LuActivity,
    name: "Gastroenterology",
    details: "Digestive system care",
    image: "/images/specialities/gastroenterology.png",
    color: specialityColors.amber,
    description:
      "Gastroenterology focuses on the diagnosis, treatment, and prevention of disorders affecting the digestive system, including the stomach, intestines, liver, pancreas, and gallbladder. Gastroenterologists manage symptoms such as abdominal pain, bloating, nausea, and changes in bowel habits while supporting long-term digestive health.",

    commonConditions: [
      "Acid reflux",
      "Gastritis",
      "Irritable bowel syndrome",
      "Ulcers",
      "Inflammatory bowel disease",
      "Liver and digestive disorders",
    ],

    faqs: [
      {
        question: "What does a gastroenterologist treat?",
        answer:
          "Gastroenterologists diagnose and manage conditions affecting the digestive system, including the stomach, intestines, liver, pancreas, and gallbladder.",
      },
      {
        question: "When should I see a gastroenterologist?",
        answer:
          "Persistent abdominal pain, digestive problems, unexplained weight changes, blood in stool, or chronic heartburn may require specialist evaluation.",
      },
      {
        question: "What is an endoscopy?",
        answer:
          "An endoscopy is a procedure that allows a doctor to examine parts of the digestive tract using a specialized flexible camera.",
      },
    ],
    treatments: [
      {
        icon: LuActivity,
        title: "Digestive Care",
        subtitle: "Complete GI solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Skilled GI doctors",
      },
      {
        icon: LuScan,
        title: "Advanced Endoscopy",
        subtitle: "Modern diagnostic technology",
      },
      {
        icon: LuApple,
        title: "Personalized Nutrition",
        subtitle: "Tailored dietary guidance",
      },
    ],
  },

  {
    Icon: FaLungs,
    name: "Pulmonology",
    details: "Lung and respiratory care",
    image: "/images/specialities/pulmonology.png",
    color: specialityColors.cyan,
    description:
      "Pulmonology focuses on the health of the lungs and respiratory system. Pulmonologists diagnose and treat conditions such as asthma, chronic obstructive pulmonary disease, pneumonia, sleep apnea, and other breathing disorders. Accurate evaluation and management help improve breathing and overall respiratory health.",

    commonConditions: [
      "Asthma",
      "Chronic bronchitis",
      "COPD",
      "Pneumonia",
      "Sleep apnea",
      "Respiratory infections",
    ],

    faqs: [
      {
        question: "What does a pulmonologist treat?",
        answer:
          "Pulmonologists specialize in diseases affecting the lungs and respiratory system.",
      },
      {
        question: "When should I see a pulmonologist?",
        answer:
          "Persistent cough, breathing difficulties, recurring respiratory infections, wheezing, or unexplained chest symptoms may require specialist evaluation.",
      },
      {
        question: "Can pulmonologists treat asthma?",
        answer:
          "Yes. Pulmonologists can diagnose asthma and develop treatment plans to help control respiratory symptoms.",
      },
    ],
    treatments: [
      {
        icon: FaLungs,
        title: "Respiratory Care",
        subtitle: "Complete lung solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Pulmonologists",
        subtitle: "Skilled lung specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern pulmonary diagnostics",
      },
      {
        icon: LuActivity,
        title: "Personalized Breathing",
        subtitle: "Tailored respiratory care",
      },
    ],
  },

  {
    Icon: LuDroplets,
    name: "Nephrology",
    details: "Kidney health specialists",
    image: "/images/specialities/nephrology.png",
    color: specialityColors.sky,
    description:
      "Nephrology focuses on the diagnosis and management of kidney diseases and disorders affecting kidney function. Nephrologists help manage chronic kidney disease, electrolyte imbalances, kidney inflammation, and related conditions. Early monitoring and appropriate care can support long-term kidney health and reduce complications.",

    commonConditions: [
      "Chronic kidney disease",
      "Kidney inflammation",
      "Electrolyte disorders",
      "Kidney failure",
      "Protein in urine",
      "High blood pressure related to kidney disease",
    ],

    faqs: [
      {
        question: "What does a nephrologist treat?",
        answer:
          "Nephrologists diagnose and manage kidney diseases and conditions affecting kidney function.",
      },
      {
        question: "When should I see a nephrologist?",
        answer:
          "Abnormal kidney tests, persistent protein or blood in urine, kidney disease, or difficult-to-control blood pressure may require nephrology care.",
      },
      {
        question: "Do nephrologists manage dialysis?",
        answer:
          "Yes. Nephrologists commonly oversee dialysis treatment for patients with advanced kidney disease.",
      },
    ],
    treatments: [
      {
        icon: LuDroplets,
        title: "Kidney Care",
        subtitle: "Complete kidney solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Nephrologists",
        subtitle: "Skilled kidney specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Testing",
        subtitle: "Modern kidney diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Plans",
        subtitle: "Tailored kidney care",
      },
    ],
  },

  {
    Icon: LuCircleDot,
    name: "Urology",
    details: "Urinary and reproductive health",
    image: "/images/specialities/urology.png",
    color: {
      ...specialityColors.blue,
      text: "#2563EB",
      textClass: "text-blue-600",
    },
    description:
      "Urology focuses on the diagnosis and treatment of conditions involving the urinary tract and male reproductive system. Urologists manage problems such as kidney stones, urinary tract infections, prostate conditions, and bladder disorders. Treatment may include medication, minimally invasive procedures, or surgery when needed.",

    commonConditions: [
      "Kidney stones",
      "Urinary tract problems",
      "Prostate problems",
      "Urinary incontinence",
      "Bladder disorders",
      "Male reproductive conditions",
    ],

    faqs: [
      {
        question: "What does a urologist treat?",
        answer:
          "Urologists diagnose and treat conditions involving the urinary system and male reproductive system.",
      },
      {
        question: "When should I see a urologist?",
        answer:
          "Painful urination, blood in urine, kidney stones, urinary difficulties, or prostate concerns may require urological evaluation.",
      },
      {
        question: "Do women see urologists?",
        answer:
          "Yes. Urologists treat urinary conditions in both men and women.",
      },
    ],
    treatments: [
      {
        icon: LuCircleDot,
        title: "Urinary Care",
        subtitle: "Complete urology solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Urologists",
        subtitle: "Skilled urinary specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern urology diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Treatment",
        subtitle: "Tailored urological care",
      },
    ],
  },

  {
    Icon: LuActivity,
    name: "Endocrinology",
    details: "Hormones and metabolism",
    image: "/images/specialities/endocrinology.png",
    color: {
      ...specialityColors.amber,
      text: "#EAB308",
      textClass: "text-yellow-500",
    },
    description:
      "Endocrinology focuses on the endocrine system and the hormones it produces. Endocrinologists diagnose and manage conditions such as diabetes, thyroid disorders, hormonal imbalances, and metabolic disorders. Proper evaluation and treatment help regulate hormones and support overall metabolic health.",

    commonConditions: [
      "Diabetes",
      "Thyroid disorders",
      "Hormonal imbalance",
      "Osteoporosis",
      "Metabolic disorders",
      "Adrenal disorders",
    ],

    faqs: [
      {
        question: "What does an endocrinologist treat?",
        answer:
          "Endocrinologists diagnose and manage conditions involving hormones, glands, metabolism, and related disorders.",
      },
      {
        question: "When should I see an endocrinologist?",
        answer:
          "Uncontrolled diabetes, thyroid abnormalities, unexplained hormonal changes, or certain metabolic conditions may require specialist care.",
      },
      {
        question: "Do endocrinologists treat diabetes?",
        answer:
          "Yes. Endocrinologists specialize in complex diabetes and other hormone-related conditions.",
      },
    ],
    treatments: [
      {
        icon: LuActivity,
        title: "Hormone Care",
        subtitle: "Complete endocrine solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Skilled hormone doctors",
      },
      {
        icon: LuScan,
        title: "Advanced Testing",
        subtitle: "Modern hormone diagnostics",
      },
      {
        icon: LuApple,
        title: "Personalized Plans",
        subtitle: "Tailored hormone care",
      },
    ],
  },

  {
    Icon: LuRibbon,
    name: "Oncology",
    details: "Cancer diagnosis and treatment",
    image: "/images/specialities/oncology.png",
    color: {
      ...specialityColors.pink,
      text: "#DB2777",
      textClass: "text-pink-600",
    },
    description:
      "Oncology focuses on the diagnosis, treatment, and management of cancer. Oncologists coordinate care using approaches such as chemotherapy, immunotherapy, radiation therapy, and targeted therapies. Early diagnosis and a personalized treatment plan can significantly improve outcomes for cancer patients.",

    commonConditions: [
      "Breast cancer",
      "Lung cancer",
      "Colon cancer",
      "Prostate cancer",
      "Leukemia",
      "Lymphoma",
    ],

    faqs: [
      {
        question: "What does an oncologist do?",
        answer:
          "Oncologists specialize in diagnosing and treating cancer and coordinating cancer care.",
      },
      {
        question: "When should I see an oncologist?",
        answer:
          "Patients are typically referred to an oncologist when cancer is suspected or diagnosed and specialist treatment is needed.",
      },
      {
        question: "What treatments can oncologists provide?",
        answer:
          "Depending on the cancer type and stage, treatment may include medication, chemotherapy, immunotherapy, radiation therapy, surgery, or a combination of approaches.",
      },
    ],
    treatments: [
      {
        icon: LuRibbon,
        title: "Cancer Care",
        subtitle: "Complete oncology solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Oncologists",
        subtitle: "Skilled cancer specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "State-of-the-art diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Treatment",
        subtitle: "Tailored cancer approaches",
      },
    ],
  },

  {
    Icon: LuDroplet,
    name: "Hematology",
    details: "Blood and blood disorders",
    image: "/images/specialities/hematology.png",
    color: {
      ...specialityColors.red,
      text: "#DC2626",
      textClass: "text-red-600",
    },
    description:
      "Hematology focuses on the diagnosis and treatment of disorders affecting the blood, bone marrow, and clotting system. Hematologists manage conditions such as anemia, blood cancers, clotting disorders, and other blood-related diseases. Accurate diagnosis and treatment planning help improve blood health and overall well-being.",

    commonConditions: [
      "Anemia",
      "Blood clotting disorders",
      "Thalassemia",
      "Hemophilia",
      "Leukemia",
      "Blood cell disorders",
    ],

    faqs: [
      {
        question: "What does a hematologist treat?",
        answer:
          "Hematologists diagnose and manage diseases and disorders affecting blood cells, blood-forming organs, and clotting systems.",
      },
      {
        question: "When should I see a hematologist?",
        answer:
          "Unexplained anemia, abnormal blood counts, unusual bleeding, clotting problems, or certain blood disorders may require specialist evaluation.",
      },
      {
        question: "What tests does a hematologist use?",
        answer:
          "Blood counts, blood smears, clotting tests, and other laboratory investigations may be used depending on the condition.",
      },
    ],
    treatments: [
      {
        icon: LuDroplet,
        title: "Blood Care",
        subtitle: "Complete hematology solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Hematologists",
        subtitle: "Skilled blood specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Testing",
        subtitle: "Modern blood diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Plans",
        subtitle: "Tailored blood care",
      },
    ],
  },

  {
    Icon: LuBaby,
    name: "Neonatology",
    details: "Specialized newborn care",
    image: "/images/specialities/neonatology.png",
    color: specialityColors.sky,
    description:
      "Neonatology provides specialized medical care for newborn babies, especially those who are premature, critically ill, or born with complex health conditions. Neonatologists work in neonatal intensive care units to monitor and support the health, growth, and development of newborns during their earliest and most vulnerable stage of life.",

    commonConditions: [
      "Premature birth",
      "Newborn infections",
      "Breathing problems",
      "Jaundice",
      "Low birth weight",
      "Newborn complications",
    ],

    faqs: [
      {
        question: "What does a neonatologist do?",
        answer:
          "Neonatologists specialize in caring for newborn babies who require specialized medical attention, particularly premature or critically ill infants.",
      },
      {
        question: "Which babies need neonatal care?",
        answer:
          "Premature babies, babies with low birth weight, breathing difficulties, infections, or other serious medical conditions may require neonatal care.",
      },
      {
        question: "Where do neonatologists usually work?",
        answer:
          "Neonatologists commonly work in neonatal intensive care units and specialized newborn care settings.",
      },
    ],
    treatments: [
      {
        icon: LuBaby,
        title: "Newborn Care",
        subtitle: "Specialized neonatal services",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Neonatologists",
        subtitle: "Skilled newborn specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Tools",
        subtitle: "Modern infant diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Care",
        subtitle: "Tailored infant treatment",
      },
    ],
  },

  {
    Icon: LuAccessibility,
    name: "Geriatrics",
    details: "Healthcare for older adults",
    image: "/images/specialities/geriatrics.png",
    color: specialityColors.slate,
    description:
      "Geriatrics focuses on the healthcare needs of older adults, including the prevention, diagnosis, and management of age-related conditions. Geriatricians address chronic diseases, mobility issues, cognitive concerns, and medication management to help older adults maintain independence and quality of life.",

    commonConditions: [
      "Arthritis",
      "Memory problems",
      "Falls",
      "Osteoporosis",
      "Multiple chronic conditions",
      "Mobility problems",
    ],

    faqs: [
      {
        question: "What does a geriatrician treat?",
        answer:
          "Geriatricians focus on the healthcare needs of older adults, including chronic conditions, mobility, medications, memory, and overall quality of life.",
      },
      {
        question: "When should an older adult see a geriatrician?",
        answer:
          "Older adults with multiple health conditions, complex medications, mobility problems, or cognitive concerns may benefit from geriatric care.",
      },
      {
        question: "Can geriatricians coordinate multiple treatments?",
        answer:
          "Yes. Geriatricians often coordinate care across multiple medical conditions and healthcare specialists.",
      },
    ],
    treatments: [
      {
        icon: LuAccessibility,
        title: "Senior Care",
        subtitle: "Complete elderly solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Geriatricians",
        subtitle: "Skilled senior specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Assessment",
        subtitle: "Modern senior diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Care",
        subtitle: "Tailored aging care",
      },
    ],
  },

  {
    Icon: LuScissors,
    name: "General Surgery",
    details: "Surgical treatment and care",
    image: "/images/specialities/general-surgery.png",
    color: specialityColors.red,
    description:
      "General Surgery involves the diagnosis and surgical treatment of a wide range of conditions affecting the abdomen, digestive tract, breast, endocrine system, and soft tissues. General surgeons perform procedures such as appendectomies, hernia repairs, and gallbladder removals while coordinating comprehensive perioperative care.",

    commonConditions: [
      "Appendicitis",
      "Gallstones",
      "Hernias",
      "Abdominal conditions",
      "Thyroid conditions",
      "Soft tissue problems",
    ],

    faqs: [
      {
        question: "What does a general surgeon treat?",
        answer:
          "General surgeons perform surgical procedures involving areas such as the abdomen, digestive tract, breast, thyroid, and soft tissues.",
      },
      {
        question: "Does every surgical condition require surgery?",
        answer:
          "No. A surgeon evaluates the condition and determines whether surgery or another treatment approach is appropriate.",
      },
      {
        question: "Can I consult a surgeon before deciding on surgery?",
        answer:
          "Yes. A surgical consultation helps you understand your diagnosis, treatment options, risks, and expected recovery.",
      },
    ],
    treatments: [
      {
        icon: LuScissors,
        title: "Surgical Solutions",
        subtitle: "Complete operative care",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Surgeons",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuActivity,
        title: "Advanced Tools",
        subtitle: "Modern surgical technology",
      },
      {
        icon: LuSparkles,
        title: "Personalized Surgery",
        subtitle: "Tailored operative approaches",
      },
    ],
  },

  {
    Icon: LuSparkles,
    name: "Plastic Surgery",
    details: "Reconstructive and cosmetic surgery",
    image: "/images/specialities/plastic-surgery.png",
    color: specialityColors.fuchsia,
    description:
      "Plastic Surgery encompasses both reconstructive and cosmetic procedures to restore, repair, or enhance body structures. Plastic surgeons treat injuries, congenital conditions, burns, and aesthetic concerns. The field combines surgical skill with an understanding of form and function to help patients achieve physical and functional goals.",

    commonConditions: [
      "Burn injuries",
      "Scarring",
      "Congenital abnormalities",
      "Trauma-related injuries",
      "Skin and soft tissue defects",
      "Cosmetic concerns",
    ],

    faqs: [
      {
        question: "What does a plastic surgeon do?",
        answer:
          "Plastic surgeons perform reconstructive and cosmetic procedures involving skin, soft tissue, and other structures.",
      },
      {
        question: "Is plastic surgery only cosmetic?",
        answer:
          "No. Plastic surgery also includes reconstructive procedures following injuries, burns, cancer treatment, and congenital conditions.",
      },
      {
        question: "How do I know if plastic surgery is appropriate?",
        answer:
          "A consultation with a qualified specialist can help determine whether a reconstructive or cosmetic procedure is appropriate for your goals and condition.",
      },
    ],
    treatments: [
      {
        icon: LuSparkles,
        title: "Reconstructive Care",
        subtitle: "Complete surgical solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Surgeons",
        subtitle: "Skilled plastic specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Technology",
        subtitle: "Modern plastic surgery tech",
      },
      {
        icon: LuHeart,
        title: "Personalized Plans",
        subtitle: "Tailored aesthetic care",
      },
    ],
  },

  {
    Icon: LuEar,
    name: "ENT",
    details: "Ear, nose and throat care",
    image: "/images/specialities/ent.png",
    color: specialityColors.teal,
    description:
      "ENT, or otolaryngology, focuses on the diagnosis and treatment of disorders affecting the ear, nose, throat, and related head and neck structures. ENT specialists manage conditions such as sinusitis, hearing loss, tonsillitis, and throat disorders, and can perform both medical and surgical interventions.",

    commonConditions: [
      "Sinusitis",
      "Ear infections",
      "Hearing problems",
      "Tonsillitis",
      "Allergic rhinitis",
      "Throat disorders",
    ],

    faqs: [
      {
        question: "What does an ENT specialist treat?",
        answer:
          "ENT specialists diagnose and treat conditions affecting the ear, nose, throat, and related head and neck structures.",
      },
      {
        question: "When should I see an ENT specialist?",
        answer:
          "Persistent sinus problems, hearing changes, recurring ear infections, chronic sore throat, or breathing problems may require ENT evaluation.",
      },
      {
        question: "Can ENT specialists treat hearing problems?",
        answer:
          "Yes. ENT specialists can evaluate many causes of hearing problems and recommend appropriate treatment or further testing.",
      },
    ],
    treatments: [
      {
        icon: LuEar,
        title: "ENT Care",
        subtitle: "Complete ear nose solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Skilled ENT professionals",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern ENT diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored ENT treatment",
      },
    ],
  },

  {
    Icon: LuSmile,
    name: "Dentistry",
    details: "Oral and dental healthcare",
    image: "/images/specialities/dentistry.png",
    color: specialityColors.cyan,
    description:
      "Dentistry focuses on the diagnosis, prevention, and treatment of conditions affecting the teeth, gums, and oral cavity. Dentists help patients maintain oral health through cleanings, fillings, crowns, and other restorative or preventive procedures. Regular dental care plays an important role in overall health and well-being.",

    commonConditions: [
      "Tooth decay",
      "Gum disease",
      "Tooth sensitivity",
      "Tooth pain",
      "Bad breath",
      "Oral infections",
    ],

    faqs: [
      {
        question: "How often should I visit a dentist?",
        answer:
          "Regular dental checkups help detect problems early. Your dentist can recommend an appropriate schedule based on your oral health.",
      },
      {
        question: "What does a dentist treat?",
        answer:
          "Dentists diagnose and treat conditions affecting the teeth, gums, and other parts of the mouth.",
      },
      {
        question: "Can dentists treat gum disease?",
        answer:
          "Yes. Dentists can diagnose gum disease and provide or recommend appropriate treatment.",
      },
    ],
    treatments: [
      {
        icon: LuSmile,
        title: "Dental Care",
        subtitle: "Complete oral solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Dentists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Tools",
        subtitle: "Modern dentistry technology",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored oral care",
      },
    ],
  },

  {
    Icon: FaTooth,
    name: "Oral Surgery",
    details: "Surgical dental care",
    image: "/images/specialities/oral-surgery.png",
    color: specialityColors.blue,
    description:
      "Oral and maxillofacial surgery specializes in surgical procedures involving the mouth, teeth, jaws, and facial structures. Oral surgeons perform complex extractions, place dental implants, treat jaw abnormalities, and manage facial trauma. The specialty combines dental and medical surgical expertise to address a wide range of oral and facial conditions.",

    commonConditions: [
      "Impacted wisdom teeth",
      "Jaw problems",
      "Oral infections",
      "Dental trauma",
      "Cysts",
      "Complex tooth extraction",
    ],

    faqs: [
      {
        question: "What does an oral surgeon do?",
        answer:
          "Oral surgeons perform surgical procedures involving the mouth, teeth, jaw, and surrounding facial structures.",
      },
      {
        question: "When is oral surgery needed?",
        answer:
          "Oral surgery may be recommended for impacted teeth, complex extractions, jaw problems, oral infections, or certain facial conditions.",
      },
      {
        question: "Is wisdom tooth removal oral surgery?",
        answer:
          "Yes. Complex or impacted wisdom tooth removal is commonly performed by oral and maxillofacial surgeons.",
      },
    ],
    treatments: [
      {
        icon: FaTooth,
        title: "Oral Surgery",
        subtitle: "Complete dental solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Surgeons",
        subtitle: "Skilled oral specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern oral diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Surgery",
        subtitle: "Tailored operative approaches",
      },
    ],
  },

  {
    Icon: LuSyringe,
    name: "Anesthesiology",
    details: "Anesthesia and pain management",
    image: "/images/specialities/anesthesiology.png",
    color: specialityColors.purple,
    description:
      "Anesthesiology focuses on providing anesthesia and managing pain during surgical and medical procedures. Anesthesiologists ensure patient safety and comfort by administering anesthesia, monitoring vital signs, and managing acute and chronic pain. They also play a vital role in critical care and emergency medicine.",

    commonConditions: [
      "Surgical anesthesia",
      "Acute pain",
      "Chronic pain",
      "Pain after surgery",
      "Anesthesia-related concerns",
      "Critical care needs",
    ],

    faqs: [
      {
        question: "What does an anesthesiologist do?",
        answer:
          "Anesthesiologists provide anesthesia and monitor patients during procedures while helping manage pain and vital functions.",
      },
      {
        question: "Will I meet an anesthesiologist before surgery?",
        answer:
          "In many cases, an anesthesiologist evaluates the patient before surgery to discuss medical history, anesthesia options, and safety considerations.",
      },
      {
        question: "Do anesthesiologists treat pain?",
        answer:
          "Yes. Many anesthesiologists also specialize in acute and chronic pain management.",
      },
    ],
    treatments: [
      {
        icon: LuSyringe,
        title: "Anesthesia Care",
        subtitle: "Complete pain management",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Anesthesiologists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuActivity,
        title: "Advanced Monitoring",
        subtitle: "Modern anesthesia technology",
      },
      {
        icon: LuHeart,
        title: "Personalized Pain",
        subtitle: "Tailored comfort approaches",
      },
    ],
  },

  {
    Icon: LuWind,
    name: "Allergy & Immunology",
    details: "Allergies and immune disorders",
    image: "/images/specialities/allergy-immunology.png",
    color: specialityColors.cyan,
    description:
      "Allergy and immunology focuses on the diagnosis and management of allergies, asthma, and disorders of the immune system. Specialists in this field help patients manage allergic reactions, immune deficiencies, and autoimmune conditions through testing, prevention strategies, and targeted treatments.",

    commonConditions: [
      "Food allergies",
      "Seasonal allergies",
      "Asthma",
      "Eczema",
      "Drug allergies",
      "Immune system disorders",
    ],

    faqs: [
      {
        question: "What does an allergy specialist treat?",
        answer:
          "Allergy and immunology specialists diagnose and manage allergies, asthma, and certain immune system disorders.",
      },
      {
        question: "When should I see an allergy specialist?",
        answer:
          "Recurring allergic reactions, unexplained rashes, persistent allergy symptoms, or difficult-to-control asthma may require specialist evaluation.",
      },
      {
        question: "Can allergies be tested?",
        answer:
          "Yes. Depending on the symptoms, a specialist may recommend skin testing, blood tests, or other diagnostic approaches.",
      },
    ],
    treatments: [
      {
        icon: LuWind,
        title: "Allergy Care",
        subtitle: "Complete immune solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Highly trained immunologists",
      },
      {
        icon: LuScan,
        title: "Advanced Testing",
        subtitle: "Modern allergy diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored immune approaches",
      },
    ],
  },

  {
    Icon: LuPersonStanding,
    name: "Physical Medicine",
    details: "Rehabilitation and recovery",
    image: "/images/specialities/physical-medicine.png",
    color: specialityColors.orange,
    description:
      "Physical medicine and rehabilitation focuses on restoring function, mobility, and quality of life for patients affected by injury, illness, or disability. Specialists use a combination of therapies, exercises, medications, and interventions to help patients regain independence and improve physical performance.",

    commonConditions: [
      "Back pain",
      "Neck pain",
      "Sports injuries",
      "Stroke rehabilitation",
      "Muscle weakness",
      "Mobility problems",
    ],

    faqs: [
      {
        question: "What is physical medicine and rehabilitation?",
        answer:
          "Physical medicine and rehabilitation focuses on improving function, mobility, independence, and quality of life after injury or illness.",
      },
      {
        question: "What conditions can rehabilitation help?",
        answer:
          "Rehabilitation can help people recovering from injuries, strokes, neurological conditions, surgeries, and musculoskeletal problems.",
      },
      {
        question: "Does rehabilitation always involve physiotherapy?",
        answer:
          "Physiotherapy is commonly part of rehabilitation, but care may also involve occupational therapy, medication, exercise, and other treatments.",
      },
    ],
    treatments: [
      {
        icon: LuPersonStanding,
        title: "Rehabilitation Care",
        subtitle: "Complete physical solutions",
      },
      {
        icon: LuActivity,
        title: "Expert Physiatrists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Therapy",
        subtitle: "Modern rehabilitation technology",
      },
      {
        icon: LuSparkles,
        title: "Personalized Recovery",
        subtitle: "Tailored therapy approaches",
      },
    ],
  },

  {
    Icon: LuApple,
    name: "Nutrition & Dietetics",
    details: "Nutrition and healthy lifestyle",
    image: "/images/specialities/nutrition-dietetics.png",
    color: specialityColors.green,
    description:
      "Nutrition and dietetics focuses on using food and nutrition to promote health, prevent disease, and support the management of medical conditions. Dietitians create personalized nutrition plans to help individuals achieve health goals, manage chronic conditions, and maintain a balanced and sustainable lifestyle.",

    commonConditions: [
      "Obesity",
      "Diabetes nutrition",
      "High cholesterol",
      "Digestive nutrition problems",
      "Nutritional deficiencies",
      "Weight management",
    ],

    faqs: [
      {
        question: "What does a dietitian do?",
        answer:
          "Dietitians provide evidence-based nutrition guidance tailored to individual health conditions, dietary needs, and goals.",
      },
      {
        question: "Can a dietitian help with weight management?",
        answer:
          "Yes. A dietitian can create an individualized nutrition and lifestyle plan to support healthy and sustainable weight management.",
      },
      {
        question: "Can nutrition help manage diabetes?",
        answer:
          "Appropriate nutrition can be an important part of diabetes management and should be personalized to the individual's health needs.",
      },
    ],
    treatments: [
      {
        icon: LuApple,
        title: "Nutrition Care",
        subtitle: "Complete dietary solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Dietitians",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuActivity,
        title: "Advanced Nutrition",
        subtitle: "Modern dietary technology",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored nutrition approaches",
      },
    ],
  },

  {
    Icon: LuAccessibility,
    name: "Physiotherapy",
    details: "Movement and physical rehabilitation",
    image: "/images/specialities/physiotherapy.png",
    color: specialityColors.teal,
    description:
      "Physiotherapy focuses on restoring and improving movement, strength, and physical function after injury, illness, or surgery. Physiotherapists use exercises, manual therapy, and other techniques to reduce pain, enhance mobility, and support long-term physical well-being.",

    commonConditions: [
      "Back pain",
      "Neck pain",
      "Sports injuries",
      "Joint stiffness",
      "Muscle injuries",
      "Post-surgical recovery",
    ],

    faqs: [
      {
        question: "What does a physiotherapist do?",
        answer:
          "Physiotherapists help improve movement, strength, flexibility, balance, and physical function after injury or illness.",
      },
      {
        question: "Can physiotherapy help with back pain?",
        answer:
          "Physiotherapy can help many people with back pain through individualized exercises, movement strategies, and other therapeutic techniques.",
      },
      {
        question: "How long does physiotherapy take?",
        answer:
          "The duration depends on the condition, severity, treatment goals, and individual response to therapy.",
      },
    ],
    treatments: [
      {
        icon: LuActivity,
        title: "Physical Therapy",
        subtitle: "Complete movement solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Therapists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Therapy",
        subtitle: "Modern physical therapy tech",
      },
      {
        icon: LuSparkles,
        title: "Personalized Rehab",
        subtitle: "Tailored recovery approaches",
      },
    ],
  },

  {
    Icon: LuHeart,
    name: "Obstetrics & Gynecology",
    details: "Complete women's healthcare",
    image: "/images/specialities/obstetrics-gynecology.png",
    color: specialityColors.pink,
    description:
      "Obstetrics and gynecology focuses on women's reproductive health, including pregnancy, childbirth, and the diagnosis and treatment of conditions affecting the female reproductive system. OB-GYNs provide preventive care, manage pregnancies, and treat a wide range of gynecological conditions.",

    commonConditions: [
      "Pregnancy care",
      "Menstrual problems",
      "PCOS",
      "Endometriosis",
      "Hormonal disorders",
      "Women's reproductive health conditions",
    ],

    faqs: [
      {
        question: "What does an OB-GYN treat?",
        answer:
          "OB-GYN specialists provide healthcare related to pregnancy, childbirth, reproductive health, menstruation, and many gynecological conditions.",
      },
      {
        question: "When should I see an OB-GYN?",
        answer:
          "Women may see an OB-GYN for routine reproductive health care, pregnancy, menstrual concerns, pelvic symptoms, or other gynecological issues.",
      },
      {
        question: "Can an OB-GYN provide pregnancy care?",
        answer:
          "Yes. Obstetricians provide care during pregnancy, childbirth, and the postpartum period.",
      },
    ],
    treatments: [
      {
        icon: LuHeart,
        title: "Women's Care",
        subtitle: "Complete reproductive solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert OB-GYNs",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Imaging",
        subtitle: "Modern women's diagnostics",
      },
      {
        icon: LuSparkles,
        title: "Personalized Care",
        subtitle: "Tailored health approaches",
      },
    ],
  },

  {
    Icon: LuBaby,
    name: "Pediatric",
    details: "Specialized care for children",
    image: "/images/specialities/pediatric.png",
    color: specialityColors.orange,
    description:
      "Pediatric care focuses on the health and development of infants, children, and adolescents. Pediatric specialists provide focused medical expertise for specific childhood conditions that go beyond routine primary care. They work to diagnose, treat, and support the unique health needs of children.",

    commonConditions: [
      "Childhood infections",
      "Fever",
      "Asthma",
      "Allergies",
      "Growth problems",
      "Developmental concerns",
    ],

    faqs: [
      {
        question: "What age group does pediatric care cover?",
        answer:
          "Pediatric care focuses on the health and development of infants, children, and adolescents.",
      },
      {
        question: "What can a pediatric specialist help with?",
        answer:
          "Pediatric specialists provide focused care for specific childhood medical conditions and complex health concerns.",
      },
      {
        question: "When should my child see a pediatric specialist?",
        answer:
          "A child may be referred to a pediatric specialist when a condition requires expertise beyond routine pediatric care.",
      },
    ],
    treatments: [
      {
        icon: LuBaby,
        title: "Specialized Care",
        subtitle: "Complete child solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Specialists",
        subtitle: "Highly trained pediatricians",
      },
      {
        icon: LuScan,
        title: "Advanced Diagnostics",
        subtitle: "Modern child diagnostics",
      },
      {
        icon: LuHeart,
        title: "Personalized Plans",
        subtitle: "Tailored young patient care",
      },
    ],
  },

  {
    Icon: LuSmile,
    name: "Pediatric Dentistry",
    details: "Dental care for children",
    image: "/images/specialities/pediatric-dentistry.png",
    color: specialityColors.cyan,
    description:
      "Pediatric dentistry specializes in providing oral healthcare for infants, children, and adolescents. Pediatric dentists focus on preventing and treating dental issues in young patients, guiding healthy habits, and managing dental development from childhood through the teenage years.",

    commonConditions: [
      "Tooth decay",
      "Gum problems",
      "Tooth development problems",
      "Dental injuries",
      "Oral infections",
      "Early childhood cavities",
    ],

    faqs: [
      {
        question: "What does a pediatric dentist do?",
        answer:
          "Pediatric dentists specialize in providing dental care for infants, children, and adolescents.",
      },
      {
        question: "When should a child first see a dentist?",
        answer:
          "Children should have an early dental evaluation, with the timing determined according to pediatric dental recommendations and individual needs.",
      },
      {
        question: "Can pediatric dentists treat cavities?",
        answer:
          "Yes. Pediatric dentists diagnose and treat cavities and other dental conditions in children.",
      },
    ],
    treatments: [
      {
        icon: LuSmile,
        title: "Child Dental",
        subtitle: "Complete young patient solutions",
      },
      {
        icon: LuPersonStanding,
        title: "Expert Dentists",
        subtitle: "Highly trained specialists",
      },
      {
        icon: LuScan,
        title: "Advanced Tools",
        subtitle: "Modern pediatric dentistry",
      },
      {
        icon: LuSparkles,
        title: "Personalized Plans",
        subtitle: "Tailored oral approaches",
      },
    ],
  },
].map((speciality) => ({
  ...speciality,
  slug: createSpecialitySlug(speciality.name),
}));

export default specialities;
