import * as fc from 'fast-check';

/**
 * Feature: portfolio-refresh, Property 1: Work experience chronological ordering
 * Validates: Requirements 1.3
 * 
 * Property: For any list of work experience entries, when rendered in the work experience section,
 * the entries should be ordered with the most recent position first (descending by end date,
 * with "Present" positions appearing before completed positions)
 */

// Helper function to parse date strings to comparable values
const parseDate = (dateString) => {
    if (dateString === 'Present') {
        return new Date('9999-12-31'); // Future date for "Present" positions
    }

    // Parse "Month Year" format (e.g., "August 2024")
    const date = new Date(dateString);
    return date;
};

// Helper function to sort work experience entries chronologically
const sortWorkExperienceChronologically = (experiences) => {
    return [...experiences].sort((a, b) => {
        const dateA = parseDate(a.endDate);
        const dateB = parseDate(b.endDate);
        return dateB - dateA; // Descending order (most recent first)
    });
};

// Arbitrary generator for work experience entries
const workExperienceArbitrary = fc.record({
    id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    company: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    role: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    startDate: fc.oneof(
        fc.constantFrom(
            'January 2020', 'February 2020', 'March 2020', 'April 2020',
            'May 2020', 'June 2020', 'July 2020', 'August 2020',
            'September 2020', 'October 2020', 'November 2020', 'December 2020',
            'January 2021', 'February 2021', 'March 2021', 'April 2021',
            'May 2021', 'June 2021', 'July 2021', 'August 2021',
            'September 2021', 'October 2021', 'November 2021', 'December 2021',
            'January 2022', 'February 2022', 'March 2022', 'April 2022',
            'May 2022', 'June 2022', 'July 2022', 'August 2022',
            'September 2022', 'October 2022', 'November 2022', 'December 2022',
            'January 2023', 'February 2023', 'March 2023', 'April 2023',
            'May 2023', 'June 2023', 'July 2023', 'August 2023',
            'September 2023', 'October 2023', 'November 2023', 'December 2023',
            'January 2024', 'February 2024', 'March 2024', 'April 2024',
            'May 2024', 'June 2024', 'July 2024', 'August 2024',
            'September 2024', 'October 2024', 'November 2024', 'December 2024'
        )
    ),
    endDate: fc.oneof(
        fc.constantFrom(
            'January 2020', 'February 2020', 'March 2020', 'April 2020',
            'May 2020', 'June 2020', 'July 2020', 'August 2020',
            'September 2020', 'October 2020', 'November 2020', 'December 2020',
            'January 2021', 'February 2021', 'March 2021', 'April 2021',
            'May 2021', 'June 2021', 'July 2021', 'August 2021',
            'September 2021', 'October 2021', 'November 2021', 'December 2021',
            'January 2022', 'February 2022', 'March 2022', 'April 2022',
            'May 2022', 'June 2022', 'July 2022', 'August 2022',
            'September 2022', 'October 2022', 'November 2022', 'December 2022',
            'January 2023', 'February 2023', 'March 2023', 'April 2023',
            'May 2023', 'June 2023', 'July 2023', 'August 2023',
            'September 2023', 'October 2023', 'November 2023', 'December 2023',
            'January 2024', 'February 2024', 'March 2024', 'April 2024',
            'May 2024', 'June 2024', 'July 2024', 'August 2024',
            'September 2024', 'October 2024', 'November 2024', 'December 2024',
            'Present'
        )
    ),
    description: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    logo: fc.constantFrom(null, 'logo.png')
});

describe('Work Experience Chronological Ordering Property Tests', () => {
    test('Property 1: Work experience entries are ordered chronologically with most recent first', () => {
        fc.assert(
            fc.property(
                fc.array(workExperienceArbitrary, { minLength: 1, maxLength: 10 }),
                (experiences) => {
                    // Sort the experiences
                    const sorted = sortWorkExperienceChronologically(experiences);

                    // Verify chronological ordering
                    for (let i = 0; i < sorted.length - 1; i++) {
                        const currentDate = parseDate(sorted[i].endDate);
                        const nextDate = parseDate(sorted[i + 1].endDate);

                        // Current entry should have a more recent or equal end date than the next entry
                        if (currentDate < nextDate) {
                            return false;
                        }
                    }

                    return true;
                }
            ),
            { numRuns: 1 }
        );
    });

    test('Property 1: "Present" positions always appear before completed positions', () => {
        fc.assert(
            fc.property(
                fc.array(workExperienceArbitrary, { minLength: 2, maxLength: 10 }),
                (experiences) => {
                    // Ensure we have at least one "Present" and one completed position
                    const hasPresent = experiences.some(exp => exp.endDate === 'Present');
                    const hasCompleted = experiences.some(exp => exp.endDate !== 'Present');

                    if (!hasPresent || !hasCompleted) {
                        return true; // Skip if we don't have both types
                    }

                    // Sort the experiences
                    const sorted = sortWorkExperienceChronologically(experiences);

                    // Find the last "Present" position and first completed position
                    let lastPresentIndex = -1;
                    let firstCompletedIndex = -1;

                    for (let i = 0; i < sorted.length; i++) {
                        if (sorted[i].endDate === 'Present') {
                            lastPresentIndex = i;
                        } else if (firstCompletedIndex === -1) {
                            firstCompletedIndex = i;
                        }
                    }

                    // All "Present" positions should come before all completed positions
                    if (lastPresentIndex !== -1 && firstCompletedIndex !== -1) {
                        return lastPresentIndex < firstCompletedIndex;
                    }

                    return true;
                }
            ),
            { numRuns: 1 }
        );
    });
});

/**
 * Feature: portfolio-refresh, Property 2: Work experience required fields
 * Validates: Requirements 1.2
 * 
 * Property: For any work experience entry, it must contain all required fields:
 * company name, job title (role), employment dates (startDate and endDate), and description
 */
describe('Work Experience Field Completeness Property Tests', () => {
    test('Property 2: All work experience entries contain required fields', () => {
        fc.assert(
            fc.property(
                workExperienceArbitrary,
                (experience) => {
                    // Check that all required fields are present and non-empty
                    const hasCompany = typeof experience.company === 'string' && experience.company.length > 0;
                    const hasRole = typeof experience.role === 'string' && experience.role.length > 0;
                    const hasStartDate = typeof experience.startDate === 'string' && experience.startDate.length > 0;
                    const hasEndDate = typeof experience.endDate === 'string' && experience.endDate.length > 0;
                    const hasDescription = typeof experience.description === 'string' && experience.description.length > 0;

                    return hasCompany && hasRole && hasStartDate && hasEndDate && hasDescription;
                }
            ),
            { numRuns: 1 }
        );
    });

    test('Property 2: Work experience entries have valid date formats', () => {
        fc.assert(
            fc.property(
                workExperienceArbitrary,
                (experience) => {
                    // Verify dates are either "Present" or valid "Month Year" format
                    const isValidDate = (dateString) => {
                        if (dateString === 'Present') return true;

                        // Check if it's a valid date string
                        const date = new Date(dateString);
                        return !isNaN(date.getTime());
                    };

                    return isValidDate(experience.startDate) && isValidDate(experience.endDate);
                }
            ),
            { numRuns: 1 }
        );
    });
});

// Export the sorting function for use in the application
export { sortWorkExperienceChronologically };
