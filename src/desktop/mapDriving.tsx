import styles from "./mapDriving.module.css";
import useMapDriving from "./mapHooks/useMapDriving";
import "@amap/amap-jsapi-types";

export default function MapContainer({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const container = "map-driving-container";
  const panel = "map-driving-panel";
  useMapDriving(from, to, container, panel);
  return (
    <div className={styles["container"]}>
      <div id={container} className={styles[container]}></div>
      <div id={panel} className={styles[panel]}></div>
    </div>
  );
}
