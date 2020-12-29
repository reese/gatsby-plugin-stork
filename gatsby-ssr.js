"use strict";

const React = require("react");

const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="https://files.stork-search.net/stork.js" />,
  ]);
};

module.exports = onRenderBody;
