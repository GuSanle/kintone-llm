import React from 'react'
import useFileParse from './fileParseHooks/useFileParse'
import ReactMarkdown from 'react-markdown'

export const FileParse: React.FC = () => {
  const { words } = useFileParse()
  const markdown = words.join('')

  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
