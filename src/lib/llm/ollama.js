// Not implemented yet — fill in once Ollama is chosen as the provider.
// Must export chat({ message, tools, isAuthenticated, callTool }) matching
// anthropic.js's shape, so /api/chat and the MCP tool layer don't change
// when switching providers.
export async function chat() {
  throw new Error("Ollama provider not implemented yet — see src/lib/llm/README.md");
}
