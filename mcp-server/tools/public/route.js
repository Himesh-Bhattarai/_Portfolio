/**
 * mcp-server/tools/public/route.js
 *
 * Public MCP tools — no accessToken, no auth check, safe for any visitor:
 * get_project_info (profile + recent blog posts) and get_experience_info
 * (work history). Content here is static, inline data mirroring what's
 * already on the site (About.jsx / Resume.jsx / Experience.jsx), per
 * CLAUDE.md's "inline data, not a content folder" convention — this file
 * can't import those .jsx files directly (MCP server is plain Node, can't
 * parse JSX), so the same facts are duplicated here deliberately, the same
 * way ProjectShowcase.jsx's project data is duplicated rather than shared.
 *
 * Runs as a standalone Node script, not through Next's bundler — imports
 * need explicit `.js` extensions and relative paths (no `@/` alias).
 */

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

// Static, real experience info sourced from Experience.jsx's
// `experienceContent` — kept in sync manually (see file header comment on
// why this can't just import the .jsx file).
const EXPERIENCE_INFO = [
    {
        period: "Sep 2025 – Oct 2026",
        title: "Junior Full Stack Developer",
        company: "Infinite Pro Technology Pvt. Ltd.",
        location: "Lalitpur, Nepal",
        description:
            "Worked as a Junior Full Stack Developer after successfully completing the internship, contributing to the development and maintenance of production web applications using the MERN stack, Next.js, and TypeScript.",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "REST API", "Git"],
    },
    {
        period: "Apr 2025 – Aug 2025",
        title: "Full Stack Developer Intern",
        company: "Infinite Pro Technology Pvt. Ltd.",
        location: "Lalitpur, Nepal",
        description:
            "Completed a full-stack development internship, gaining hands-on experience in modern web development while contributing to real-world business applications.",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Git"],
    },
    {
        period: "2023 – Present",
        title: "Independent Full Stack Developer",
        company: "Personal Projects & Open Source",
        location: "Kathmandu, Nepal",
        description:
            "Continuously building personal projects to explore modern web development, AI engineering, and scalable software architecture beyond professional work.",
        skills: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Docker", "AI", "MCP"],
    },
];

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

    server.registerTool(
        "get_experience_info",
        {
            title: "Experience Information",
            description: "Gets information about Himesh's professional and independent experience since 2023. Public tool - no authentication required.",

            inputSchema: {
                query: z.string().min(1, { message: "Query is required" }),
            },
        },

        async ({ query }) => {
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            experience: EXPERIENCE_INFO,
                            query,
                        }),
                    },
                ],
            };
        }
    );
}
