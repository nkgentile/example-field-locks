import {
  defineArrayMember,
  defineField,
  defineType,
  type SchemaPluginOptions,
} from "sanity";

export const schema: SchemaPluginOptions = {
  types: [
    defineType({
      title: "Post",
      name: "post",
      type: "document" as const,
      // locked: true,
      fields: [
        defineField({
          title: "Title",
          name: "title",
          type: "string",

          locked: true,

          validation: (rule) => rule.required(),
        }),

        defineField({
          title: "Slug",
          name: "slug",
          type: "slug",

          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [defineArrayMember({ type: "block" })],
        }),

        defineField({
          name: "something",
          type: "object",
          fields: [
            defineField({
              name: "somethingelse",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
};
