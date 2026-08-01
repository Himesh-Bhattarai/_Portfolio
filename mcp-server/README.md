## MCP server (scaffold only — not implemented yet)

This will host the Model Context Protocol server that exposes tools to the
portfolio's chat agent (`SearchBar` -> `/api/chat` orchestrator).

Nothing here executes yet. See `/plan.md` at the repo root for the full
design and current build phase.

### Layout

- `tools/public/` — unauthenticated tools any visitor's chat session can call
  (e.g. search_projects, get_resume, get_experience, submit_contact_message)
- `tools/auth/` — session tools (check_session, admin_login, verify_2fa)
- `tools/admin/` — privileged tools that require a valid admin session,
  checked server-side on every call (create_blog, edit_blog, delete_blog)
- `server.js` (not yet created) — MCP server entrypoint that registers the
  tools above and exposes them over the protocol
