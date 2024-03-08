import { GetRecord, GetRecords, GetRecordsByApp } from '../service/kintoneApi'
const salesApp = 70
const userApp = 71
interface UserData {
  wechatId: string
  email: string
  [key: string]: object | string | undefined
}

function convertToCommonData(kintoneDataObj) {
  const commonObj = {}
  Object.keys(kintoneDataObj).forEach((k) => {
    commonObj[k] = kintoneDataObj[k].value
  })
  return commonObj
}

export const GetSalesDataById = async (): Promise<ApiResponse<object>> => {
  const id = kintone.app.record.getId()
  if (id) {
    const record = await GetRecord(salesApp, id)
    if (record) {
      return {
        success: true,
        data: convertToCommonData(record),
      }
    }
  }
  return {
    success: false,
    data: '失败',
  }
}

export const GetAllSalesData = async () => {
  const records = await GetRecordsByApp(salesApp)
  if (records) {
    const result = records.map((r) => {
      return {
        success: true,
        data: convertToCommonData(r),
      }
    })
    console.log(result, 'result')
    return result
  } else {
    return {
      success: false,
      data: '失败',
    }
  }
}

export const GetWechatId = async (user: string): Promise<ApiResponse<object>> => {
  const query = `user = "${user}"`
  const records = await GetRecords(userApp, query)
  if (records) {
    const result = records.map((r) => {
      return convertToCommonData(r)
    })
    const userData = result[0] as UserData
    return {
      success: true,
      data: {
        wechatId: userData.wechatId,
        email: userData.email,
      },
    }
  } else {
    return {
      success: false,
      data: '失败',
    }
  }
}
