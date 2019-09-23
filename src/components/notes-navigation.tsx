import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootState } from 'store-types'
import { notesSelector } from '../state/selectors'
import { actions as uiActions } from '../state/ui'
import { actions as noteActions } from '../state/notes'


type Props =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

function NotesList(props: Props) {
  const { notes, add, open } = props

  const sortedNotes = notes

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-heading">
        <div className="flex flex-between">
          <div className="h4">Notes</div>
          <button className="button-icon button-green" onClick={() => add()}>
              <FontAwesomeIcon icon="plus" />
          </button>
         </div>

        <div className="margin-top">
          <input type="text" placeholder="Search" />
        </div>

        <div className="margin-top">
          <a href="#reminders-options">Options</a>
        </div>
      </div>

      <div className="pane">
        { sortedNotes.length === 0 ?
          <div className="pane-body">
            No notes.
          </div> :
          <div className="pane-column pane-list">
            { sortedNotes.map(note =>
                <div key={note.id} className="pane pane-fixed pane-body pane-body-condensed" onClick={() => open(note.id)} >
                  <div className="h5 text-yellow">{note.displayTitle}</div>
                  <div className="margin-0-top text-small text-muted">Modified {note.displayLastModified}</div>
                </div>
              )
            }
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  notes: notesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    add: noteActions.add,
    open: uiActions.openNote
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList)
