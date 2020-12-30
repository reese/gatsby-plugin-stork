const { DEFAULTS } = require(`../../gatsby-node`);
const Joi = require("joi");
const { createSchema } = require("../schema");

describe(DEFAULTS, () => {
  it("is a valid schema", () => {
    createSchema(Joi).validate(DEFAULTS);
  });
});
