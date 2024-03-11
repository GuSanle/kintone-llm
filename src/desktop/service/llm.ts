const PLUGIN_ID = kintone.$PLUGIN_ID
export async function fetchWenXin(body) {
  const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${process.env.WENXIN_ACCESS_TOKEN}`

  const response = await kintone.plugin.app.proxy(
    PLUGIN_ID,
    url,
    'POST',
    { 'Content-Type': 'application/json' },
    JSON.stringify({
      ...body,
    }),
  )

  const data = JSON.parse(response[0])

  if (data.error_code) {
    throw new Error(data.error_msg)
  }

  return data
}
