interface Message {
  id: string;
  senderName: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  avatar: string;
}

export const recentMessages: Message[] = [
  {
    id: "msg-001",
    senderName: "Dr. Sarah Ahmed",
    subject: "Follow-up on blood pressure readings",
    preview:
      "Please share your latest home BP readings so we can adjust your medication if needed...",
    date: "2026-08-26",
    unread: true,
    avatar: "/images/users/user-avatar-1.png",
  },
  {
    id: "msg-002",
    senderName: "Apollo Hospital, Dhaka",
    subject: "Appointment confirmation",
    preview:
      "Your appointment with Dr. Sarah Ahmed on Sep 2 has been confirmed...",
    date: "2026-08-25",
    unread: true,
    avatar: "/images/users/user-avatar-2.png",
  },
  {
    id: "msg-003",
    senderName: "Dr. Rafiq Islam",
    subject: "Skin test results",
    preview:
      "Your allergy test results are ready. No major concerns were found...",
    date: "2026-08-23",
    unread: false,
    avatar: "/images/users/user-avatar-3.png",
  },
  {
    id: "msg-004",
    senderName: "Pharmacy Care",
    subject: "Prescription refill reminder",
    preview:
      "Your Amoxicillin prescription will finish soon. Refill now to avoid gaps...",
    date: "2026-08-21",
    unread: false,
    avatar: "/images/users/user-avatar-4.png",
  },
];
