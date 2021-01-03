import React, { useEffect } from "react";

/**
 * This component mounts the necessary input elements that Stork hooks into.
 * Based on the interface defined [here](https://stork-search.net/docs/interface) in the documentation.
 */
export const StorkInput = ({
  /** The name of your search's input. This is the first argument of `stork.register`. */
  indexName = "site",
  /** The name of your index file. This is assumed to be served at `https://your-site.com/${file} */
  file = "stork.st",
  /** The placeholder for your search input. Empty by default. */
  placeholder = "",
  className,
  ...props
}) => {
  useEffect(() => {
    window.stork.register(indexName, `${window.location.origin}/${file}`);
  }, []);

  return (
    <div className={`stork-wrapper ${className}`} {...props}>
      <input
        data-stork={indexName}
        className="stork-input"
        placeholder={placeholder}
      />
      <div data-stork={`${indexName}-output`} className="stork-output" />
    </div>
  );
};
