import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'store-types'

import { useQuill } from '../hooks'
import { Note } from '../models/note'
import { currentNoteSelector } from '../state/selectors'
import { actions as noteActions } from '../state/notes'


type Props =
  ReturnType<typeof mapStateToProps>

function NoteEditor(props: Props) {
  const { note } = props

  if (note === undefined) {
    return null
  } else {
    return <ConnectedEditor key={note.id} note={note} />
  }
}

function Editor(props: { note: Note } & ReturnType<typeof mapDispatchToProps>) {
  const { note, update } = props

  const quillContainer = useQuill({
    configurationOptions: {
      scrollingContainer: 'ql-container',
      theme: 'snow'
    },
    textChange: delta => update(note.id, { delta }),
    initialValue: note.delta
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    update(note!.id, { [name]: value })
  }

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-body-condensed">
        <input
          type="text"
          name="title"
          value={note.title} 
          onChange={handleChange} 
          className="clear h5"
        />
      </div>
      <div className="pane">
        <div className="flex flex-column">
          <div ref={quillContainer} />
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    update: noteActions.update
  }, dispatch)

const ConnectedEditor = connect(
  null,
  mapDispatchToProps
)(Editor)


const mapStateToProps = (state: RootState) => ({
  note: currentNoteSelector(state)
})

export default connect(
  mapStateToProps
)(NoteEditor)
