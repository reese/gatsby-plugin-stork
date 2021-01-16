const { execSync } = require("child_process");
const fs = require("fs").promises;
const tmp = require("tmp");
const pathUtil = require("path");
const TOML = require("@iarna/toml");

const { DEFAULTS } = require("./defaults");
const { createSchema } = require("./schema");

exports.pluginOptionsSchema = ({ Joi }) => createSchema(Joi);

exports.onPostBootstrap = async ({ getNodes }, pluginOptions) => {
  assertStorkIsInstalled();

  const { indexes } = {
    ...DEFAULTS,
    ...pluginOptions,
  };

  const nodes = getNodes();

  await Promise.all(
    indexes.map(async ({ filename, resolvers }) => {
      const files = [];
      nodes.forEach(node => {
        const resolver = resolvers[node.internal.type];
        if (!resolver) return;

        const resolvedValues = Object.entries(resolver).reduce(
          (acc, [key, resolveFunc]) => {
            acc[key] = resolveFunc(node);
          },
          {}
        );

        files.push(resolvedValues);
      });

      // Serialize and write to TOML
      const { name: tempFileName, removeCallback } = tmp.fileSync({
        postfix: ".toml",
      });

      // Throw if any files are invalid
      // N.B. either path or contents is valid
      const testForInvalidFile = ({ path, contents, url, title }) =>
        !(path || contents) || !url || !title;

      if (files.some(testForInvalidFile)) {
        const invalidFiles = files.filter(testForInvalidFile);
        console.error(
          "The following node inputs were missing one or more of the required fields (path/contents, url, and title):"
        );
        invalidFiles.forEach(console.error);
        throw new Error("Could not generate index from invalid files");
      }

      console.log(`Writing temporary TOML to ${tempFileName}`);
      const outputObject = {
        input: {
          base_directory: __dirname,
          files,
        },
        output: {
          filename: pathUtil.join("public", filename),
        },
      };

      const tomlString = TOML.stringify(outputObject);
      await fs.writeFile(tempFileName, tomlString);

      buildStorkIndex(tempFileName, tomlString);

      // Clean up temp file
      removeCallback();
    })
  );
};

/**
 * Checks that stork is installed on the host machine.
 * @throws if Stork is not present.
 */
function assertStorkIsInstalled() {
  // Check if Stork is present
  try {
    execSync("which -s stork"); // `-s` omits output and just returns a 0 or 1 exit code
  } catch (e) {
    console.error(
      "It looks like the Stork executable is not installed. For some instructions on how to install Stork, see the documentation: https://stork-search.net/docs/install"
    );
    throw e;
  }
}

/**
 * Builds stork index.
 * @throws if Stork returns a non-zero exit code.
 */
function buildStorkIndex(tempFileName, tomlString) {
  try {
    execSync(`stork --build ${tempFileName}`);
  } catch (e) {
    console.error("Could not generate index for generated TOML file:");
    console.error(tomlString);
    throw e;
  }
}
