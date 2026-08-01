Session/auth tools. These issue or check session state — they never grant
admin access themselves; they call the real backend routes
(`/api/auth/status`, `/api/admin-login`, `/api/auth/webauthn/verify`,
`/api/auth/otp/verify`) which do the actual validation.

Planned: check_session, admin_login, verify_2fa.
