import React from 'react'

import SideNav from './side-nav'
import Reminders from './reminders'

function App() {
  return (
    <div className="pane-row dark-mode">
      <SideNav />
      <Reminders />
    </div>
  )
}

export default App
