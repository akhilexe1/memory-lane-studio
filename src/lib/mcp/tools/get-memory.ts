import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { memories } from "../memories";

export default defineTool({
  name: "get_memory",
  title: "Get memory",
  description: "Get one scrapbook memory by its id.",
  inputSchema: { id: z.string().min(1).describe("The memory id, e.g. \"1\".") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const memory = memories.find((m) => m.id === id);
    if (!memory) throw new ToolError(`No memory found with id "${id}".`);
    return {
      content: [{ type: "text", text: JSON.stringify(memory, null, 2) }],
      structuredContent: { memory },
    };
  },
});
