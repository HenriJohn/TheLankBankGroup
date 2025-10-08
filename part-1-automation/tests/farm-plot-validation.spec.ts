import { test, expect } from '@playwright/test';

test.describe('Farm Plot Creation - Input Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock authentication state (logged-in user)
    await page.addInitScript(() => {
      localStorage.setItem('authToken', 'fake-jwt-token-12345');
      localStorage.setItem('user', JSON.stringify({id: 1, name: 'Test Farmer', email: 'farmer@test.com'}));
    });
    
    // Navigate to the farm plot creation page before each test
    await page.goto('https://farm-management-app.com/plots/create');
  });
  
  test('should reject empty farm plot name', async ({ page }) => {
    // Mock API error response for empty name
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errors: {
            name: 'Farm plot name is required'
          }
        })
      });
    });

    const farmPlot = {
      name: '',
      cropType: 'Wheat',
      hectares: 25
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify error message appears for empty name
    await expect(page.locator('#error-message')).toBeVisible();
    await expect(page.locator('#error-message')).toContainText('Farm plot name is required');
    
    // Verify form is not submitted
    await expect(page.locator('#success-message')).not.toBeVisible();
    await expect(page.locator('#plot-summary')).not.toBeVisible();
  });

  test('should reject negative hectares', async ({ page }) => {
    // Mock API error response for negative hectares
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errors: {
            hectares: 'Hectares must be greater than 0'
          }
        })
      });
    });

    const farmPlot = {
      name: 'Test Plot',
      cropType: 'Wheat',
      hectares: -10
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify error message appears for negative hectares
    await expect(page.locator('#error-message')).toBeVisible();
    await expect(page.locator('#error-message')).toContainText('Hectares must be greater than 0');
    
    // Verify input field shows validation styling
    await expect(page.locator('#hectares')).toHaveClass(/error|invalid/);
    await expect(page.locator('#success-message')).not.toBeVisible();
  });

  test('should reject zero hectares', async ({ page }) => {
    // Mock API error response for zero hectares
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errors: {
            hectares: 'Hectares must be greater than 0'
          }
        })
      });
    });

    const farmPlot = {
      name: 'Test Plot',
      cropType: 'Wheat',
      hectares: 0
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify error message appears for zero hectares
    await expect(page.locator('#error-message')).toBeVisible();
    await expect(page.locator('#error-message')).toContainText('Hectares must be greater than 0');
    
    // Verify zero is treated as invalid
    await expect(page.locator('#hectares')).toHaveClass(/error|invalid/);
    await expect(page.locator('#create-btn')).toBeDisabled();
  });

  test('should accept valid farm plot data', async ({ page }) => {
    // Mock successful API response for valid data
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          farmPlot: {
            id: 789,
            name: 'Valid Plot',
            cropType: 'Corn',
            hectares: 50.5,
            createdAt: '2024-01-15T12:00:00Z'
          }
        })
      });
    });

    const farmPlot = {
      name: 'Valid Plot',
      cropType: 'Corn',
      hectares: 50.5
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify successful creation with valid data
    await expect(page.locator('#success-message')).toBeVisible();
    await expect(page.locator('#success-message')).toContainText('Farm plot created successfully');
    
    // Verify no error messages are shown
    await expect(page.locator('#error-message')).not.toBeVisible();
    
    // Verify plot details are displayed correctly
    await expect(page.locator('#plot-summary')).toContainText('Valid Plot');
    await expect(page.locator('#plot-summary')).toContainText('Corn');
    await expect(page.locator('#plot-summary')).toContainText('50.5 hectares');
  });
});
