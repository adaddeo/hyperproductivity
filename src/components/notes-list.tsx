import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RootState } from 'store-types'
import { notesSelector } from '../state/selectors'
import { actions as uiActions } from '../state/ui'

type Props =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

function NotesList(props: Props) {
  const { notes, open } = props

  const sortedNotes = notes

  if (notes.length === 0) {
    return (
      <div className="pane-column">
        <div className="pane pane-fixed pane-highlight pane-body-condensed">
          <a href="#reminders-options">Options</a>
        </div>

        <div className="pane-body">
          No notes
        </div>
      </div>
    )
  }

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-highlight pane-body-condensed">
        <a href="#reminders-options">Options</a>
      </div>

      <div className="pane">
        <div className="pane-column pane-list">
          { sortedNotes.map(note =>
              <div key={note.id} className="pane pane-fixed pane-body pane-body-condensed" onClick={() => open(note.id)} >
                <div className="h5 text-yellow">{note.displayTitle}</div>
                <div className="margin-0-top text-small text-muted">Modified {note.displayLastModified}</div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  notes: notesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    open: uiActions.openNote
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList)
