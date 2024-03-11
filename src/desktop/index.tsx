import ReactDOM from 'react-dom/client'
import Agent from './agent'
import AddDemoData from './addDemoData'

const app = kintone.app.getId()!

kintone.events.on(['app.record.detail.show'], async (event) => {
  const chatEl = document.createElement('div')
  chatEl.id = 'chat'
  kintone.app.record.getHeaderMenuSpaceElement()?.appendChild(chatEl)
  ReactDOM.createRoot(document.getElementById('chat')!).render(
    // <React.StrictMode>
    <Agent />,
    // </React.StrictMode>
  )
  return event
})

kintone.events.on(['app.record.index.show'], async (event) => {
  const buttonEl = document.createElement('div')
  buttonEl.id = 'addData'
  kintone.app.getHeaderSpaceElement()?.appendChild(buttonEl)

  if (app == 114) {
    ReactDOM.createRoot(document.getElementById('addData')!).render(
      // <React.StrictMode>
      <AddDemoData />,

      // </React.StrictMode>
    )
  }

  return event
})
