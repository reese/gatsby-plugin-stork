const { runQuery } = require("../runQuery");

describe(runQuery, () => {
  it("throws when errors are present", () => {
    const failurePromise = Promise.resolve({
      errors: ["This is one of the errors", "Here is another"],
      data: "Some juicy data",
    });
    const handler = _query => failurePromise;

    return runQuery(handler, "").catch(e =>
      expect(e).toEqual(Error("This is one of the errors, Here is another"))
    );
  });

  it("returns valid data", async () => {
    const handler = _query =>
      Promise.resolve({ data: "Really good mock data" });
    expect(await runQuery(handler, "")).toEqual("Really good mock data");
  });
});
