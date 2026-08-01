// Provider-agnostic LLM resolver, per plan.md: swapping LLM_PROVIDER
// should never require touching /api/chat or the MCP tool layer.
// ollama.js / anthropic.js don't exist yet — add them and point
// LLM_PROVIDER at one once a provider is chosen.
export async function getProvider() {
  const provider = process.env.LLM_PROVIDER;

  if (provider === "ollama") {
    const mod = await import("./ollama.js");
    return mod;
  }

  if (provider === "anthropic") {
    const mod = await import("./anthropic.js");
    return mod;
  }

  return null;
}
