# Part 3 - Bug Reporting

## Sample Bug Report

### **Bug ID**: FP-001
### **Title**: Application crashes when saving farm plots over 1000 hectares

---

### **Steps to Reproduce**
1. Log into the farm plot management platform
2. Navigate to "Create New Farm Plot" page
3. Fill in the form with the following data:
   - **Farm Plot Name**: "Large Agricultural Plot"
   - **Crop Type**: Select "Wheat" from dropdown
   - **Hectares**: Enter "1500"
4. Click "Save Farm Plot" button
5. Observe the application behavior

### **Expected Result**
- The system should either:
  - Successfully save the farm plot and display confirmation message, OR
  - Display a validation error if 1000+ hectares exceeds business rules
- The application should remain stable and responsive

### **Actual Result**
- The application accepts the input (no validation error shown)
- Upon clicking "Save Farm Plot", the application becomes unresponsive
- Browser console shows JavaScript errors related to data processing
- The application crashes/freezes, requiring a page refresh
- No farm plot is saved to the database

### **Environment Details**
- **Browser**: Chrome 118.0.5993.88
- **Operating System**: macOS 14.1
- **Application Version**: v2.3.1


### **Severity & Priority Assessment**

**Severity**: **High** 
- Causes complete application failure
- Results in data loss (farm plot not saved)
- Poor user experience with no error feedback

**Priority**: **High** 
- Affects core functionality of the application
- Likely to impact users with large agricultural operations
- No workaround available for users needing to register large plots

### **Recommended Actions**
1. **Short-term**: Add client-side validation to prevent values > 1000 hectares
3. **Long-term**: Review business requirements for maximum hectare limits and update validation accordingly
