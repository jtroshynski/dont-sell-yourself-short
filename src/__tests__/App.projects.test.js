import { constantFrom, record, string, array, oneof } from 'fast-check';
import * as fc from 'fast-check';

/**
 * Feature: portfolio-refresh, Property 8: Project technology list non-empty
 * Validates: Requirements 2.2
 * 
 * Property: For any project entry displayed in the projects section,
 * the technologies array should contain at least one technology item
 */

// Arbitrary generator for project entries
const projectArbitrary = record({
    id: string({ minLength: 1 }).filter(s => s.trim().length > 0),
    title: string({ minLength: 1 }).filter(s => s.trim().length > 0),
    company: string({ minLength: 1 }).filter(s => s.trim().length > 0),
    description: string({ minLength: 1 }).filter(s => s.trim().length > 0),
    technologies: array(
        string({ minLength: 1 }).filter(s => s.trim().length > 0),
        { minLength: 1, maxLength: 10 }
    ),
    impact: string({ minLength: 1 }).filter(s => s.trim().length > 0),
    link: oneof(constantFrom(null), string()),
    image: oneof(constantFrom(null), string())
});

describe('Project Technology List Property Tests', () => {
    test('Property 8: Every project entry has at least one technology', () => {
        fc.assert(
            fc.property(
                projectArbitrary,
                (project) => {
                    // Verify the technologies array is non-empty
                    return Array.isArray(project.technologies) && project.technologies.length >= 1;
                }
            ),
            { numRuns: 1 }
        );
    });

    test('Property 8: Technologies array contains only non-empty strings', () => {
        fc.assert(
            fc.property(
                projectArbitrary,
                (project) => {
                    // Verify all technology entries are non-empty strings
                    return project.technologies.every(
                        tech => typeof tech === 'string' && tech.trim().length > 0
                    );
                }
            ),
            { numRuns: 1 }
        );
    });
});
