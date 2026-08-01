/**
 * mcp-server/tools/auth/route.js
 *
 * Exactly one tool: verify_admin — the ONLY place a password is checked.
 * Calls the shared verifyAdmin() from src/lib/ (also used by
 * app/api/admin-login/route.js) so the check exists in one place. On
 * success it returns a signed accessToken as tool output text, NOT a
 * cookie — a bare MCP tool has no HTTP response to set one on. Only
 * app/api/chat/route.js, a real Next.js route, can turn that token into
 * the actual httpOnly session cookie.
 *
 * Every OTHER privileged tool (mcp-server/tools/admin/route.js) takes that
 * same accessToken as an argument and re-validates it fresh on every call
 * — verify_admin is never re-trusted, only its output token is.
 *
 * Standalone Node script, not bundled by Next — imports need explicit
 * `.js` extensions; no `@/` alias here.
 */
import { z } from "zod";
import { verifyAdmin } from "../../../src/lib/verifyAdmin.js";

export function registerAuthTool(server) {

    server.registerTool(
        "verify_admin",
        {
            title: "Verify Admin",
            description: "Since this is a portfolio project, there is only one admin and no other users. This tool is used to verify if the user who say `switch to admin mode ` is accutally the admin or not. The admin is verified by checking if the user has the correct password or not. If the user has the correct password, then the user is verified as admin and can access the admin mode. If the user does not have the correct password, then the user is not verified as admin and cannot access the admin mode.",

            inputSchema: {
                email: z.string().email(),
                password: z.string().min(1, { message: "Password is required" })
            },
        },

        async ({ email, password }) => {
            try {
                const result = await verifyAdmin({ id: email, password });

                if (!result.isAuthenticated) {
                    return {
                        isError: true,
                        content: [{ type: "text", text: result.message }],
                    };
                }

                // accessToken travels back to the caller (the future
                // /api/chat orchestrator) as tool output — it does NOT get
                // set as a cookie here, because a standalone MCP tool has
                // no HTTP response to attach one to. Only the orchestrator,
                // which is a real Next.js route, can do that.
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                isAuthenticated: true,
                                accessToken: result.accessToken,
                            }),
                        },
                    ],
                };
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: "Internal error verifying admin: " + error.message }],
                };
            }
        }
    );
}
