import { render } from '@testing-library/react';
import fc from 'fast-check';
import App from '../App';

/**
 * Feature: portfolio-refresh, Property 4: Theme persistence
 * Validates: Requirements 6.3
 * 
 * Property: For any theme selection (light or dark), when the page is reloaded,
 * the previously selected theme should be restored from localStorage
 */
describe('Property 4: Theme persistence', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        // Clear any theme attributes
        document.documentElement.removeAttribute('data-theme');
    });

    afterEach(() => {
        // Clean up after each test
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    it('should persist and restore theme across page reloads', () => {
        fc.assert(
            fc.property(
                fc.constantFrom('light', 'dark'),
                (theme) => {
                    // Simulate setting theme in localStorage (as if user selected it)
                    localStorage.setItem('theme', theme);

                    // Simulate page reload by creating a new App instance
                    const { unmount } = render(<App />);

                    // Verify the theme was restored from localStorage
                    const appliedTheme = document.documentElement.getAttribute('data-theme');
                    const storedTheme = localStorage.getItem('theme');

                    // Both should match the original theme
                    const themeRestored = appliedTheme === theme && storedTheme === theme;

                    // Clean up
                    unmount();
                    localStorage.clear();
                    document.documentElement.removeAttribute('data-theme');

                    return themeRestored;
                }
            ),
            { numRuns: 1 }
        );
    });
});
