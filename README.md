# Playwright Automation Suite

This repository contains UI and API automation tests using Playwright.

## Prerequisites
- Node.js installed on your machine.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. If this is your first time using Playwright, run `npx playwright install --with-deps` to install the required browsers.
4. Ensure you have a `.env` file in the root of the project with the following credentials:
   ```env
   API_KEY=pro_27cc66a86e552953ea476bb238ac39dcae13fd5da63a900b
   DEMOQA_USERNAME=Johnhere0067
   DEMOQA_PASSWORD=John@Pulkz007
   ```

## Running the Tests
To run all tests (UI and API):
```bash
npx playwright test
```

To run only the API tests:
```bash
npx playwright test tests/api.spec.js
```

To run only the UI tests:
```bash
npx playwright test tests/assignment.spec.js
```

The UI tests will run in headed mode by default, meaning you will see the browser open and execute the steps. Tests are fully automated and results will be generated automatically.
