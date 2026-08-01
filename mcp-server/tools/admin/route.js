import { z } from "zod";
import connectDB from "../../../src/lib/connectDB.js";
import Blog from "../../../src/models/Blog.js";
import { validateToken } from "../../../src/lib/jwt.js";

export function registerAdminTools(server) {
    //1.Update website content
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
    )

    //2.create a new blog post
    server.registerTool(

        "create_blog",
        {
            title: "Create Blog",
            description:
                "Creates a new blog post (title, description, image, and body). Requires a valid accessToken from verify_admin — admin only.",

            inputSchema: {
                accessToken: z.string().min(1, { message: "accessToken is required" }),
                title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
                description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
                image: z.string().optional(),
                body: z.string().min(20, { message: "Body must be at least 20 characters long" }),
            },
        },

        async ({ accessToken, title, description, image, body }) => {
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

                await connectDB();

                const newBlog = new Blog({
                    title,
                    description,
                    image,
                    body,
                    authorId: session.sub,
                });

                const savedBlog = await newBlog.save();

                return {
                    content: [{ type: "text", text: JSON.stringify({ success: true, blog: savedBlog }) }],
                };
            } catch (error) {
                return {
                    isError: true,
                    content: [{ type: "text", text: "Failed to create blog post: " + error.message }],
                };
            }
        }
    )


    // 3. Delete a blog post by ID or title
    server.registerTool(
        "delete_blog",
        {
            title: "Delete Blog",
            description:
                "Deletes an existing blog post by ID or title. Requires a valid admin access token.",

            inputSchema: {
                accessToken: z.string().min(1, "Access Token is required"),
                blogId: z.string().optional(),
                title: z.string().optional(),
            },
        },

        async ({ accessToken, blogId, title }) => {
            try {
                // Validate input
                if (!blogId && !title) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Either blogId or title must be provided.",
                            },
                        ],
                    };
                }

                // Verify token
                let session;

                try {
                    session = validateToken(accessToken);
                } catch {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Invalid or expired access token.",
                            },
                        ],
                    };
                }

                // Authorization
                if (!session?.isAuthenticated || session.role !== "admin") {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Unauthorized. Admin access required.",
                            },
                        ],
                    };
                }

                await connectDB();

                const query = blogId
                    ? { _id: blogId }
                    : { title: title };

                const deletedBlog = await Blog.findOneAndDelete(query);

                if (!deletedBlog) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Blog not found.",
                            },
                        ],
                    };
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    success: true,
                                    message: "Blog deleted successfully.",
                                    deletedBlog: {
                                        id: deletedBlog._id,
                                        title: deletedBlog.title,
                                        slug: deletedBlog.slug,
                                    },
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            } catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Failed to delete blog: ${error.message}`,
                        },
                    ],
                };
            }
        }
    );
server.registerTool(
  "update_blog",
  {
    title: "Update Blog",
    description:
      "Updates an existing blog post. Requires a valid admin access token.",

    inputSchema: {
      accessToken: z.string().min(1, "Access token is required"),
      blogId: z.string().min(1, "Blog ID is required"),

      title: z.string().min(5).optional(),
      description: z.string().min(10).optional(),
      image: z.string().optional(),
      body: z.string().min(20).optional(),
    },
  },

  async ({
    accessToken,
    blogId,
    title,
    description,
    image,
    body,
  }) => {
    try {
      // Verify token
      let session;

      try {
        session = validateToken(accessToken);
      } catch {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Invalid or expired access token.",
            },
          ],
        };
      }

      // Authorization
      if (!session?.isAuthenticated || session.role !== "admin") {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Unauthorized. Admin access required.",
            },
          ],
        };
      }

      await connectDB();

      // Build update object
      const updates = {};

      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (image !== undefined) updates.image = image;
      if (body !== undefined) updates.body = body;

      if (Object.keys(updates).length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "No fields provided to update.",
            },
          ],
        };
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $set: updates,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBlog) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Blog not found.",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                message: "Blog updated successfully.",
                blog: updatedBlog,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to update blog: ${error.message}`,
          },
        ],
      };
    }
  }
);

// 5. List all blog posts
server.registerTool(
    "list_blogs",{
        title: "list blogs",
        description: "Lists all blog posts. Requires a valid admin access token. Althous get all blog is public but for internal operation we need to restrict it to admin only.",
        inputSchema:{
            accessToken: z.string().min(1, {message : "Access Token is required"}),
        },
        },
        async({accessToken})=>{
            try{
                // Verify token
                let session;
    
                try {
                    session = validateToken(accessToken);
                } catch {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Invalid or expired access token.",
                            },
                        ],
                    };
                }
    
                // Authorization
                if (!session?.isAuthenticated || session.role !== "admin") {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: "Unauthorized. Admin access required.",
                            },
                        ],
                    };
                }
    
                await connectDB();
    
                const blogs = await Blog.find({});
    
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    success: true,
                                    blogs: blogs,
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }catch(error){
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Failed to list blogs: ${error.message}`,
                        },
                    ],
                };
            }
        }    
),


server.registerTool(
    "create_email_draft",{
        title: "create email",
        description: "Create email template and auto send to admin. This create email template and send to admin for those people who ask for contact me. This do not required any access Token because this is public tool and anyone can use it. Spically for HR, Recruiter and other people who want to contact me.",
        inputSchema:{
            name: z.string().min(1, {message: "Name is required"}),
            company: z.string().min(1, {message: "Company is required"}),
            subject: z.string().min(1, {message : "Subject is required"}),
            body: z.string().min(1, {message : "Body is required"}),
            to_email : z.string().email({message : "To email is required and must be valid email address"}),
        }
    }
)
}