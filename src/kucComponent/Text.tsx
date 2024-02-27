import React from "react";
import { createComponent } from "@lit/react";
import { Text } from "kintone-ui-component";
import { kucVersion } from "./common";

export const TextReact = createComponent({
  tagName: `kuc-text-${kucVersion}`,
  elementClass: Text,
  react: React,
  events: {
    onChange: "change",
  },
});
