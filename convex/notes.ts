import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").order("desc").take(200);
  },
});

export const create = mutation({
  args: {
    recipientId: v.string(),
    recipientName: v.string(),
    recipientRole: v.union(
      v.literal("mentee"),
      v.literal("mentor"),
      v.literal("alumni"),
      v.literal("founder"),
      v.literal("intern"),
      v.literal("fellow"),
      v.literal("committee"),
    ),
    recipientTrack: v.optional(v.string()),
    message: v.string(),
    palette: v.union(
      v.literal("plum"),
      v.literal("olive"),
      v.literal("cream"),
      v.literal("ocean"),
      v.literal("rose"),
      v.literal("marigold"),
      v.literal("noir"),
    ),
    format: v.union(v.literal("swatch"), v.literal("tin"), v.literal("print")),
    icon: v.union(
      v.literal("flower"),
      v.literal("tulip"),
      v.literal("lotus"),
      v.literal("leaf"),
      v.literal("plant"),
      v.literal("heart"),
      v.literal("star"),
      v.literal("sparkle"),
      v.literal("butterfly"),
      v.literal("sun"),
    ),
    authorName: v.union(v.string(), v.null()),
    // Note: no `reactions`, no `createdAt` argument. The client cannot set either.
  },
  handler: async (ctx, args) => {
    const message = args.message.trim();
    if (message.length < 10 || message.length > 240) {
      throw new ConvexError("Message must be between 10 and 240 characters.");
    }
    if (args.recipientName.length > 80) {
      throw new ConvexError("Recipient name is too long.");
    }
    if (args.authorName && args.authorName.length > 40) {
      throw new ConvexError("Signature is too long.");
    }

    await ctx.db.insert("notes", { ...args, message, reactions: 0 });
  },
});
