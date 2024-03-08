import React, { useState, useCallback } from 'react'
import styles from './agent.module.css'
import { availableFunctions, functionDefinitions } from './api/index'
import { fetchWenXin } from './service/llm'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type FunctionAvailable = keyof typeof availableFunctions
type Message = {
  role: 'user' | 'assistant'
  content: string
  component?: React.ElementType
}
interface FunctionCall {
  name: string
  thoughts: string
  arguments: string
}
interface ChatCompletion {
  finish_reason: 'function_call' | 'normal' | 'stop' | 'length' | 'content_filter' | 'function_call'
  function_call?: FunctionCall // 可能是undefined，如果finish_reason不是'function_call'
  result?: string
}

interface FunctionResponse {
  success: boolean
  data: string
  component?: React.ElementType
}

const Agent: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  const system = '你是一个有用的助手。仅使用为您提供的功能'

  const sendMessage = useCallback(async () => {
    setLoading(true)
    const newMessage: Message = {
      role: 'user',
      content: input,
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput('')

    const chatCompletion: ChatCompletion = await fetchWenXin({
      system,
      messages: updatedMessages,
      functions: functionDefinitions,
    })

    const { finish_reason, function_call } = chatCompletion
    console.log(function_call, 'function_call')

    let responseMessage: Message
    if (finish_reason === 'function_call' && function_call) {
      const functionName = function_call.name as FunctionAvailable
      const functionToCall = availableFunctions[functionName]
      if (typeof functionToCall !== 'function') {
        console.error(`Function ${functionName} is not defined or not a function.`)
        return
      }
      const functionArgs = JSON.parse(function_call.arguments)
      const functionArgsArr = Object.values(functionArgs)
      //@ts-ignore
      const functionResponse: FunctionResponse = await functionToCall(...functionArgsArr) // Fix: Pass functionArgsArr as a rest parameter

      console.log(functionResponse, 'formattedResponse')
      const fcComponent = functionResponse!.component
      const stringResponse = JSON.stringify(functionResponse?.data ?? [])

      responseMessage = {
        role: 'assistant',
        content: `获取到的结果是：${stringResponse}`,
        component: fcComponent,
      }
    } else {
      responseMessage = {
        role: 'assistant',
        content: finish_reason === 'stop' ? '谢谢使用！' : chatCompletion.result!,
      }
    }

    setMessages((prevMessages) => [...prevMessages, responseMessage])
    setLoading(false)
  }, [input, messages])

  return (
    <div id={styles['chat-container']}>
      <div id={styles['chat-log']}>
        {messages.map((message, index) => (
          <div key={index} className={styles['message-wrapper']}>
            <div className={`${styles.sender} ${message.role === 'user' ? styles.user : styles.bot}`}>
              {message.role === 'user' ? '🙋🏼‍♂️' : '🤖'}
            </div>
            <div className={styles.message}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              {message.component && <message.component />}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bottomElement}>
        <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} />
        <button className={styles.button} onClick={sendMessage} disabled={loading}>
          发送
        </button>
      </div>
    </div>
  )
}

export default Agent
