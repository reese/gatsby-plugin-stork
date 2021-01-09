const { DEFAULTS } = require(`../gatsby-node`);
const Joi = require("joi");
const { createSchema } = require("../schema");

describe("Defaults", () => {
  it("is a valid schema", () => {
    expect(() => Joi.attempt(DEFAULTS, createSchema(Joi))).not.toThrow();
  });
});
