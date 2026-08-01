import { z } from "zod";
import connectDB from "../../../src/lib/connectDB.js";
import Blog from "../../../src/models/Blog.js";

// Static, real info about Himesh — not fabricated, sourced from the same
// content already on the site (About.jsx / Resume.jsx). A live GitHub API
// call could extend this later, but that needs a GITHUB_TOKEN env var and
// rate-limit handling — deliberately left out for now rather than wired
// in silently.
const PROFILE_INFO = {
    name: "Himeshchanchal Bhattarai",
    role: "Full Stack Developer",
    location: "Kathmandu, Nepal",
    focus: "React, Next.js, Node.js, MongoDB, and AI/MCP engineering.",
    github: "https://github.com/Himesh-Bhattarai",
};

export function publicCall(server) {
    server.registerTool(
        "get_project_info",
        {
            title: "Project Information",
            description:
                "Gets information about Himesh's background, skills, and published blog posts. Public tool — no authentication required.",

            inputSchema: {
                query: z.string().min(1, { message: "Query is required" }),
            },
        },

        async ({ query }) => {
            try {
                await connectDB();

                const blogs = await Blog.find()
                    .select("title description createdAt")
                    .sort({ createdAt: -1 })
                    .limit(5);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                profile: PROFILE_INFO,
                                recentBlogPosts: blogs,
                                query,
                            }),
                        },
                    ],
                };
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: "Failed to fetch project information: " + error.message }],
                };
            }
        }
    );
}
