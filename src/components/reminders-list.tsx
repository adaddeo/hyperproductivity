import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RootState } from 'store-types'
import { actions } from '../state/reminders'
import { nextOccurrence } from '../models/reminder'

type Props =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type DisplayFields = { [field: string]: boolean }

const displayFieldDefaults: DisplayFields = {
  title: true,
  frequency: true
}

function RemindersList(props: Props) {
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
        <a href="#reminders-options">Options</a>
      </div>

      <div className="pane">
        { reminders.map(
            (reminder, idx) =>
              <div key={reminder.id} className="reminder">
                <div>
                  <div className="h5 text-yellow">{reminder.title}</div>
                  { reminder.description &&
                    <div className="text-small text-muted margin-1-top">{reminder.description}</div>
                  }
                  <div className="margin-3-top">
                    <div className="margin-1-top">
                      Recurs
                      {' '}
                      <span className="text-bold">
                        every {reminder.frequency}
                      </span>
                    </div>
                    <div className="margin-1-top">
                      Next due in
                      {' '}
                      <span className="text-bold">
                        { nextOccurrence(reminder.firstOccurrence, reminder.frequency) }
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => remove(reminder.id)}
                    className="button-danger"
                  >
                    Remove
                  </button>
                </div>
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    remove: actions.remove
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindersList)
