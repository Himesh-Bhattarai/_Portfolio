## LLM provider abstraction (scaffold only — not implemented yet)

Goal: a single interface the `/api/chat` orchestrator calls, so switching
`LLM_PROVIDER` between `ollama` and `anthropic` requires no code changes
elsewhere (the MCP tool schema stays provider-agnostic).

### Planned files

- `index.js` — `getProvider()`, reads `LLM_PROVIDER` env var, returns the
  matching implementation
- `ollama.js` — calls a local Ollama instance (`OLLAMA_BASE_URL`,
  `OLLAMA_MODEL`). Requires Ollama installed and running locally, and a
  tool-calling-capable model pulled (e.g. `llama3.1` or `qwen2.5`
  instruct-class — verify tool-call reliability before trusting it with the
  admin flow)
- `anthropic.js` — calls the Claude API (`ANTHROPIC_API_KEY`). Intended as
  the production swap once the Ollama path is validated end-to-end.

Both must implement the same `chat({ messages, tools })` shape.
