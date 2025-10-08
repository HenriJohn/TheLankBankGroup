import { test, expect } from '@playwright/test';

test.describe('Farm Plot Creation - Valid Inputs', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock authentication state (logged-in user)
    await page.addInitScript(() => {
      localStorage.setItem('authToken', 'fake-jwt-token-12345');
      localStorage.setItem('user', JSON.stringify({id: 1, name: 'Test Farmer', email: 'farmer@test.com'}));
    });
    
    // Navigate to the farm plot creation page before each test
    await page.goto('https://farm-management-app.com/plots/create');
  });
  
  test('should successfully create a farm plot with valid inputs', async ({ page }) => {
    // Mock successful API response
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          farmPlot: {
            id: 123,
            name: 'North Field',
            cropType: 'Wheat',
            hectares: 25.5,
            createdAt: '2024-01-15T10:30:00Z'
          }
        })
      });
    });

    // Test basic farm plot data validation
    const farmPlot = {
      name: 'North Field',
      cropType: 'Wheat',
      hectares: 25.5
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify success message appears
    await expect(page.locator('#success-message')).toBeVisible();
    await expect(page.locator('#success-message')).toContainText('Farm plot created successfully');
    
    // Verify form data was processed correctly
    await expect(page.locator('#plot-summary')).toContainText('North Field');
    await expect(page.locator('#plot-summary')).toContainText('Wheat');
    await expect(page.locator('#plot-summary')).toContainText('25.5');
  });

  test('should create farm plot with different crop types', async ({ page }) => {
    // Mock successful API responses for multiple plots
    await page.route('**/api/farm-plots', async (route) => {
      const requestData = await route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          farmPlot: {
            id: Math.floor(Math.random() * 1000),
            name: requestData.name,
            cropType: requestData.cropType,
            hectares: requestData.hectares,
            createdAt: new Date().toISOString()
          }
        })
      });
    });

    const farmPlots = [
      { name: 'South Field', cropType: 'Corn', hectares: 100 },
      { name: 'East Field', cropType: 'Soybeans', hectares: 50.5 },
      { name: 'West Field', cropType: 'Wheat', hectares: 75 }
    ];

    // --- UI INTERACTION ---
    for (const plot of farmPlots) {
      await page.fill('#plot-name', plot.name);
      await page.selectOption('#crop-type', plot.cropType);
      await page.fill('#hectares', plot.hectares.toString());
      await page.click('#create-btn');
      await expect(page.locator('#success-message')).toBeVisible();
    }

    // --- VALIDATION ---
    // Verify all plots were created successfully
    await expect(page.locator('#plots-list')).toContainText('3 farm plots created');
    
    // Verify each crop type appears in the plots list
    await expect(page.locator('#plots-list')).toContainText('Corn');
    await expect(page.locator('#plots-list')).toContainText('Soybeans');
    await expect(page.locator('#plots-list')).toContainText('Wheat');
    
    // Verify total hectares calculation
    await expect(page.locator('#total-hectares')).toContainText('225.5 hectares');
  });

  test('should handle decimal hectares correctly', async ({ page }) => {
    // Mock API response for decimal hectares
    await page.route('**/api/farm-plots', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          farmPlot: {
            id: 456,
            name: 'Decimal Field',
            cropType: 'Wheat',
            hectares: 12.75,
            createdAt: '2024-01-15T11:00:00Z'
          }
        })
      });
    });

    const farmPlot = {
      name: 'Decimal Field',
      cropType: 'Wheat',
      hectares: 12.75
    };

    // --- UI INTERACTION ---
    await page.fill('#plot-name', farmPlot.name);
    await page.selectOption('#crop-type', farmPlot.cropType);
    await page.fill('#hectares', farmPlot.hectares.toString());
    await page.click('#create-btn');

    // --- VALIDATION ---
    // Verify decimal values are handled correctly
    await expect(page.locator('#success-message')).toBeVisible();
    await expect(page.locator('#plot-summary')).toContainText('12.75 hectares');
    
    // Verify precision is maintained (not rounded)
    await expect(page.locator('#plot-summary')).not.toContainText('13 hectares');
    await expect(page.locator('#plot-summary')).not.toContainText('12 hectares');
  });
});
