const { DEFAULTS } = require("./src/defaults");
const { runQuery } = require("./src/runQuery");
const tmp = require("tmp");
const { execSync } = require("child_process");
const fs = require("fs").promises;
const TOML = require("@iarna/toml");

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const { query, serialize } = {
    ...DEFAULTS,
    ...pluginOptions,
  };

  const baseQuery = await runQuery(graphql, query);

  // Serialize and write to TOML
  tmp.file({ postfix: ".toml" }, async (err, path, _fd) => {
    if (err) throw err;

    console.log(`Writing temporary TOML to ${path}`);
    const outputObject = serialize(baseQuery);

    // Throw if any files are invalid
    const testForInvalidFile = ({ path, url, title }) =>
      !path || !url || !title;
    const isInvalid = outputObject.input.files.any(testForInvalidFile);
    if (isInvalid) {
      const invalidFiles = outputObject.input.files.filter(testForInvalidFile);
      console.error(
        "The following node inputs were missing one or more of the required fields (path, url, and title):"
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
