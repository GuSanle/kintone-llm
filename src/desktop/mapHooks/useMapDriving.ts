import { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";

export default function useMapDriving(
  from: string,
  to: string,
  containerId: string,
  panelId: string
) {
  window._AMapSecurityConfig = {
    securityJsCode: process.env.GAODESECURITYCODE!,
  };
  let map: AMap.Map;

  useEffect(() => {
    const centerPositon = [121.3179, 31.3156];
    const points = [{ keyword: from }, { keyword: to }];
    AMapLoader.load({
      key: process.env.GAODEKEY!,
      version: "2.0",
      plugins: ["AMap.Driving", "AMap.Geocoder"],
    })
      .then((AMap) => {
        map = new AMap.Map(containerId, {
          viewMode: "2D", // 默认使用 2D 模式
          zoom: 11, //初始化地图层级
          center: centerPositon, //初始化地图中心点
        });

        const driving = new AMap.Driving({
          map: map,
          panel: panelId,
        });

        driving.search(points);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);
}
