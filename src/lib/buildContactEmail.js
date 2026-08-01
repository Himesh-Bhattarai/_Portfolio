// Shared by app/api/contact/route.js (sends via Resend) and the MCP
// create_email_draft tool (drafts only, never sends) so both build the
// same "email addressed to Himesh" text from the same fields instead of
// duplicating the template. The destination is fixed here, never taken
// from caller input — create_email_draft is a public, unauthenticated
// tool, and letting it set its own "to" would make it a spam vector.
const ADMIN_EMAIL = "himesh.hcb@gmail.com";

export function buildContactEmail({ name, email, subject, message, company }) {
  const fullSubject = `[Portfolio Contact] ${subject}`;

  const text = `New Portfolio Contact

Name: ${name}
Email: ${email}${company ? `\nCompany: ${company}` : ""}

Subject:
${subject}

Message:
${message}
`;

  return { to: ADMIN_EMAIL, subject: fullSubject, text };
}
