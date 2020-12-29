const { execSync } = require("child_process");
const fs = require("fs").promises;
const tmp = require("tmp");
const pathUtil = require("path");
const TOML = require("@iarna/toml");

const { DEFAULTS } = require("./src/defaults");
const { runQuery } = require("./src/runQuery");

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object({
    query: Joi.string()
      .default(DEFAULTS.query)
      .description("The GraphQL query for all nodes in your index."),
    serialize: Joi.function()
      .arity(1)
      .default(DEFAULTS.serialize)
      .description(
        "This function serializes your query result into a list of files with the appropriate properties."
      ),
    filename: Joi.string()
      .default(DEFAULTS.filename)
      .description("The name of your index file."),
    outputDir: Joi.string()
      .default(DEFAULTS.outputDir)
      .description("The directory where the index file will be stored."),
  });

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const { query, serialize, filename, outputDir } = {
    ...DEFAULTS,
    ...pluginOptions,
  };
  const baseQuery = await runQuery(graphql, query);

  // Serialize and write to TOML
  tmp.file({ postfix: ".toml" }, async (err, path, _fd) => {
    if (err) throw err;

    console.log(`Writing temporary TOML to ${path}`);
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
    await fs.writeFile(path, tomlString);

    // call `stork` on TOML file
    try {
      execSync(`stork --build ${path}`);
    } catch (e) {
      console.error("Could not generate index for generated TOML file:");
      console.error(tomlString);
      throw e;
    }
  });
};
