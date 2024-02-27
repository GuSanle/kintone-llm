import React from "react";
import { createComponent } from "@lit/react";
import { Button } from "kintone-ui-component";
import { kucVersion } from "./common";

export const ButtonReact = createComponent({
  tagName: `kuc-button-${kucVersion}`,
  elementClass: Button,
  react: React,
});
