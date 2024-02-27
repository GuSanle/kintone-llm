import React from "react";
import ReactDOM from "react-dom/client";
import Config from "./config";
import { PluginIdContext } from "./pluginIdContext";

const root = ReactDOM.createRoot(
  document.getElementById("plugin-config-root") as HTMLElement
);

const PLUGIN_ID = kintone.$PLUGIN_ID;

root.render(
  <React.StrictMode>
    <PluginIdContext.Provider value={PLUGIN_ID}>
      <Config />
    </PluginIdContext.Provider>
  </React.StrictMode>
);
