const DEFAULT_OUTPUT_FILE_NAME = "stork.st";

const DEFAULTS = {
  indexes: [
    {
      MarkdownRemark: {
        url: ({ fields: { slug } }) => slug,
        path: ({ fileAbsolutePath }) => fileAbsolutePath,
        title: ({ frontmatter: { title } }) => title,
      },
      filename: DEFAULT_OUTPUT_FILE_NAME,
    },
  ],
  theme: "basic",
};

module.exports = { DEFAULTS };
