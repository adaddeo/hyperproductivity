import React from 'react'

import Reminders from './reminders'

function App() {
  return (
    <div className="pane-row dark-mode">
      <div className="pane pane-body pane-fixed left-nav-pane">
        <div>Events</div>
        <div>Notes</div>
        <div>Reminders</div>
        <div>Todos</div>
      </div>
      <div className="pane">
        <Reminders />
      </div>
    </div>
  )
}

export default App
