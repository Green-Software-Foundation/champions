import { defineCollection, z } from "astro:content";

const champions = defineCollection({
    type: "data",
    schema: z.object({
        firstName: z.string(),
        lastName: z.string(),
        role: z.string(),
        organization: z.string(),
        languages: z.array(z.string()),
        pronoun: z.string().optional(),
        country: z.string(),
        city: z.string().optional(),
        bio: z.string(),
        type: z.enum(["normal", "expert", "inactive"]),
        social: z.object({
            github: z.string().optional(),
            linkedin: z.string().optional(),
            twitter: z.string().optional(),
            website: z.string().url().optional(),
        }),
        activities: z.array(z.object({
            contributionType: z.string(),
            linkedGSFProject: z.string(),
            subtype: z.string().optional(),
            dateFrom: z.date(),
            dateTo: z.date().optional(),
            title: z.string(),
            subtitle: z.string().optional(),
            description: z.string().optional(),
            url: z.string().url().optional(),
            relatedEvent: z.string().optional(),
        })).optional(),
        notes: z.string().optional(),
    }),
});

export const collections = { champions };
