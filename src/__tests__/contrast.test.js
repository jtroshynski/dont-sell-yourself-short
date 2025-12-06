/**
 * Contrast Compliance Tests
 * Validates WCAG AA contrast ratios for dark mode
 */

// Helper function to calculate relative luminance
function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper function to parse hex color to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
}

describe('Dark Mode Contrast Compliance', () => {
    // Dark mode color palette from design
    const darkMode = {
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        textSecondary: '#cbd5e1',
        primary: '#60a5fa', // Text/heading color
        secondary: '#a78bfa', // Text/heading color
        buttonPrimary: '#1d4ed8', // Button background color
        buttonSecondary: '#6d28d9', // Button background color
        accent: '#22d3ee'
    };

    describe('WCAG AA Compliance (4.5:1 for normal text)', () => {
        test('text on background meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio(darkMode.text, darkMode.background);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        test('text on surface meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio(darkMode.text, darkMode.surface);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        test('secondary text on background meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio(darkMode.textSecondary, darkMode.background);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        test('secondary text on surface meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio(darkMode.textSecondary, darkMode.surface);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
    });

    describe('WCAG AA Compliance for Large Text (3:1 for headings)', () => {
        test('primary color on background meets 3:1 ratio for headings', () => {
            const ratio = getContrastRatio(darkMode.primary, darkMode.background);
            expect(ratio).toBeGreaterThanOrEqual(3.0);
        });

        test('accent color on background meets 3:1 ratio', () => {
            const ratio = getContrastRatio(darkMode.accent, darkMode.background);
            expect(ratio).toBeGreaterThanOrEqual(3.0);
        });
    });

    describe('Interactive Elements', () => {
        test('white text on primary button meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio('#ffffff', darkMode.buttonPrimary);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        test('white text on secondary button meets 4.5:1 ratio', () => {
            const ratio = getContrastRatio('#ffffff', darkMode.buttonSecondary);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
    });
});
