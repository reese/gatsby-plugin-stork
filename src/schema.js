import { DEFAULT_OUTPUT_FILE_NAME } from "./defaults";

export const createSchema = Joi =>
  Joi.object({
    // TODO: Remove this in next version
    query: Joi.string().forbidden().messages({
      "any.unknown":
        "The query field is deprecated, use `indexes#resolvers` instead.",
    }),
    // TODO: Remove this in next version
    serialize: Joi.function().arity(1).forbidden().messages({
      "any.unknown":
        "The serialize field is deprecated, use `indexes#resolvers` instead.",
    }),
    // TODO: Remove this in next version
    filename: Joi.string()
      .forbidden()
      .messages({
        "any.unknown":
          "The filename root option is deprecated, use `indexes#filename` instead.",
      })
      .description("The name of your index file."),
    // TODO: Remove this in next version
    outputDir: Joi.string().forbidden().messages({
      "any.unknown": "Overwriting the output directory is no longer supported.",
    }),
    indexes: Joi.array().items(
      Joi.object({
        filename: Joi.string()
          .default(DEFAULT_OUTPUT_FILE_NAME)
          .description("The file name of the generated index."),
        resolvers: Joi.object().pattern(
          /^/,
          Joi.object({
            title: Joi.function().arity(1).required(),
            url: Joi.function().arity(1).required(),
            path: Joi.function().arity(1),
            contents: Joi.function().arity(1),
          })
            .or("path", "contents")
            .required()
        ),
      })
    ),
    theme: Joi.string()
      .valid("basic", "dark", null)
      .default("basic")
      .description(
        "The name of the Stork theme to install. Can be `null` to skip installing a theme."
      ),
  });
