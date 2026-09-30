import { mutation } from "./_generated/server";
type SchemaRole =
  | "mentee"
  | "mentor"
  | "alumni"
  | "founder"
  | "intern"
  | "fellow"
  | "committee";
const VALID_ROLES: SchemaRole[] = [
  "mentee",
  "mentor",
  "alumni",
  "founder",
  "intern",
  "fellow",
  "committee",
];

function normalizeRole(raw: string): SchemaRole {
  const lower = raw.toLowerCase() as SchemaRole;
  if (!VALID_ROLES.includes(lower)) {
    throw new Error(
      `Unknown role "${raw}" — check spelling against VALID_ROLES.`,
    );
  }
  return lower;
}

const PEOPLE: { name: string; role: string; cohort?: number }[] = [
  { name: "Anthony Nguthiru", role: "mentor" },
  { name: "Tamira Atieno", role: "mentee", cohort: 9 },
  { name: "David Mungai Guchu", role: "mentee", cohort: 9 },
  { name: "Sharon Chang'ach", role: "mentor" },
  { name: "Kevin Mwaluko Wambua", role: "mentee", cohort: 9 },
  { name: "Joy Melvine Okinyi", role: "mentee", cohort: 9 },
  { name: "Ian Kiprotich", role: "mentee", cohort: 9 },
  { name: "Sherry Obare", role: "mentor" },
  { name: "Joyline Njeri Wanjiru", role: "mentee", cohort: 9 },
  { name: "Cherise Fasey Osambo", role: "mentee", cohort: 9 },
  { name: "Jenas Jermaine Baraka Munene", role: "mentee", cohort: 9 },
  { name: "Sheila Sharon", role: "mentor" },
  { name: "Maxwell Muthee Gitahi", role: "mentee", cohort: 9 },
  { name: "Catherine Atieno", role: "mentee", cohort: 9 },
  { name: "Sharleen Kariuki", role: "mentor" },
  { name: "Joan Akello Ouma", role: "mentee", cohort: 9 },
  { name: "Steve Lutali Wanangwe", role: "mentee", cohort: 9 },
  { name: "Edwin Mwangi Muigai", role: "mentee", cohort: 9 },
  { name: "Hansel Omondi", role: "mentor" },
  { name: "Chris Waweru Gichohi", role: "mentee", cohort: 9 },
  { name: "Christine Wangui Mugo", role: "mentee", cohort: 9 },
  { name: "Mercy Mawia Musyoka", role: "mentee", cohort: 9 },
  { name: "Augustine Chironga", role: "mentor" },
  { name: "Eleanora Matalanga Nyakio", role: "mentee", cohort: 9 },
  { name: "Addy Mutuiri", role: "mentee", cohort: 9 },
  { name: "Elaine Wambui", role: "mentor" },
  { name: "Albert Ng'ang'a Kung'u", role: "mentee", cohort: 9 },
  { name: "Tabitha Margaret Wangechi", role: "mentee", cohort: 9 },
  { name: "Mutwa Maryanne Farida", role: "mentee", cohort: 9 },
  { name: "Godish Kimberly", role: "mentor" },
  { name: "Bildad Gitonga", role: "mentee", cohort: 9 },
  { name: "Stephen Gichonge Chacha", role: "mentee", cohort: 9 },
  { name: "Esther Achieng Oyoo", role: "mentee", cohort: 9 },
  { name: "Mozart Kandie", role: "mentor" },
  { name: "Bernadette Wambui Karanja", role: "mentee", cohort: 9 },
  { name: "Newton Murianki", role: "mentee", cohort: 9 },
  { name: "Peter Mulu", role: "mentor" },
  { name: "Isaac Mwangi Njuguna", role: "mentee", cohort: 9 },
  { name: "Mercyline Nyaboke", role: "mentee", cohort: 9 },
  { name: "Angela Kinoro", role: "mentor" },
  { name: "Michelle Tulah", role: "mentee", cohort: 9 },
  { name: "Faith Mutheu Mutua", role: "mentee", cohort: 9 },
  { name: "Lewis Gitau Ndung'u", role: "mentee", cohort: 9 },
  { name: "Ryan Kyaka", role: "mentor" },
  { name: "Joy Mbugua", role: "mentee", cohort: 9 },
  { name: "Diana Awino Njeri Achola", role: "mentee", cohort: 9 },
  { name: "Gerald Muteru Wangome", role: "mentee", cohort: 9 },
  { name: "Fidel Otieno", role: "mentor" },
  { name: "Violet Atieno Onyango", role: "mentee", cohort: 9 },
  { name: "Nancy Wangare", role: "mentee", cohort: 9 },
  { name: "George Mark Okumu", role: "mentee", cohort: 9 },
  { name: "Gwendolyn Amanda", role: "intern" },
  { name: "Bridgette Musango", role: "fellow" },
  { name: "Joy Nyayieka", role: "mentor" },
  { name: "James Masara", role: "mentor" },
  { name: "Julia", role: "mentor" },
  { name: "Mark", role: "committee" },
  { name: "Collins", role: "committee" },
  { name: "Beryl", role: "committee" },
  { name: "Abdul", role: "committee" },
  { name: "Linet", role: "committee" },
];

const NOTES: {
  recipientName: string;
  recipientRole: string;
  recipientTrack?: string;
  message: string;
  palette: "plum" | "olive" | "cream" | "ocean" | "rose" | "marigold" | "noir";
  format: "swatch" | "tin" | "print";
  icon:
    | "flower"
    | "tulip"
    | "lotus"
    | "leaf"
    | "plant"
    | "heart"
    | "star"
    | "sparkle"
    | "butterfly"
    | "sun";
  authorName: string | null;
}[] = [
  {
    recipientName: "Bridgette Musango",
    recipientRole: "fellow",
    message: "Thank you for coming up with flowers for mentees!",
    palette: "plum",
    format: "swatch",
    icon: "flower",
    authorName: null,
  },
];

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const already = await ctx.db.query("people").first();
    if (already) {
      console.log("Already seeded, skipping.");
      return;
    }

    const idByName = new Map<string, string>();
    for (const p of PEOPLE) {
      const id = await ctx.db.insert("people", {
        name: p.name,
        role: normalizeRole(p.role),
        cohort: p.cohort,
      });
      idByName.set(p.name, id);
    }

    for (const n of NOTES) {
      const recipientId = idByName.get(n.recipientName);
      if (!recipientId) {
        throw new Error(
          `No person named "${n.recipientName}" in PEOPLE — check the spelling.`,
        );
      }
      await ctx.db.insert("notes", {
        recipientId,
        recipientName: n.recipientName,
        recipientRole: normalizeRole(n.recipientRole),
        ...(n.recipientTrack ? { recipientTrack: n.recipientTrack } : {}),
        message: n.message,
        palette: n.palette,
        format: n.format,
        icon: n.icon,
        authorName: n.authorName,
        reactions: 0,
      });
    }
  },
});
