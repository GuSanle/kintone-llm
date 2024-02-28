import { MapSearch } from '../mapSearch'
import { MapDriving } from '../mapDriving'

export const ShowMap = async (address: string) => {
  return {
    success: true,
    data: '成功',
    component: () => {
      return (
        <div style={{ width: '1200px' }}>
          <MapSearch address={address} />
        </div>
      )
    },
  }
}

export const DistanceMap = async (from: string, to: string) => {
  return {
    success: true,
    data: '成功',
    component: () => {
      return (
        <div style={{ width: '1200px' }}>
          <MapDriving from={from} to={to} />
        </div>
      )
    },
  }
}
