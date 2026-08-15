import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { memories, memoryShape } from "../memories";

export default defineTool({
  name: "list_memories",
  title: "List memories",
  description: "List every memory pinned to the public scrapbook board, with captions and dates.",
  inputSchema: {},
  outputSchema: { memories: z.array(z.object(memoryShape)) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(memories, null, 2) }],
    structuredContent: { memories },
  }),
});
