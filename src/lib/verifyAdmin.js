import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { generateToken } from "./jwt.js";

// Shared by app/api/admin-login/route.js and the MCP verify_admin tool so
// both call the same real check instead of duplicating it or one HTTP
// self-fetching the other. Returns a plain result — it never touches
// cookies, since only an actual HTTP response (the API route, or later
// the /api/chat orchestrator) can set those.
export async function verifyAdmin({ id, password }) {

  if (!id || !password) {
    return { success: false, isAuthenticated: false, message: "Please provide all the required fields" };
  }

  if (id !== process.env.ADMIN_ID) {
    return { success: false, isAuthenticated: false, message: "Invalid ID" };
  }

  const isPasswordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!isPasswordMatch) {
    return { success: false, isAuthenticated: false, message: "Invalid username or password" };
  }

  const payload = {
    sub: "Admin",
    username: "_himeshbhattarai",
    isAuthenticated: true,
    role: "admin",
    permissions: ["create", "read", "update", "delete"],
    sessionId: crypto.randomUUID(),
  };

  const accessToken = await generateToken(payload);
  if (!accessToken) {
    return { success: false, isAuthenticated: false, message: "Failed to generate access token" };
  }

  return { success: true, isAuthenticated: true, message: "Admin verified successfully", accessToken };
}
