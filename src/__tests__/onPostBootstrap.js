const { onPostBootstrap } = require("../gatsby-node.js");
const path = require("path");
const childProcess = require("child_process");

jest.mock("child_process");

const getNodes = () => [
  {
    internal: {
      type: "MarkdownRemark",
    },
    frontmatter: {
      title: "Incredible Article",
    },
    fields: {
      slug: "/foo",
    },
    fileAbsolutePath: path.resolve("src/__tests__/test.md"),
  },
  {
    internal: {
      type: "MarkdownRemark",
    },
    fields: {
      slug: "/bar/baz",
    },
    fileAbsolutePath: path.resolve("src/__tests__/test.md"),
    frontmatter: {
      title: "Not as Good but still Good Article",
    },
  },
];

describe("onPostBootstrap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("correctly builds with default inputs", async () => {
    await onPostBootstrap({ getNodes }, {});
  });

  describe("Stork executable location", () => {
    const TEST_ENV_LOCATION = "../my_test_location/stork";
    const oldEnv = process.env;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeAll(() => {
      jest.resetModules(); // clears cache
      process.env = {
        ...oldEnv,
      };
    });

    afterAll(() => {
      process.env = oldEnv;
    });

    it("uses executable env variable when present", async () => {
      process.env.GATSBY_STORK_EXECUTABLE_PATH = TEST_ENV_LOCATION;
      childProcess.execSync.mockImplementation(() => {});

      await onPostBootstrap({ getNodes }, {});

      expect("stork --build asdjkf;sadjfd").toEqual(
        expect.stringContaining("stork --build")
      );
      expect(childProcess.execSync).toHaveBeenCalledTimes(1);
      expect(childProcess.execSync).toHaveBeenCalledWith(
        expect.stringContaining(`${TEST_ENV_LOCATION} --build`)
      );
    });

    it("uses default `stork` command when no env variable is set", async () => {
      delete process.env.GATSBY_STORK_EXECUTABLE_PATH;
      childProcess.execSync.mockImplementation(() => {});

      await onPostBootstrap({ getNodes }, {});

      expect(childProcess.execSync).toHaveBeenCalledTimes(2);
      expect(childProcess.execSync).toHaveBeenNthCalledWith(
        1,
        "which -s stork"
      );
      expect(childProcess.execSync).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining("stork --build")
      );
    });
  });
});
