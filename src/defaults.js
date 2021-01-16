export const DEFAULT_OUTPUT_FILE_NAME = "stork.st";

export const DEFAULTS = {
  indexes: [
    {
      filename: DEFAULT_OUTPUT_FILE_NAME,
      resolvers: {
        MarkdownRemark: {
          url: ({ fields: { slug } }) => slug,
          path: ({ fileAbsolutePath }) => fileAbsolutePath,
          title: ({ frontmatter: { title } }) => title,
        },
      },
    },
  ],
  theme: "basic",
};
