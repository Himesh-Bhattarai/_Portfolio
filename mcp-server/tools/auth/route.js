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
