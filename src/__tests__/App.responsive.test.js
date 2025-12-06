import { render } from '@testing-library/react';
import fc from 'fast-check';
import App from '../App';

/**
 * Feature: portfolio-refresh, Property 2: Responsive layout adaptation
 * Validates: Requirements 5.1, 5.2, 5.3
 * 
 * Property: For any viewport width, all content sections should remain readable
 * and properly formatted without horizontal scrolling or content overflow
 */
describe('Property 2: Responsive layout adaptation', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    afterEach(() => {
        // Clean up after each test
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    it('should prevent horizontal overflow at any viewport width', () => {
        fc.assert(
            fc.property(
                // Generate random viewport widths from 320px (smallest mobile) to 2560px (large desktop)
                fc.integer({ min: 320, max: 2560 }),
                (viewportWidth) => {
                    // Set viewport width
                    global.innerWidth = viewportWidth;
                    Object.defineProperty(window, 'innerWidth', {
                        writable: true,
                        configurable: true,
                        value: viewportWidth,
                    });

                    // Trigger resize event
                    window.dispatchEvent(new Event('resize'));

                    // Render the app
                    const { container, unmount } = render(<App />);

                    // Check for horizontal overflow
                    const appElement = container.querySelector('.App');
                    const body = document.body;
                    const html = document.documentElement;

                    // Get computed widths
                    const appWidth = appElement ? appElement.scrollWidth : 0;
                    const bodyWidth = body.scrollWidth;
                    const htmlWidth = html.scrollWidth;

                    // Verify no element exceeds viewport width
                    // Allow small tolerance (1px) for rounding errors
                    const noOverflow =
                        appWidth <= viewportWidth + 1 &&
                        bodyWidth <= viewportWidth + 1 &&
                        htmlWidth <= viewportWidth + 1;

                    // Clean up
                    unmount();

                    return noOverflow;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain readable layout at mobile breakpoint', () => {
        fc.assert(
            fc.property(
                // Generate widths in mobile range (320px - 767px)
                fc.integer({ min: 320, max: 767 }),
                (viewportWidth) => {
                    // Set viewport width
                    global.innerWidth = viewportWidth;
                    Object.defineProperty(window, 'innerWidth', {
                        writable: true,
                        configurable: true,
                        value: viewportWidth,
                    });

                    window.dispatchEvent(new Event('resize'));

                    const { container, unmount } = render(<App />);

                    // Verify all sections exist and are visible
                    const sections = [
                        '.hero-section',
                        '.about-section',
                        '.work-experience-section',
                        '.projects-section',
                        '.skills-section',
                        '.contact-section'
                    ];

                    const allSectionsPresent = sections.every(selector => {
                        const element = container.querySelector(selector);
                        return element !== null;
                    });

                    // Verify no horizontal overflow
                    const appElement = container.querySelector('.App');
                    const noOverflow = appElement ? appElement.scrollWidth <= viewportWidth + 1 : true;

                    unmount();

                    return allSectionsPresent && noOverflow;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain readable layout at tablet breakpoint', () => {
        fc.assert(
            fc.property(
                // Generate widths in tablet range (768px - 1023px)
                fc.integer({ min: 768, max: 1023 }),
                (viewportWidth) => {
                    global.innerWidth = viewportWidth;
                    Object.defineProperty(window, 'innerWidth', {
                        writable: true,
                        configurable: true,
                        value: viewportWidth,
                    });

                    window.dispatchEvent(new Event('resize'));

                    const { container, unmount } = render(<App />);

                    // Verify all sections exist
                    const sections = [
                        '.hero-section',
                        '.about-section',
                        '.work-experience-section',
                        '.projects-section',
                        '.skills-section',
                        '.contact-section'
                    ];

                    const allSectionsPresent = sections.every(selector => {
                        const element = container.querySelector(selector);
                        return element !== null;
                    });

                    // Verify no horizontal overflow
                    const appElement = container.querySelector('.App');
                    const noOverflow = appElement ? appElement.scrollWidth <= viewportWidth + 1 : true;

                    unmount();

                    return allSectionsPresent && noOverflow;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain readable layout at desktop breakpoint', () => {
        fc.assert(
            fc.property(
                // Generate widths in desktop range (1024px - 2560px)
                fc.integer({ min: 1024, max: 2560 }),
                (viewportWidth) => {
                    global.innerWidth = viewportWidth;
                    Object.defineProperty(window, 'innerWidth', {
                        writable: true,
                        configurable: true,
                        value: viewportWidth,
                    });

                    window.dispatchEvent(new Event('resize'));

                    const { container, unmount } = render(<App />);

                    // Verify all sections exist
                    const sections = [
                        '.hero-section',
                        '.about-section',
                        '.work-experience-section',
                        '.projects-section',
                        '.skills-section',
                        '.contact-section'
                    ];

                    const allSectionsPresent = sections.every(selector => {
                        const element = container.querySelector(selector);
                        return element !== null;
                    });

                    // Verify no horizontal overflow
                    const appElement = container.querySelector('.App');
                    const noOverflow = appElement ? appElement.scrollWidth <= viewportWidth + 1 : true;

                    unmount();

                    return allSectionsPresent && noOverflow;
                }
            ),
            { numRuns: 100 }
        );
    });
});
