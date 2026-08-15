import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const styles = {
  handwritten: (s: string) => s.toLowerCase(),
  retro: (s: string) => `${s.toLowerCase()} ✦ forever`,
  romantic: (s: string) => `the day ${s.toLowerCase()} felt like home`,
} as const;

export default defineTool({
  name: "suggest_caption",
  title: "Suggest caption",
  description:
    "Turn a short description of a photo into a scrapbook-style handwritten caption.",
  inputSchema: {
    description: z.string().trim().min(1).max(200).describe("What the photo shows."),
    style: z
      .enum(["handwritten", "retro", "romantic"])
      .default("handwritten")
      .describe("Caption tone."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ description, style }) => {
    const caption = styles[style](description);
    return {
      content: [{ type: "text", text: caption }],
      structuredContent: { caption, style },
    };
  },
});
