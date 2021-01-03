import * as React from "react";

interface StorkInputProps {
  indexName?: string;
  file?: string;
  placeholder?: string;
}

export class StorkInput extends React.Component<
  StorkInputProps & React.HTMLProps<HTMLInputElement>,
  any
> {}
