# gatsby-plugin-stork

This is a Gatsby plugin for generating a search engine using [Stork](https://github.com/jameslittle230/stork).
This plugin automatically generates a Stork search index from your site's content and includes it in your `public` directory.
This plugin also automatically mounts the Stork `script` tag to the end of your HTML files.

Note that this plugin runs after the _build_, not after the bootstrap, so the index won't be generated when running `gatsby develop`.
To test locally, use `gatsby build && gatsby serve`.

## Options

<!-- TODO: Add docs for `query` and `serialize`. -->
