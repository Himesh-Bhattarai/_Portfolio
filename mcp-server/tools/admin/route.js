import { z } from "zod";
import connectDB from "../../../src/lib/connectDB.js";
import Blog from "../../../src/models/Blog.js";
import { validateToken } from "../../../src/lib/jwt.js";

export function registerAdminTools(server) {
    server.registerTool(
        "update_content",
        {
            title: "Update Content",
            description:
                "Updates an existing blog post (title, description, image, and/or body). Requires a valid accessToken from verify_admin — admin only.",

            inputSchema: {
                accessToken: z.string().min(1, { message: "accessToken is required" }),
                blogId: z.string().min(1, { message: "blogId is required" }),
                title: z.string().min(5).optional(),
                description: z.string().min(10).optional(),
                image: z.string().optional(),
                body: z.string().min(20).optional(),
            },
        },

        async ({ accessToken, blogId, title, description, image, body }) => {
            try {
                // Validate the TOKEN, not credentials — this is what
                // verify_admin's accessToken output is for. Every
                // privileged tool re-checks it fresh, every call.
                let session;
                try {
                    session = validateToken(accessToken);
                } catch {
                    return {
                        isError: true,
                        content: [{ type: "text", text: "Invalid or expired access token." }],
                    };
                }

                if (!session?.isAuthenticated || session.role !== "admin") {
                    return {
                        isError: true,
                        content: [{ type: "text", text: "Unauthorized — admin access required." }],
                    };
                }

                const updates = {};
                if (title) updates.title = title;
                if (description) updates.description = description;
                if (image) updates.image = image;
                if (body) updates.body = body;

                if (Object.keys(updates).length === 0) {
                    return {
                        isError: true,
                        content: [{ type: "text", text: "No fields provided to update." }],
                    };
                }

                await connectDB();

                const updated = await Blog.findByIdAndUpdate(blogId, updates, { new: true });

                if (!updated) {
                    return {
                        isError: true,
                        content: [{ type: "text", text: "Blog post not found." }],
                    };
                }

                return {
                    content: [{ type: "text", text: JSON.stringify({ success: true, blog: updated }) }],
                };
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: "Failed to update content: " + error.message }],
                };
            }
        }
    );
}
