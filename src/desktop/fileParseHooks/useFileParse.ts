import { useEffect, useState, useCallback } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export default function useFileParse() {
  const [words, setWords] = useState<string[]>([])
  const [messageQueue, setMessageQueue] = useState<string[]>([])
  const [processing, setProcessing] = useState(false)
  const getData = async () => {
    const id = kintone.app.record.getId()!
    const app = 70
    const fieldCode = 'file'
    const url = `http://localhost:3000/sse?app=${app}&id=${id}&fieldCode=${fieldCode}`
    await fetchEventSource(url, {
      onmessage(e) {
        const parsedData = JSON.parse(e.data).result
        console.log(parsedData)
        setMessageQueue((prevQueue) => [...prevQueue, ...parsedData.split('')])
      },
      onerror(err) {
        setWords(() => ['服务器连接失败'])
        throw err
      },
    })
  }

  const processQueue = useCallback(() => {
    setMessageQueue((prevQueue) => {
      if (prevQueue.length > 0) {
        const char = prevQueue[0]
        setWords((words) => words.concat(char))
        //两个useEffect都在更新messageQueue，所以其实这个processQueue因为更新相对来说很慢，所以一直在这个位置循环输出字。
        setTimeout(processQueue, 100)
        return prevQueue.slice(1)
      } else {
        setProcessing(false)
        return prevQueue
      }
    })
  }, [])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (messageQueue.length > 0 && !processing) {
      //processing 为false才会进来，所以就算processQueue中一直在变化messageQueue的值，进入到这个useEffect，
      //但是有了processing的保护，不会进行循环调用。也就是等待上一个messageQueue队列中的字全部输出完，才会进入下一个
      console.log('a')
      setProcessing(true)
      processQueue()
    }
  }, [messageQueue, processQueue, processing])

  return { words }
}
