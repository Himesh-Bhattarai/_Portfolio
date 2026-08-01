/**
 * mcp-server/server.js
 *
 * Builds the McpServer instance and registers every tool group. This is
 * the one place that assembles auth/public/admin tools together — add a
 * new tool group's register*(server) call here, nowhere else.
 *
 * Consumed two ways:
 *  - `node mcp-server/index.js` — standalone smoke test, no transport.
 *  - app/api/chat/route.js — connects a real MCP client to this server
 *    in-process via InMemoryTransport (see that file's own comment).
 *
 * Standalone Node script, not bundled by Next — imports need explicit
 * `.js` extensions; no `@/` alias here.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerAuthTool } from "./tools/auth/route.js";
import { publicCall } from "./tools/public/route.js";
import { registerAdminTools } from "./tools/admin/route.js";

export function createServer(){
    const server = new McpServer({
        name: "Portfolio MCP Server",
        version: "0.0.1",
        description: "MCP server for Himesh Bhattarai's portfolio",

    });

    registerAuthTool(server);
    publicCall(server);
    registerAdminTools(server);

    return server;
}