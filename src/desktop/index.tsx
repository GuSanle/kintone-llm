// import React from 'react'
import ReactDOM from 'react-dom/client'
import Agent from './agent'
// import NoAi from "./noAi";
// import MapSearch from "./mapSearch";
// import MapDriving from "./mapDriving";

// kintone.events.on(['app.record.index.show'], async (event) => {
//   const chatEl = document.createElement('div')
//   chatEl.id = 'chat'
//   kintone.app.getHeaderSpaceElement()?.appendChild(chatEl)

//   const mapEl = document.createElement('div')
//   mapEl.id = 'map'
//   kintone.app.getHeaderSpaceElement()?.appendChild(mapEl)

//   ReactDOM.createRoot(document.getElementById('chat')!).render(
//     <React.StrictMode>
//       <Agent />
//     </React.StrictMode>,
//   )
//   return event
// })

kintone.events.on(['app.record.detail.show'], async (event) => {
  const chatEl = document.createElement('div')
  chatEl.id = 'chat'
  kintone.app.record.getHeaderMenuSpaceElement()?.appendChild(chatEl)

  const mapEl = document.createElement('div')
  mapEl.id = 'map'
  kintone.app.record.getHeaderMenuSpaceElement()?.appendChild(mapEl)

  const fileEl = document.createElement('div')
  fileEl.id = 'file'
  kintone.app.record.getHeaderMenuSpaceElement()?.appendChild(fileEl)

  ReactDOM.createRoot(document.getElementById('chat')!).render(
    // <React.StrictMode>
    <Agent />,

    // </React.StrictMode>
  )

  // ReactDOM.createRoot(document.getElementById("file")!).render(
  //   // <React.StrictMode>
  //   <NoAi />
  //   // </React.StrictMode>
  // );
  return event
})
