// Not implemented yet — fill in once Claude is chosen as the provider.
// Must export chat({ message, tools, isAuthenticated, callTool }) matching
// ollama.js's shape, so /api/chat and the MCP tool layer don't change
// when switching providers.
export async function chat() {
  throw new Error("Anthropic provider not implemented yet — see src/lib/llm/README.md");
}
