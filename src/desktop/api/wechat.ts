import { WechatNotice } from '../service/wechatTuisong'
import { GetWechatId } from './sales'
interface UserData {
  wechatId: string
  [key: string]: object | string | undefined
}

export const SendMessageToWechatById = async (id: string, message: string) => {
  const [, status] = await WechatNotice([id], message)
  const resp = status === 200 ? true : false
  return {
    success: resp,
    data: '成功',
  }
}

export const PushToWechat = async (user: string, message: string) => {
  const result = await GetWechatId(user)!
  if (!result || !result.success) {
    return {
      success: false,
      data: '失败',
    }
  } else {
    const userData = result.data as UserData
    const [, status] = await WechatNotice([userData.wechatId], message)
    const resp = status === 200 ? true : false
    return {
      success: resp,
      data: '成功',
    }
  }
}
