import { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";

export default function useMapSearch(
  address: string,
  containerId: string,
  panelId: string
) {
  window._AMapSecurityConfig = {
    securityJsCode: process.env.GAODESECURITYCODE!,
  };
  let map: AMap.Map;

  useEffect(() => {
    const centerPositon = [121.3179, 31.3156];
    AMapLoader.load({
      key: process.env.GAODEKEY!,
      version: "2.0",
      plugins: ["AMap.PlaceSearch", "AMap.Geocoder"],
    })
      .then((AMap) => {
        map = new AMap.Map(containerId, {
          viewMode: "2D", // 默认使用 2D 模式
          zoom: 11, //初始化地图层级
          center: centerPositon, //初始化地图中心点
        });

        const placeSearch = new AMap.PlaceSearch({
          pageSize: 5, //单页显示结果条数
          pageIndex: 1, //页码
          city: "021", //兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: map, //展现结果的地图实例
          panel: panelId, //结果列表将在此容器中进行展示。
          autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
        });

        placeSearch.search(address);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);
}
