import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const role = v.union(
  v.literal("mentee"),
  v.literal("mentor"),
  v.literal("alumni"),
  v.literal("intern"),
  v.literal("fellow"),
  v.literal("commitee"),
  v.literal("founder")
);
const palette = v.union(
  v.literal("plum"), v.literal("olive"), v.literal("cream"),
  v.literal("ocean"), v.literal("rose"), v.literal("marigold"), v.literal("noir")
);
const format = v.union(
  v.literal("swatch"), v.literal("tin"), v.literal("print")
);
const icon = v.union(
  v.literal("flower"), v.literal("tulip"), v.literal("lotus"), v.literal("leaf"),
  v.literal("plant"), v.literal("heart"), v.literal("star"), v.literal("sparkle"),
  v.literal("butterfly"), v.literal("sun")
);

export default defineSchema({
  people: defineTable({
    name: v.string(),
    role,
    track: v.optional(v.string()),
    cohort: v.optional(v.number()),
  }),

  notes: defineTable({
    recipientId: v.string(),
    recipientName: v.string(),
    recipientRole: role,
    recipientTrack: v.optional(v.string()),
    message: v.string(),
    palette,
    format,
    icon,
    authorName: v.union(v.string(), v.null()),
    reactions: v.number(),
  }),
});