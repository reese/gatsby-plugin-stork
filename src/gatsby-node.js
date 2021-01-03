const { execSync } = require("child_process");
const fs = require("fs").promises;
const tmp = require("tmp");
const pathUtil = require("path");
const TOML = require("@iarna/toml");

const { DEFAULTS } = require("./defaults");
const { runQuery } = require("./runQuery");
const { createSchema } = require("./schema");

exports.pluginOptionsSchema = ({ Joi }) => createSchema(Joi);

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const { query, serialize, filename, outputDir } = {
    ...DEFAULTS,
    ...pluginOptions,
  };
  const baseQuery = await runQuery(graphql, query);

  // Serialize and write to TOML
  const { name: tempFileName, removeCallback } = tmp.fileSync({
    postfix: ".toml",
  });

  console.log(`Writing temporary TOML to ${tempFileName}`);
  const files = serialize(baseQuery);
  const outputObject = {
    input: {
      base_directory: __dirname,
      files,
    },
    output: {
      filename: pathUtil.join(outputDir, filename),
    },
  };

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

  const tomlString = TOML.stringify(outputObject);
  await fs.writeFile(tempFileName, tomlString);

  // Check if Stork is present
  try {
    execSync("which -s stork"); // `-s` omits output and just returns a 0 or 1 exit code
  } catch (e) {
    console.error(
      "It looks like the Stork executable is not installed. For some instructions on how to install Stork, see the documentation: https://stork-search.net/docs/install"
    );
    throw e;
  }

  // call `stork` on TOML file
  try {
    execSync(`stork --build ${tempFileName}`);
  } catch (e) {
    console.error("Could not generate index for generated TOML file:");
    console.error(tomlString);
    throw e;
  }
  removeCallback();
};
