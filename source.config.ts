import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

export default defineConfig({});

export const blog = defineCollections({
  type: "doc",
  dir: "blog",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    date: z.string(),
    author: z.string(),
    authorImage: z.string().optional(),
    titleImage: z.string().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});
