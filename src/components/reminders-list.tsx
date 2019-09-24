import React, { useMemo } from 'react'
// import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootState } from 'store-types'
import { actions } from '../state/reminders'
import { remindersSelector } from '../state/selectors'

type Props =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

// type DisplayFields = { [field: string]: boolean }
//
// const displayFieldDefaults: DisplayFields = {
//   title: true,
//   frequency: true
// }

function RemindersList(props: Props) {
  const { reminders } = props

  // const [displayFields, setDisplayFields] = useState(displayFieldDefaults)
  // const handleDisplayFieldToggle = (event: any) => {
  //   const { name } = event.target
  //
  //   setDisplayFields({
  //     ...displayFields,
  //     [name]: !displayFields[name]
  //   })
  // }

  const sortedReminders = useMemo(() => {
    return reminders.sort((a, b) => a.nextOccurrenceMS - b.nextOccurrenceMS)
  }, [reminders])

  if (reminders.length === 0) {
    return (
      <div className="centered">
        No reminders.
      </div>
    )
  }

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-highlight pane-body-minimal">
        <a href="#reminders-options">Options</a>
      </div>

      <div className="pane">
        { sortedReminders.map(
            (reminder, idx) =>
              <div key={reminder.id} className="reminder">
                <div>
                  <div className="h4 text-yellow">{reminder.title}</div>
                  { reminder.description &&
                    <div className="text-small text-muted">{reminder.description}</div>
                  }
                  <div className="margin-2-top">
                    <div className="margin-1-top">
                      Recurs
                      {' '}
                      <span className="text-bold">
                        every {reminder.prettyFrequency}
                      </span>
                    </div>
                    <div className="margin-1-top">
                      Next due in
                      {' '}
                      <span className="text-bold">
                        { reminder.nextOccurrenceIn }
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="button-icon">
                    <FontAwesomeIcon icon="ellipsis-v" fixedWidth />
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
  reminders: remindersSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    remove: actions.remove,
    markDone: actions.markDone
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindersList)
