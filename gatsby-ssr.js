"use strict";

const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="https://files.stork-search.net/stork.js" />,
  ]);
};
