# Part 2 - Manual Testing & Test Design

## Manual Test Plan for Farm Plot Feature

### Core Functionality Tests
• **User Registration & Authentication** - Verify users can register, login, and access farm plot features with proper session management
• **Farm Plot Creation Flow** - Test complete workflow from navigation to farm plot creation page through successful submission
• **Data Persistence** - Confirm created farm plots are saved correctly and appear in user's plot list after page refresh
• **Farm Plot Editing** - Verify users can modify existing plot details (name, crop type, hectares) and changes are saved properly
• **Farm Plot Deletion** - Test plot removal functionality with proper confirmation dialogs and data cleanup

### Input Validation & Edge Cases
• **Boundary Value Testing** - Test hectares field with values at boundaries (0, 0.1, 999.9, 1000, maximum system limits)
• **Special Characters in Names** - Verify farm plot names handle Unicode characters, emojis, and special symbols correctly
• **Crop Type Dropdown** - Test all available crop options, search functionality, and handling of custom/other crop types
• **Form State Management** - Verify form retains data during navigation, handles browser back/forward, and manages unsaved changes

### Cross-Platform & Performance
• **Mobile Responsiveness** - Test farm plot creation and viewing on various mobile devices and screen orientations

---

## Edge Cases & Risks Automated Tests Might Miss

### 1. **Extremely Large Numeric Values**
- **Risk**: Testing hectares with values near system limits (e.g., 999,999,999.99) may cause integer overflow, precision loss, or database storage issues
- **Impact**: Could lead to data corruption or application crashes in production
- **Manual Testing**: Input maximum possible values and verify proper handling/validation

### 2. **Special Characters & Internationalization**
- **Risk**: Farm plot names with Unicode characters, emojis, RTL text, or SQL injection attempts may break rendering or cause security vulnerabilities  
- **Impact**: Could affect users from different regions or create security exploits
- **Manual Testing**: Test with various international characters, symbols, and potentially malicious input strings

### 3. **Visual Layout & UI Consistency**
- **Risk**: Button colors, element positioning, font sizes, or spacing may change unexpectedly across different browsers, screen sizes, or after CSS updates
- **Impact**: Could lead to poor user experience, accessibility issues, or users unable to find/click important elements like submit buttons
- **Manual Testing**: Verify visual consistency across browsers, check button colors match design specs, ensure elements don't overlap, and validate responsive layout behavior
