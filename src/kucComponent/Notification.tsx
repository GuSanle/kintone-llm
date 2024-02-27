import React from "react";
import { createComponent } from "@lit/react";
import { Notification } from "kintone-ui-component";
import { kucVersion } from "./common";

export const NotificationReact = createComponent({
  tagName: `kuc-notification-${kucVersion}`,
  elementClass: Notification,
  react: React,
});
