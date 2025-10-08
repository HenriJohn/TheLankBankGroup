# Part 1 - Automated Testing

Comprehensive Playwright tests for the farm plot feature with authentication and API mocking.

## Test Framework
- **Playwright** with **TypeScript**
- Authentication mocking (localStorage simulation)
- API response mocking (success & error scenarios)
- Realistic Browser navigation (click buttons, input text, etc.)

## Test Cases (7 Total)

### Test 1: Valid Farm Plot Creation (`farm-plot-creation.spec.ts`)
- Create farm plot with valid inputs (name, crop type, hectares)
- Test different crop types (Corn, Soybeans, Wheat)
- Handle decimal hectares correctly
- Verify success messages and data display

### Test 2: Input Validation (`farm-plot-validation.spec.ts`)
- Empty name validation with error messages
- Negative hectares validation
- Zero hectares validation
- Valid data acceptance test

## Setup & Run
```bash
npm install
npx playwright install
npm run test
npm run test:headed  # Run with browser visible
```

## Features
- **Authentication Mocking**: Simulates logged-in user state
- **API Mocking**: Mock farm plot creation API with realistic responses
- **Navigation**: Tests navigate to `https://farm-management-app.com/plots/create`
- **Comprehensive Coverage**: Both success and error scenarios
- **No Backend Required**: Completely self-contained test suite
