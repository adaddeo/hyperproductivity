import React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../state'
import { Reminder } from '../models'

interface Props {
  reminders: Reminder[]
}

function RemindersTable(props: Props) {
  const { reminders } = props

  if (reminders.length === 0) {
    return null
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Reminder</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { reminders.map(
            (reminder, idx) =>
              <tr key={reminder.id}>
                <td>{reminder.title}</td>
                <td>{reminder.frequency}</td>
              </tr>
          )
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = (state: RootState) => state

export default connect(
  mapStateToProps
)(RemindersTable)
