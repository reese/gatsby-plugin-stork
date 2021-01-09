"use strict";

const React = require("react");

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { theme }
) => {
  setHeadComponents([
    theme === null ? null : (
      <link
        key="1"
        rel="stylesheet"
        href={`https://files.stork-search.net/${theme}.css`}
      />
    ),
  ]);
  setPostBodyComponents([
    <script key="1" src="https://files.stork-search.net/stork.js" />,
  ]);
};
