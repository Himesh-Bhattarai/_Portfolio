Privileged tools. Every handler in this folder MUST verify the caller's real
session cookie/token server-side before doing anything — never trust a claim
made in the conversation. This is the enforcement boundary that keeps
non-admin visitors from misusing the chat agent.

Planned: create_blog, edit_blog, delete_blog.
