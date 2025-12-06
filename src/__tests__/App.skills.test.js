import * as fc from 'fast-check';
import skills from '../data/skills';

/**
 * Feature: portfolio-refresh, Property 7: Skills categorization completeness
 * Validates: Requirements 3.2
 * 
 * Property: For any skill added to the skills section, it should belong to
 * exactly one category (Languages, Frameworks, Tools, or Cloud)
 */

// Valid categories as defined in the requirements
const VALID_CATEGORIES = ['Languages', 'Frameworks', 'Tools', 'Cloud'];

// Arbitrary generator for skill entries
const skillArbitrary = fc.string({ minLength: 1 }).filter(s => s.trim().length > 0);

// Generator for valid skills data structure where each skill appears in exactly one category
const validSkillsDataArbitrary = fc.array(skillArbitrary, { minLength: 1, maxLength: 40 })
    .chain(allSkills => {
        // Shuffle and distribute skills across categories
        return fc.shuffledSubarray(VALID_CATEGORIES, { minLength: 1, maxLength: 4 })
            .map(selectedCategories => {
                const result = [];
                let skillIndex = 0;

                selectedCategories.forEach((category, catIndex) => {
                    const skillsPerCategory = Math.floor(allSkills.length / selectedCategories.length);
                    const extraSkills = catIndex < (allSkills.length % selectedCategories.length) ? 1 : 0;
                    const numSkills = skillsPerCategory + extraSkills;

                    const categorySkills = allSkills.slice(skillIndex, skillIndex + numSkills);
                    if (categorySkills.length > 0) {
                        result.push({
                            category,
                            skills: categorySkills
                        });
                    }
                    skillIndex += numSkills;
                });

                return result;
            });
    });

describe('Skills Categorization Property Tests', () => {
    test('Property 7: Each skill belongs to exactly one category', () => {
        fc.assert(
            fc.property(
                validSkillsDataArbitrary,
                (skillCategories) => {
                    // Build a map of skill -> unique categories it appears in
                    const skillToCategoriesMap = new Map();

                    skillCategories.forEach(categoryObj => {
                        categoryObj.skills.forEach(skill => {
                            if (!skillToCategoriesMap.has(skill)) {
                                skillToCategoriesMap.set(skill, new Set());
                            }
                            skillToCategoriesMap.get(skill).add(categoryObj.category);
                        });
                    });

                    // Verify each skill appears in exactly one unique category
                    for (const [skill, categories] of skillToCategoriesMap.entries()) {
                        if (categories.size !== 1) {
                            return false;
                        }
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property 7: All categories are valid', () => {
        fc.assert(
            fc.property(
                validSkillsDataArbitrary,
                (skillCategories) => {
                    // Verify all categories are from the valid set
                    return skillCategories.every(categoryObj =>
                        VALID_CATEGORIES.includes(categoryObj.category)
                    );
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property 7: Actual skills data follows categorization rules', () => {
        // Test the actual skills data from the application
        const skillToCategoriesMap = new Map();

        skills.forEach(categoryObj => {
            categoryObj.skills.forEach(skill => {
                if (!skillToCategoriesMap.has(skill)) {
                    skillToCategoriesMap.set(skill, []);
                }
                skillToCategoriesMap.get(skill).push(categoryObj.category);
            });
        });

        // Verify each skill appears in exactly one category
        for (const [skill, categories] of skillToCategoriesMap.entries()) {
            expect(categories).toHaveLength(1);
        }

        // Verify all categories are valid
        skills.forEach(categoryObj => {
            expect(VALID_CATEGORIES).toContain(categoryObj.category);
        });
    });
});
