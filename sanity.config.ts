import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { fieldLock } from "./plugins/field-lock";
import { schema } from "./schema";

export default defineConfig({
  name: "default",
  title: "Field Locks (Example)",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool(),
    visionTool(),
    fieldLock(),
  ],

  schema,
});
