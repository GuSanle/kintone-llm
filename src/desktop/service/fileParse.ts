// const PLUGIN_ID = kintone.$PLUGIN_ID;
// 暂时没用
const preUrl = 'http://localhost:3000'

export const FileParse = async (app: string | number, id: string | number, fieldCode: string) => {
  const url = `${preUrl}?app=${app}&id=${id}&fieldCode=${fieldCode}`

  try {
    return await fetch(url)
  } catch (error) {
    throw new Error('')
  }
}
