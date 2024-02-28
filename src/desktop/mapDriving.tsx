import React from 'react'
import styles from './mapDriving.module.css'
import useMapDriving from './mapHooks/useMapDriving'
import '@amap/amap-jsapi-types'

interface MapDrivingProps {
  from: string
  to: string
}

export const MapDriving: React.FC<MapDrivingProps> = ({ from, to }) => {
  const container = 'map-driving-container'
  const panel = 'map-driving-panel'
  useMapDriving(from, to, container, panel)
  return (
    <div className={styles['container']}>
      <div id={container} className={styles[container]}></div>
      <div id={panel} className={styles[panel]}></div>
    </div>
  )
}
