import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../../../mcp-server/server.js";
import { validateToken } from "@/lib/jwt";
import { getProvider } from "@/lib/llm";

// Tool names that require a real admin session before the LLM is even
// told they exist. verify_admin is intentionally NOT in this set — it's
// how login itself happens, so it must stay reachable while logged out.
const PRIVILEGED_TOOLS = new Set(["create_blog", "edit_blog", "delete_blog", "update_content"]);

// Connects an MCP client to our own MCP server in-process, over a real
// MCP protocol connection (InMemoryTransport — linked in-memory streams,
// no subprocess/network). This is what keeps the tool layer "real MCP"
// per plan.md, rather than plain function calls.
async function connectMcpClient() {
  const mcpServer = createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const mcpClient = new Client({ name: "portfolio-chat-orchestrator", version: "0.0.1" });

  await mcpServer.connect(serverTransport);
  await mcpClient.connect(clientTransport);

  return mcpClient;
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, message: "message is required" },
        { status: 400 }
      );
    }

    // Real session check, straight from the request's cookie — this is
    // what decides authorization, never anything the model says.
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    let session = null;

    if (token) {
      try {
        session = validateToken(token);
      } catch {
        session = null;
      }
    }

    const isAuthenticated = Boolean(session?.isAuthenticated && session.role === "admin");

    const mcpClient = await connectMcpClient();
    const { tools: allTools } = await mcpClient.listTools();

    // Privileged tools are only offered to the model if the real cookie
    // check above passed — the LLM can't call a tool it was never told
    // about, regardless of what the conversation claims.
    const availableTools = allTools.filter(
      (tool) => isAuthenticated || !PRIVILEGED_TOOLS.has(tool.name)
    );

    const provider = await getProvider();

    if (!provider) {
      return NextResponse.json({
        success: true,
        reply:
          "LLM provider isn't configured yet — set LLM_PROVIDER in .env.local once one's chosen. " +
          "The MCP tool layer is live though: " +
          availableTools.map((t) => t.name).join(", "),
        isAuthenticated,
        tools: availableTools.map((t) => t.name),
      });
    }

    const result = await provider.chat({
      message,
      tools: availableTools,
      isAuthenticated,
      callTool: (name, args) => mcpClient.callTool({ name, arguments: args }),
    });

    return NextResponse.json({ success: true, isAuthenticated, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
