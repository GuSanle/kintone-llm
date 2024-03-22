import React, { useState } from 'react'
import { fetchWenXin } from './service/llm'
import { PostRecords } from './service/kintoneApi'

interface ChatCompletion {
  finish_reason: 'function_call' | 'normal' | 'stop' | 'length' | 'content_filter' | 'function_call'
  result?: string
}

const AddDemoData: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const system = `You are a useful assistant. Only use the provided functionality.
  ## Response Format
- Return data in JSON format.
- The records property in the returned data should be an array representing multiple records.
- attend can only be "Yes" or "No".
- phone should be an 11-digit Chinese mobile phone number, starting with 15, 13, 14, 18, or 19.
- time should use the UTC format, with a fixed "T" between [YYYY-MM-DD] and [HH:MM:SS]. The fixed "Z" after [HH:MM:SS] represents UTC.
- Strictly ensure that the value of each property is a string format.

## The following properties must be included
- name
- phone
- time
- attend

## The following are two sample mock data formats expected to be returned.
{
  "records": [
      {
          "name": {
              "value": "张小云"
          },
          "phone": {
              "value": "13888888834"
          },
          "time": {
            value: "2024-03-11T07:01:00Z"
          },
          "attend": {
            value: "Yes"
          }
      },
      {
        "name": {
            "value": "王小五"
        },
        "phone": {
            "value": "15888888834"
        },
        "time": {
          value: "2024-03-11T08:01:00Z"
        },
        "attend": {
          value: "No"
        }
    },
  ]
}`

  const addDemoData = async () => {
    setLoading(true)
    const app = kintone.app.getId()!
    const startTime = new Date().getTime()
    console.log('开始:', new Date().toLocaleString())
    try {
      const chatCompletion: ChatCompletion = await fetchWenXin({
        system,
        messages: [{ role: 'user', content: '添加3条模拟数据' }],
        response_format: 'json_object',
      })

      const { finish_reason, result } = chatCompletion
      console.log(result, 'result')
      const { records } = JSON.parse(result!)
      if (finish_reason !== 'length') {
        console.log('添加开始')
        await PostRecords(app, records)
        console.log('添加成功')
        location.reload()
      } else {
        console.log('添加失败')
      }
    } catch (e) {
      console.log(e)
      console.log('llm调用失败，添加失败')
    }
    setLoading(false)
    const endTime = new Date().getTime()
    console.log('结束:', new Date().toLocaleString())
    // 计算时间差
    const timeDiff = endTime - startTime
    console.log(`总共耗时: ${timeDiff} 毫秒`)
  }

  return (
    <div>
      <button onClick={addDemoData} disabled={loading}>
        添加模拟数据
      </button>
    </div>
  )
}

export default AddDemoData
