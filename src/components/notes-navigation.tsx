import React, { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootState } from 'store-types'
import { notesSelector } from '../state/selectors'
import { actions as uiActions } from '../state/ui'
import { actions as noteActions } from '../state/notes'
import { useInputState } from '../hooks'


type Props =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

function NotesList(props: Props) {
  const { notes, add, open } = props

  const [search, , handleSearchChange] = useInputState('')

  const sortedNotes = useMemo(() => {
    const s = search.toLowerCase()

    if (search === '') {
      return notes
    }

    return notes.filter(n => n.title.toLowerCase().indexOf(s) !== -1)
  }, [notes, search])

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-heading">
        <div className="flex flex-between" style={{alignItems: 'center'}}>
          <div className="h5">Notes</div>
          <button className="button-icon button-green" onClick={() => add()}>
              <FontAwesomeIcon icon="plus" fixedWidth />
          </button>
         </div>

        <div className="margin-top">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
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
                  <div className="h4 text-yellow">{note.displayTitle}</div>
                  <div className="margin-1-top text-small text-muted">Modified {note.displayLastModified}</div>
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
