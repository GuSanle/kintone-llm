// import React from 'react'
// import ReactDOM from 'react-dom/client'
import { FileParse } from '../fileParse'

export const ParseFile = async () => {
  // const id = kintone.app.record.getId()!;
  // ReactDOM.createRoot(document.getElementById('file')!).render(
  //   // <React.StrictMode>
  //   <FileParse />,
  //   // </React.StrictMode>
  // )
  return { success: true, data: '成功', component: FileParse }
}
