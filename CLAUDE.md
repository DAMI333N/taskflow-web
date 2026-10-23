# TaskFlow Web: NTU AIE Module 4 stretch Option 2

Frontend for the TaskFlow API (DAMI333N/taskflow-api). Due Thu 29 Oct 2026. Target: full marks.
Started from my graded Module 2 repo DAMI333N/task-manager (remote upstream, push disabled).
Never push to upstream. Tracked by issue #8 in DAMI333N/taskflow-api; close it there with
gh issue close 8 -R DAMI333N/taskflow-api, never with a commit keyword from this repo.
After grading this becomes a portfolio app, so keep it clean and honest.

## Environment
- Windows PC, Node 22, npm. Dev server: npm run dev on http://localhost:5173.
- API during development: http://localhost:8080, an SSH tunnel to the API container on aiedev.
  Later: the Railway URL. The base URL comes only from VITE_API_BASE_URL.
- .env files are blocked for you by a hook. I create and edit .env.development myself.
- GitHub through gh (logged in as DAMI333N). Add -R DAMI333N/taskflow-web when gh asks which repo.

## API contract (server is the source of truth)
Base URL: import.meta.env.VITE_API_BASE_URL (no trailing slash).
Task: { id: number, title, description, status: "todo"|"in-progress"|"done",
        priority: "low"|"medium"|"high", completed: boolean }
GET /api/tasks, GET /api/tasks/{id}, POST /api/tasks (201), PUT /api/tasks/{id} (200, full
replace), DELETE /api/tasks/{id} (200), PUT /api/tasks/{id}/complete (200),
GET /api/tasks/summary (text/plain, 502 when the model is unavailable).
Errors: { status, message, timestamp }; 404 unknown id, 400 invalid fields.

## Stack and patterns
Vite 8, React 19, react-router-dom 7, plain CSS. No new runtime dependency without asking.
Lesson 2.5 fetch pattern: check response.ok, loading and error states, update state from the
server's response. Lesson 2.11: VITE_ env vars, .env* gitignored with .env.example committed,
public/_redirects "/*  /index.html  200", Netlify build npm run build, publish dist.
Use the Browser pane on localhost:5173 after each change. Run npm run lint and npm run build
before every commit. Fix lint in code, never in eslint.config.js.

## How to work with me
- Do not stop to quiz me. After each step or ticket, give a brief summary (what changed, what
  ran, the result) and up to five key learning points, one line each.
- Show real errors with your diagnosis before fixing. Stay in the step. Explain every diff.
- Ask before every git push, gh command, or anything on GitHub or Netlify. No secrets in chat.
- Never hand me a command block containing set -e. Write .md files directly to disk.
