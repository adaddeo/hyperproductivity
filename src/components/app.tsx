import React from 'react'

import ReminderForm from './reminder-form'
import ReminderTable from './reminders-table'

function App() {
  return (
    <div className="container">
      <ReminderForm />
      <ReminderTable />
    </div>
  )
}

export default App
