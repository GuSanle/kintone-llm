import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const client = new KintoneRestAPIClient()

export const GetRecord = async (app: number, id: string | number) => {
  try {
    const params = {
      app,
      id,
    }
    const resp = await client.record.getRecord(params)
    if (resp.record) {
      return resp.record
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const GetRecords = async (app: number, query: string) => {
  try {
    const params = {
      app,
      query,
    }
    const resp = await client.record.getRecords(params)
    if (resp.records.length > 0) {
      return resp.records
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const GetRecordsByApp = async (app: number) => {
  try {
    const params = {
      app,
    }
    const resp = await client.record.getRecords(params)
    if (resp.records.length > 0) {
      // return { name: "jack", age: 18 };
      return resp.records
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const GetFile = async (app: number, id: number, fieldCode: string) => {
  try {
    const { record } = await client.record.getRecord({
      app,
      id,
    })
    const fileKey = record[fieldCode]?.value?.[0]?.fileKey
    if (fileKey) {
      const arrayBuffer = await client.file.downloadFile({
        fileKey,
      })
      const file = new Blob([arrayBuffer])
      // const fileUrl = URL.createObjectURL(file);
      return file
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const PostRecords = async (app: number, records) => {
  try {
    const params = {
      app,
      records,
    }
    const resp = await client.record.addRecords(params)
    if (resp.ids.length > 0) {
      return resp.ids
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
