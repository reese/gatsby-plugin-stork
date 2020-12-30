const { DEFAULTS } = require("./defaults");

const createSchema = Joi =>
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

module.exports = { createSchema };
