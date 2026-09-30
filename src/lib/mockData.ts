import type { Note, Person } from "@/types";

const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000);

export const MOCK_PEOPLE: Person[] = [
  { id: "p1", name: "Sharon", role: "mentee", track: "Software", cohort: 9 },
  { id: "p2", name: "Dr. Chao", role: "founder", track: "Lead Mentor" },
  { id: "p3", name: "Brian", role: "mentee", track: "Data Science", cohort: 9 },
  { id: "p4", name: "Amani", role: "mentor", track: "Product Design" },
  { id: "p5", name: "Faith", role: "mentee", track: "Cybersecurity", cohort: 9 },
  { id: "p6", name: "Kevin", role: "mentee", track: "Software", cohort: 9 },
  { id: "p7", name: "Wanjiku", role: "mentee", track: "Product", cohort: 9 },
  { id: "p8", name: "Trevor", role: "mentor", track: "Peer Mentor" },
  { id: "p9", name: "Njeri", role: "mentee", track: "UX Design", cohort: 9 },
  { id: "p10", name: "Joseph", role: "alumni", track: "Software", cohort: 6 },
  { id: "p11", name: "Amina", role: "mentor", track: "Data Science" },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "1", recipientId: "p1", recipientName: "Sharon", recipientRole: "mentee", recipientTrack: "Software",
    message: "Your willingness to help everyone debug their React project at 11 PM never goes unnoticed. Keep shining!",
    palette: "plum", format: "swatch", icon: "flower",
    authorName: null, reactions: 18, createdAt: hoursAgo(2),
  },
  {
    id: "2", recipientId: "p2", recipientName: "Dr. Chao", recipientRole: "founder", recipientTrack: "Lead Mentor",
    message: "Thank you for creating KamiLimu. You taught me to believe my voice belongs in tech conferences and global rooms.",
    palette: "marigold", format: "tin", icon: "star",
    authorName: "Lynn (Cohort 7 Alum)", reactions: 42, createdAt: hoursAgo(24),
  },
  {
    id: "3", recipientId: "p3", recipientName: "Brian", recipientRole: "mentee", recipientTrack: "Data Science",
    message: "Brian, you crushed your mock interview today! The way you explained system design trade-offs was so crystal clear.",
    palette: "olive", format: "print", icon: "sparkle",
    authorName: "Kevin (Peer Mentor)", reactions: 12, createdAt: hoursAgo(3),
  },
  {
    id: "4", recipientId: "p4", recipientName: "Amani", recipientRole: "mentor", recipientTrack: "Product Design",
    message: "Amani's design critique was so gentle yet deeply insightful. I completely rewrote my UX portfolio because of your advice!",
    palette: "rose", format: "print", icon: "butterfly",
    authorName: null, reactions: 29, createdAt: hoursAgo(26),
  },
  {
    id: "5", recipientId: "p5", recipientName: "Faith", recipientRole: "mentee", recipientTrack: "Cybersecurity",
    message: "Faith, your energy in peer sessions always lifts the entire breakout room. Thank you for your kindness and authentic warmth.",
    palette: "olive", format: "swatch", icon: "plant",
    authorName: "A Cohort 9 Friend", reactions: 15, createdAt: hoursAgo(4),
  },
  {
    id: "6", recipientId: "p6", recipientName: "Kevin", recipientRole: "mentee", recipientTrack: "Software",
    message: "Kevin: never lose that curious spark. The questions you ask in mentor talks push all of us to learn deeper and stay humble.",
    palette: "ocean", format: "tin", icon: "sun",
    authorName: "Dr. Chao", reactions: 21, createdAt: hoursAgo(50),
  },
  {
    id: "7", recipientId: "p7", recipientName: "Wanjiku", recipientRole: "mentee", recipientTrack: "Product",
    message: "Wanjiku, seeing you lead the community showcase made us all so proud! You're a natural, empathetic leader.",
    palette: "cream", format: "print", icon: "lotus",
    authorName: null, reactions: 34, createdAt: hoursAgo(72),
  },
  {
    id: "8", recipientId: "p8", recipientName: "Trevor", recipientRole: "mentor", recipientTrack: "Peer Mentor",
    message: "To our peer mentor Trevor: thank you for checking in on me during finals week. It honestly made all the difference.",
    palette: "marigold", format: "swatch", icon: "heart",
    authorName: "Faith (Cohort 9)", reactions: 19, createdAt: hoursAgo(5),
  },
];