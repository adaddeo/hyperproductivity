import React from 'react'

import ReminderForm from './reminder-form'
import RemindersList from './reminders-list'

function Reminders() {
  return (
    <div className="pane-row">
      <div className="pane">
        <div className="pane-column">
          <div className="pane pane-fixed pane-heading">
            <div className="h4">Reminders</div>
          </div>

          <div className="pane">
            <RemindersList />
          </div>
        </div>
      </div>
      <div className="pane pane-fixed pane-width-2 pane-body">
        <ReminderForm />
      </div>
    </div>
  )
}

export default Reminders
