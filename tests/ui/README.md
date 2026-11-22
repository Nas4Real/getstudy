# UI regression checks

Install dependencies with `npm install` and the test browser with `npx playwright install chromium`.

With the frontend running at `http://localhost:5174`, run `npm run test:ui`. The suite exercises modal focus and dismissal, navigation/history, accessible Settings controls, status feedback, responsive actions, and axe checks across the main surfaces.

For the production-loading check:

1. Run `npm run build`.
2. In another terminal, run `npm run preview -- --port 4173 --host localhost`.
3. Run `npm run test:ui:production`.

The production check confirms that the dashboard does not request KaTeX and that a study-session answer still renders styled math after loading it.

Optional environment variables:

- `UI_BASE_URL`: development UI target; defaults to `http://localhost:5174`.
- `UI_PRODUCTION_BASE_URL`: built UI target; defaults to `http://localhost:4173/`.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`: use an existing Chromium executable instead of Playwright's installed browser.

Tests run against real frontend state. They do not require or exercise Python scripts or backend services. Physical-device and screen-reader verification remain separate checks.
