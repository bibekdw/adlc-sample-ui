# ADLC Sample UI

Next.js + React + TypeScript front end for the sample task tracker. The browser talks only to same-origin Next route handlers; the server proxies requests to the sample backend via `BACKEND_URL`.

```bash
npm install
npm run typecheck
npm run build
BACKEND_URL=http://localhost:8080 npm run dev
```

Open http://localhost:3000. The Java worker automatically completes pending tasks.

**Before relying on reproducible CI:** generate and commit `package-lock.json` using a networked `npm install`. This generated skeleton contains no lockfile because package installation was unavailable in the creation environment. The initial CI uses `npm install`; upgrade it to `npm ci` after committing the lockfile.
