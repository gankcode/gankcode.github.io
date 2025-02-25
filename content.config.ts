import path from "path";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: "page",
      source: {
        cwd: path.resolve("src/public/static/articles"),
        include: "**.md",
      },
      schema: z.object({
        title: z.string(),
        author: z.array(z.string()),
        category: z.array(z.string()),
        tags: z.array(z.string()),
        cover: z.string(),
        locale: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }),
    projects: defineCollection({
      type: "page",
      source: {
        cwd: path.resolve("src/public/static/projects"),
        include: "**.md",
      },
      schema: z.object({
        title: z.string(),
        author: z.array(z.string()),
        category: z.array(z.string()),
        tags: z.array(z.string()),
        cover: z.string(),
        locale: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }),
    about: defineCollection({
      type: "page",
      source: {
        cwd: path.resolve("src/public/static/about"),
        include: "**.md",
      },
      schema: z.object({
        title: z.string(),
        author: z.array(z.string()),
        category: z.array(z.string()),
        tags: z.array(z.string()),
        cover: z.string(),
        locale: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }),
  },
});
