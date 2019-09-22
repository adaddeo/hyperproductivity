import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../state/notes'
import NotesList from './notes-list'
import NoteEditor from './note-editor'


type Props = ReturnType<typeof mapDispatchToProps>

function Notes(props: Props) {
  const { add } = props

  return (
    <div className="pane-row">
      <div className="pane pane-fixed notes-list">
        <div className="pane-column">
          <div className="pane pane-fixed pane-body">
            <div className="flex flex-between">
              <div className="h4">Notes</div>
              <div><button className="button-green" onClick={() => add()}>New</button></div>
            </div>
          </div>

          <div className="pane">
            <NotesList />
          </div>
        </div>
      </div>
      <div className="pane">
        <NoteEditor />
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    add: actions.add
  }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Notes)
