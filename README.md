# gatsby-plugin-stork

This is a Gatsby plugin for generating a search engine using [Stork](https://github.com/jameslittle230/stork).
This plugin automatically generates a Stork search index from your site's content and includes it in your `public` directory.
This plugin also automatically mounts the Stork `script` tag to the end of your HTML files.

Note that this plugin runs after the _build_, not after the bootstrap, so the index won't be generated when running `gatsby develop`.
To test locally, use `gatsby build && gatsby serve`.

## Project Status

Note that this project is still pre-1.0, and until it has some users, minor version bumps may contain breaking changes. If you are still using this pre-1.0, I recommend [pinning to a minor version](https://docs.npmjs.com/cli/v6/using-npm/semver#tilde-ranges-123-12-1).

## Future Development

[ ] Support all of the [configuration options](https://stork-search.net/docs/config-ref) for generating indices.
[ ] Support generating multiple named indices.

## Running During Automated Builds

If you use an automated build system as part of your site's deploy system, you'll need to have Stork installed as part of the build process for this plugin to run successfully.
The docs have some instructions on [setting Stork up with Netlify](https://stork-search.net/docs/stork-and-netlify), but similar steps can be applied to any static site build runner.
