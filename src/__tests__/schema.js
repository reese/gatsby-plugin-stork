const { testPluginOptionsSchema } = require("gatsby-plugin-utils");
const { pluginOptionsSchema } = require("../gatsby-node");

const assertIsValidSchema = async options => {
  const foo = await testPluginOptionsSchema(pluginOptionsSchema, options);

  const { isValid, errors } = foo;

  expect(errors).toEqual([]);
  expect(isValid).toBe(true);
};

describe("Schema validation", () => {
  it("handles arbitrary index fields", () => {
    const options = {
      indexes: [
        {
          MarkdownRemark: {
            resolvers: {
              title: _node => "foo",
              url: _node => "bar",
              contents: _node => "baz",
            },
          },
          filename: "foo.st",
        },
      ],
    };

    return assertIsValidSchema(options);
  });
});
