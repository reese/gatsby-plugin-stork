const runQuery = (handler, query) =>
  handler(query).then(r => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }

    return r.data;
  });

module.exports = { runQuery };
