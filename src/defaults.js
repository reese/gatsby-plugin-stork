const path = require("path");

const DEFAULT_QUERY = `
{
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
    ) {
        edges {
            node {
                fileAbsolutePath
                internal { content }
                frontmatter { slug, title }
            }
        }
    }
}
`;

const DEFAULT_PUBLIC_PATH = "./public/";
const DEFAULT_OUTPUT_FILE_NAME = "stork.st";

const DEFAULT_SERIALIZER = ({ site, allMarkdownRemark }) => {
  const {
    siteMetadata: { siteUrl: url },
  } = site;
  const files = allMarkdownRemark.edges.map(
    ({
      node: {
        fileAbsolutePath,
        frontmatter: { slug, title },
      },
    }) => ({
      url: url + slug,
      path: fileAbsolutePath,
      title,
    })
  );
  return {
    input: {
      base_directory: "",
      files,
    },
    output: {
      filename: path.join(DEFAULT_PUBLIC_PATH, DEFAULT_OUTPUT_FILE_NAME),
    },
  };
};

const DEFAULTS = {
  query: DEFAULT_QUERY,
  serialize: DEFAULT_SERIALIZER,
  output: DEFAULT_OUTPUT_FILE_NAME,
};

module.exports = { DEFAULTS };
