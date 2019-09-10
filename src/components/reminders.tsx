import React from 'react'

import ReminderForm from './reminder-form'
import RemindersList from './reminders-list'

function Reminders() {
  return (
    <div className="pane-row">
      <div className="pane">
        <div className="pane-column">
          <div className="pane pane-fixed pane-body-condensed">
            <div className="pane-title">Reminders</div>
          </div>

          <div className="pane">
            <RemindersList />
          </div>
        </div>
      </div>
      <div className="pane pane-body pane-fixed reminders-form-panel">
        <ReminderForm />
      </div>
    </div>
  )
}

export default Reminders
