const { onPostBootstrap } = require("../gatsby-node.js");
const path = require("path");
const { DEFAULTS } = require("../defaults");

describe("onPostBootstrap", () => {
  it("correctly builds with default inputs", async () => {
    const getNodes = () => [
      {
        internal: {
          type: "MarkdownRemark",
        },
        frontmatter: {
          title: "Incredible Article",
        },
        fields: {
          slug: "/foo",
        },
        fileAbsolutePath: path.resolve("src/__tests__/test.md"),
      },
      {
        internal: {
          type: "MarkdownRemark",
        },
        fields: {
          slug: "/bar/baz",
        },
        fileAbsolutePath: path.resolve("src/__tests__/test.md"),
        frontmatter: {
          title: "Not as Good but still Good Article",
        },
      },
    ];

    await onPostBootstrap({ getNodes }, {});
  });
});
