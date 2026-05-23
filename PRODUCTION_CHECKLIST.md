# SkillBridge Production Checklist

## Runtime
- Set `NODE_ENV=production`.
- Configure `MONGO_URL` to a managed MongoDB deployment.
- Set `CORS_ORIGIN` to the real frontend origin.
- Review `SESSION_TTL_DAYS`, `MAX_SESSIONS_PER_ACCOUNT`, and rate-limit values including `DAILY_USER_RATE_LIMIT_MAX_REQUESTS`.
- Run the backend behind a reverse proxy with HTTPS termination.

## Security
- Move browser auth to secure HttpOnly cookies before public launch.
- Add CSRF protection if cookie-based auth is introduced.
- Add audit logging for auth, task review, and payment actions.
- Add stronger input validation for every write endpoint.
- Add secrets management outside plain `.env` files in deployment.

## QA
- Keep `npm test` and `npm run check` green for `server`.
- Keep `npm run build` green for `client`.
- Add integration tests for student-company bridge, workspace onboarding, and payment flow.
- Add browser E2E tests for critical user journeys.

## Ops
- Monitor `/health`, `/ready`, and `/live`.
- Collect structured logs from stdout.
- Add uptime alerts, error alerts, and database connectivity alerts.
- Add backup and restore procedures for MongoDB.
- Document incident response and rollback steps.

## Product Gaps Before Public Release
- Replace localStorage token storage with a safer session transport.
- Integrate real payment rails.
- Add file storage for videos, attachments, and proofs.
- Add role/permission auditing across all company and student actions.
