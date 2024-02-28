import styles from './mapSearch.module.css'
import useMapSearch from './mapHooks/useMapSearch'
import '@amap/amap-jsapi-types'

interface MapSearchProps {
  address: string
}

export const MapSearch: React.FC<MapSearchProps> = ({ address }) => {
  //@ts-ignore
  const container = 'map-search-container'
  const panel = 'map-search-panel'
  useMapSearch(address, container, panel)
  return (
    <div className={styles['container']}>
      <div id={container} className={styles[container]}></div>
      <div id={panel} className={styles[panel]}></div>
    </div>
  )
}
