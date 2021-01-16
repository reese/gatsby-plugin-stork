const { DEFAULTS } = require(`../gatsby-node`);
import { testPluginOptionsSchema } from "gatsby-plugin-utils";
import { pluginOptionsSchema } from "../gatsby-node";

describe("Defaults", () => {
  it("is a valid schema", async () => {
    const { isValid, errors } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      DEFAULTS
    );

    expect(errors).toEqual([]);
    expect(isValid).toBe(true);
  });
});
