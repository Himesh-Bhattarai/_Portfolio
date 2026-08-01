import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerAuthTool } from "./tools/auth/route.js";
import { publicCall } from "./tools/public/route.js";

export function createServer(){
    const server = new McpServer({
        name: "Portfolio MCP Server",
        version: "0.0.1",
        description: "MCP server for Himesh Bhattarai's portfolio",

    });

    registerAuthTool(server);
    publicCall(server);

    return server;
}