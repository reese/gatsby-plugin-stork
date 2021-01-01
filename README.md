# gatsby-plugin-stork

This is a Gatsby plugin for generating a search engine using [Stork](https://github.com/jameslittle230/stork).
This plugin automatically generates a Stork search index from your site's content and includes it in your `public` directory.
This plugin also automatically mounts the Stork `script` tag to the end of your HTML files.

Note that this plugin runs after the _build_, not after the bootstrap, so the index won't be generated when running `gatsby develop`.
To test locally, use `gatsby build && gatsby serve`.

## Installation

To install, run `npm i gatsby-plugin-stork`.
Once installed, add the plugin to your `gatsby-config.js`.

```js
module.exports = {
    plugins: [
        "gatsby-plugin-stork",
    ]
}
```

You can also pass in additional options:

```js
module.exports = {
    plugins: [
        {
          resolve: "gatsby-plugin-stork",
          query: `
              {
                site {
                  siteMetadata { siteUrl }
                }
                allMdx(
                  limit: 1000
                ) {
                  edges {
                    node {
                      rawBody
                      fields { slug }
                      frontmatter { title }
                    }
                  }
                }
              }
            `,
            serialize: ({ allMdx }) => yourSerializationFunction(allMdx),
            filename: "indexFile.st",
        }
        `gatsby-plugin-stork`,
    ]
}
```

Note that your project will still be responsible for mounting the appropriate input tags and calling `stork.register()` in your project, but `gatsby-plugin-stork` _does_ take care of loading `stork.js` from the CDN.

## Options

### `query`

This is the query that will be run to pull in any pages you want to be indexed.
The result of this query will be passsed to the `serialize` function.

### `serialize`

This function serializes your query into a proper list of files.
Note that this list of files will be used to create the `toml` config file that generates your Stork index, so the list of objects must conform to valid [file objects](https://stork-search.net/docs/config-ref).

### `filename`

The name of the resulting index file.
By default, it is called `stork.st`, but you may wish to call it something else.

### `outputDir`

The directory where the index will be stored.
By default, it is stored in the `public` directory of your project.
We do not recommend changing this unless you will be storing the index file somewhere else (such as your own external CDN).

## Project Status

Note that this project is still pre-1.0, and until it has some users, minor version bumps may contain breaking changes. If you are still using this pre-1.0, I recommend [pinning to a minor version](https://docs.npmjs.com/cli/v6/using-npm/semver#tilde-ranges-123-12-1).

## Future Development

- [ ] Support all of the [configuration options](https://stork-search.net/docs/config-ref) for generating indices.

- [ ] Support generating multiple named indices.

- [ ] Add option for installing Stork during CI builds

- [ ] Create a Gatsby starter using the plugin

## Running During Automated Builds

If you use an automated build system as part of your site's deploy system, you'll need to have Stork installed as part of the build process for this plugin to run successfully.
The docs have some instructions on [setting Stork up with Netlify](https://stork-search.net/docs/stork-and-netlify), but similar steps can be applied to any static site build runner.
