# Setup Instructions for Playwright Tests

## Prerequisites
- Node.js (v18 or higher)
- npm package manager

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

## Test Structure

```
tests/
├── farm-plot-creation.spec.ts     # Valid input tests
└── farm-plot-validation.spec.ts   # Input validation tests
```

## Test Coverage

### Test 1: Valid Farm Plot Creation
- ✅ Create farm plot with valid inputs
- ✅ Different crop types
- ✅ Success message verification

### Test 2: Input Validation
- ✅ Empty name validation
- ✅ Negative hectares validation
- ✅ Error message display

## Notes
- Tests create simple HTML forms using `page.setContent()`
- API responses are mocked with `page.route()`
- No external dependencies or servers required
- Focused on core QA automation skills
