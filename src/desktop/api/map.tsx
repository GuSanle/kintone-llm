import React from "react";
import ReactDOM from "react-dom/client";
import MapSearch from "../mapSearch";
import MapDriving from "../mapDriving";

export const ShowMap = async (address: string) => {
  ReactDOM.createRoot(document.getElementById("map")!).render(
    <React.StrictMode>
      <MapSearch address={address} />
    </React.StrictMode>
  );
  return { success: true, data: "成功" };
};

export const DistanceMap = async (from: string, to: string) => {
  ReactDOM.createRoot(document.getElementById("map")!).render(
    <React.StrictMode>
      <MapDriving from={from} to={to} />
    </React.StrictMode>
  );
  return { success: true, data: "成功" };
};
