import { defineMcp } from "@lovable.dev/mcp-js";
import listMemories from "./tools/list-memories";
import getMemory from "./tools/get-memory";
import suggestCaption from "./tools/suggest-caption";

export default defineMcp({
  name: "memory-lane-studio",
  title: "Memory Lane Studio",
  version: "0.1.0",
  instructions:
    "Tools for the Memory Lane Studio scrapbook. Use `list_memories` to browse the public board, `get_memory` for one entry, and `suggest_caption` to write handwritten-style captions.",
  tools: [listMemories, getMemory, suggestCaption],
});
