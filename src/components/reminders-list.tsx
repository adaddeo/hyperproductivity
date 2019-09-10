import React, { useState } from 'react'
import { connect } from 'react-redux'

import { RootState } from 'store-types'
import { Reminder } from '../models'
import { actions } from '../state/reminders'

interface Props {
  reminders: Reminder[]
  remove: (id: string) => void
}

type DisplayFields = { [field: string]: boolean }

const displayFieldDefaults: DisplayFields = {
  title: true,
  frequency: true
}

function RemindersTable(props: Props) {
  const { reminders, remove } = props

  const [displayFields, setDisplayFields] = useState(displayFieldDefaults)
  const handleDisplayFieldToggle = (event: any) => {
    const { name } = event.target

    setDisplayFields({
      ...displayFields,
      [name]: !displayFields[name]
    })
  }

  if (reminders.length === 0) {
    return (
      <div className="centered">
        No reminders.
      </div>
    )
  }

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-highlight pane-body-condensed">
        <a href="#">Options</a>
      </div>

      <div className="pane">
        { reminders.map(
            (reminder, idx) =>
              <div key={reminder.id} className="reminder">
                <div>
                  <div className="h4">{reminder.title}</div>
                  { reminder.description &&
                    <div className="">{reminder.description}</div>
                  }
                  <div>
                    every {reminder.frequency}
                  </div>
                </div>
                <button
                  onClick={() => remove(reminder.id)}
                  className="button-danger"
                >
                  Remove
                </button>
              </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  reminders: state.reminders
})

const mapDispatchToProps = {
  remove: actions.remove
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindersTable)
