import React, { useState } from 'react'
import { fetchWenXin } from './service/llm'
import { PostRecords } from './service/kintoneApi'

interface ChatCompletion {
  finish_reason: 'function_call' | 'normal' | 'stop' | 'length' | 'content_filter' | 'function_call'
  result?: string
}

const AddDemoData: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const system = `你是一个有用的助手。仅使用为您提供的功能。
  ## 响应格式
- 以JSON形式返回数据。
- 返回的数据中records属性为数组格式，用来表示多条记录。
- attend只能为"Yes"或者"No"。
- phone为11位中国手机号码,必须以15/13/14/18/19这几个其中之一开头。
- time使用utc格式,【YYYY-MM-DD】和【HH:MM:SS】之间的【T】为固定值。【HH:MM:SS】之后的【Z】为固定值,表示UTC。
- 请严格满足属性的value值为字符串格式。

## 必须包含以下属性
- name
- phone
- time
- attend

## 以下为期待返回的两条模拟数据格式范例，
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
        messages: [{ role: 'user', content: '添加100条模拟数据' }],
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
