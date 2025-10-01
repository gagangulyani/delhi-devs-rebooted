import { z } from "zod";

export const profileSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
  github_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  linkedin_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  twitter_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  website_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.string(),
  github_url: z
    .string()
    .min(1, "GitHub URL is required")
    .url("Must be a valid GitHub URL")
    .refine((url) => url.includes('github.com'), "Must be a GitHub URL"),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  looking_for_collaborators: z.boolean(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
