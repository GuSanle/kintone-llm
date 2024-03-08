import { GetWechatId } from './sales'
interface UserData {
  email: string
  [key: string]: object | string | undefined
}

export const MailTo = async (user: string): Promise<ApiResponse<string>> => {
  const result = await GetWechatId(user)!
  if (!result.success) {
    return { success: false, data: '失败' }
  } else {
    const mailData = result.data as UserData
    const mailToUrl = `mailto:${mailData.email}`
    window.open(mailToUrl, '_blank')
    return { success: true, data: '成功' }
  }
}
