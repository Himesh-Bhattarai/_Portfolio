/**
 * mcp-server/index.js
 *
 * Standalone entry point — run with `node mcp-server/index.js` to smoke-test
 * that every tool file in mcp-server/ still has valid syntax and registers
 * without throwing. This does NOT start a transport (no stdio/HTTP), so it
 * won't catch bugs inside a tool's async handler (those only run when a
 * client actually calls the tool) — only registration-time errors, like a
 * malformed tool definition or a bad import. app/api/chat/route.js is the
 * real caller, via an in-process InMemoryTransport (see server.js).
 */
import { createServer } from "./server.js"

createServer();