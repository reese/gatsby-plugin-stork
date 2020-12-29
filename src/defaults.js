const DEFAULT_QUERY = `
{
  site {
    siteMetadata {
      siteUrl
    }
  }
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          title
        }
        internal {
          content
        }
        fields {
          slug
        }
      }
    }
  }
}

`;

const DEFAULT_PUBLIC_PATH = "./public";
const DEFAULT_OUTPUT_FILE_NAME = "stork.st";

const DEFAULT_SERIALIZER = ({ site, allMarkdownRemark }) => {
  const {
    siteMetadata: { siteUrl: url },
  } = site;
  return allMarkdownRemark.edges.map(
    ({
      node: {
        fileAbsolutePath,
        fields: { slug },
        frontmatter: { title },
      },
    }) => ({
      url: url + slug,
      path: fileAbsolutePath,
      title,
    })
  );
};

const DEFAULTS = {
  query: DEFAULT_QUERY,
  serialize: DEFAULT_SERIALIZER,
  filename: DEFAULT_OUTPUT_FILE_NAME,
  outputDir: DEFAULT_PUBLIC_PATH,
};

module.exports = { DEFAULTS };
