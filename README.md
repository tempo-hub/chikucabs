# Chiku Cabs Next.js Refactor

This project migrates Chiku Cabs static HTML files to a single, robust Next.js App Router Catch-All setup.  
**Goal**: Convert static pages to dynamic without breaking URLs.

## Implementation Details
1. **Routing (`next.config.mjs`)**: Rewrites intercept `.php` traffic natively inside configuration to hide it from structural React routing logic, mapping perfectly to dynamic Catch-All slugs.
2. **Page Layer (`src/app/[...slug]/page.tsx`)**: The entire website handles incoming traffic via parameterized Catch-All routing. It intercepts the nested slugs (e.g., `["varanasi", "varanasi-to-lucknow-cab"]`).
3. **SEO Parsing (`src/lib/urlParser.ts`)**: It deeply parses the structure of legacy and consistent URLs extracting the raw origin, destination, vehicle, and route type purely by regex and keyword pattern matching. This eliminates manual metadata assignments for future routes.
4. **Data Pre-Rendering (`src/data/routeData.json`)**: Emulates a remote database supplying the URL seeds for Next.js explicit `generateStaticParams` static pre-rendering (SSG), making pages load instantly upon cache build.

## Commands
```bash
npm install
npm run dev
npm run build
```
